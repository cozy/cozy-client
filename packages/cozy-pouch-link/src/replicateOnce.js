import fromPairs from 'lodash/fromPairs'
import get from 'lodash/get'
import map from 'lodash/map'
import startsWith from 'lodash/startsWith'
import zip from 'lodash/zip'

import logger from './logger'
import {
  fetchRemoteLastSequence,
  isDatabaseNotFoundError,
  isDatabaseUnradableError
} from './remote'
import { startReplication } from './startReplication'

/**
 * Process replication once for given PouchManager
 *
 * @param {import('./PouchManager').default} pouchManager - PouchManager that handle the replication
 * @returns {Promise<any>} res
 */
export const replicateOnce = async pouchManager => {
  if (!(await pouchManager.isOnline())) {
    logger.info(
      'PouchManager: The device is offline so the replication has been skipped'
    )
    return Promise.resolve()
  }

  logger.info('PouchManager: Starting replication iteration')

  // Creating each replication
  pouchManager.replications = map(
    pouchManager.pouches,
    async (pouch, doctype) => {
      logger.info('PouchManager: Starting replication for ' + doctype)

      const getReplicationURL = () => pouchManager.getReplicationURL(doctype)

      const initialReplication =
        pouchManager.getSyncStatus(doctype) !== 'synced'
      const replicationFilter = doc => {
        return !startsWith(doc._id, '_design')
      }
      let seq = ''
      if (initialReplication) {
        // Before the first replication, get the last remote sequence,
        // which will be used as a checkpoint for the next replication
        const lastSeq = await fetchRemoteLastSequence(getReplicationURL())
        await pouchManager.storage.persistDoctypeLastSequence(doctype, lastSeq)
      } else {
        seq = await pouchManager.storage.getDoctypeLastSequence(doctype)
      }

      const replicationOptions = get(
        pouchManager.doctypesReplicationOptions,
        doctype,
        {}
      )
      replicationOptions.initialReplication = initialReplication
      replicationOptions.filter = replicationFilter
      replicationOptions.since = seq
      replicationOptions.doctype = doctype

      if (pouchManager.options.onDoctypeSyncStart) {
        pouchManager.options.onDoctypeSyncStart(doctype)
      }
      const res = await startReplication(
        pouch,
        replicationOptions,
        getReplicationURL,
        pouchManager.storage
      )
      if (seq) {
        // We only need the sequence for the second replication, as PouchDB
        // will use a local checkpoint for the next runs.
        await pouchManager.storage.destroyDoctypeLastSequence(doctype)
      }

      await pouchManager.updateSyncInfo(doctype)
      pouchManager.checkToWarmupDoctype(doctype, replicationOptions)
      if (pouchManager.options.onDoctypeSyncEnd) {
        pouchManager.options.onDoctypeSyncEnd(doctype)
      }
      return res
    }
  )

  // Waiting on each replication
  const doctypes = Object.keys(pouchManager.pouches)
  const promises = Object.values(pouchManager.replications)
  try {
    const res = await allSettled(promises)

    if (process.env.NODE_ENV !== 'production') {
      logger.info('PouchManager: Replication ended')
    }

    if (pouchManager.options.onSync) {
      const zippedDoctypes = zip(doctypes, res)
      const successZippedDoctypes = zippedDoctypes
        .filter(d => d[1].status === 'fulfilled')
        .map(d => {
          return [d[0], d[1].value]
        })
      const failedZippedDoctypes = zippedDoctypes
        .filter(d => d[1].status === 'rejected')
        .map(d => {
          return [d[0], d[1].reason]
        })

      const blockingErrors = res.filter(
        r =>
          r.status === 'rejected' &&
          !isDatabaseNotFoundError(r.reason) &&
          !isDatabaseUnradableError(r.reason)
      )

      const unblockingErrors = failedZippedDoctypes.filter(
        r => isDatabaseNotFoundError(r[1]) || isDatabaseUnradableError(r[1])
      )

      for (const unblockingError of unblockingErrors) {
        const doctype = unblockingError[0]
        // @ts-ignore
        await pouchManager.updateSyncInfo(doctype, 'not_complete')
      }

      if (blockingErrors.length > 0) {
        const errors = blockingErrors.map(err => err.reason)
        const reasons = errors.join('\n')
        logger.debug(
          `ReplicateOnce's promises failed with the following errors`,
          reasons
        )
        // @ts-ignore
        // eslint-disable-next-line no-undef
        throw new AggregateError(errors, 'Failed with blocking errors')
      } else {
        logger.debug(`ReplicateOnce's promises succeed with no blocking errors`)
      }

      const doctypeUpdated = fromPairs(successZippedDoctypes)
      const doctypeFailed = fromPairs(failedZippedDoctypes)
      logger.debug(
        'Doctypes replications in error: ',
        Object.keys(doctypeFailed)
      )
      logger.debug(
        'Doctypes replications in success: ',
        Object.keys(doctypeUpdated)
      )
      pouchManager.options.onSync(doctypeUpdated)
    }

    // @ts-ignore
    res.cancel = pouchManager.cancelCurrentReplications

    return res
  } catch (err) {
    pouchManager.handleReplicationError(err)
  }
}

/**
 * @typedef {object} FulfilledPromise
 * @property {'fulfilled'} status - The status of the promise
 * @property {undefined} reason - The Error rejected by the promise (undefined when fulfilled)
 * @property {any} value - The resolved value of the promise
 */

/**
 * @typedef {object} RejectedPromise
 * @property {'rejected'} status - The status of the promise
 * @property {Error} reason - The Error rejected by the promise
 * @property {undefined} value - The resolved value of the promise (undefined when rejected)
 */

/**
 * Takes an iterable of promises as input and returns a single Promise.
 * This returned promise fulfills when all of the input's promises settle (including
 * when an empty iterable is passed), with an array of objects that describe the
 * outcome of each promise.
 *
 * @param {Promise[]} promises - Promise to be awaited
 * @returns {Promise<(FulfilledPromise|RejectedPromise)[]>}
 */
const allSettled = promises => {
  return Promise.all(
    promises.map(promise =>
      promise
        .then(value => /** @type {FulfilledPromise} */ ({
          status: 'fulfilled',
          value
        }))
        .catch((
          /** @type {Error} */ reason
        ) => /** @type {RejectedPromise} */ ({
          status: 'rejected',
          reason
        }))
    )
  )
}
