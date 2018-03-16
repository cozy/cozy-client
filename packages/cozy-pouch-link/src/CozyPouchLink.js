import { MutationTypes } from 'cozy-client/dsl'
import CozyLink from './CozyLink'
import PouchDB from ''
import mapValues from 'lodash/mapValues'

export default class PouchLink extends CozyLink {
  constructor({ doctypes }) {
    super()
    this.doctypes = doctypes
    this.pouches = mapValues(
      this.doctypes,
      doctype => new PouchDB(doctype)
    )
  }

  request(operation, result, forward) {
    // should check if it is a supported doctype and
    // forward if not
    // should check if synced and forward if not
  }

  executeQuery({ doctype, selector, id, referenced, ...options }) {
    // TODO
  }

  executeMutation({ mutationType, ...props }) {
    // TODO
  }
}
