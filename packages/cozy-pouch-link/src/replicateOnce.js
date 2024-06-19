import fromPairs from 'lodash/fromPairs'
import get from 'lodash/get'
import map from 'lodash/map'
import startsWith from 'lodash/startsWith'
import zip from 'lodash/zip'

import logger from './logger'
import { fetchRemoteLastSequence } from './remote'
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

      const initialReplication = !pouchManager.isSynced(doctype)
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
    const res = await Promise.all(promises)

    if (process.env.NODE_ENV !== 'production') {
      logger.info('PouchManager: Replication ended')
    }

    if (pouchManager.options.onSync) {
      const doctypeUpdates = fromPairs(zip(doctypes, res))
      pouchManager.options.onSync(doctypeUpdates)
    }

    // @ts-ignore
    res.cancel = pouchManager.cancelCurrentReplications

    return res
  } catch (err) {
    pouchManager.handleReplicationError(err)
  }
}
