import DocumentCollection from './DocumentCollection'
import { normalizeDoctypeJsonApi } from './normalize'
// @ts-ignore Need to import it to be used in jsdoc
import { IOCozyContact } from 'cozy-client/dist/types'

export const CONTACTS_DOCTYPE = 'io.cozy.contacts'

const normalizeContactJsonApi = normalizeDoctypeJsonApi(CONTACTS_DOCTYPE)

const normalizeMyself = contact => {
  return {
    ...normalizeContactJsonApi(contact),
    _rev: contact?.meta?.rev
  }
}

class ContactsCollection extends DocumentCollection {
  async find(selector, options) {
    if (
      selector !== undefined &&
      Object.values(selector).length === 1 &&
      selector['me'] == true
    ) {
      return this.findMyself()
    } else {
      return super.find(selector, options)
    }
  }

  async findMyself() {
    const resp = await this.stackClient.fetchJSON('POST', '/contacts/myself')
    const col = {
      data: [normalizeMyself(resp.data)],
      next: false,
      meta: null,
      bookmark: false
    }
    return col
  }

  /**
   * Destroys a contact
   *
   * If the contact is linked to accounts, it will be trashed instead of being
   * destroyed.
   *
   * @param  {IOCozyContact} contact - Contact to destroy. IT MUST BE THE FULL CONTACT OBJECT
   * @returns {Promise<{ data: IOCozyContact }>} - Resolves when contact has been destroyed
   */
  async destroy(contact) {
    const syncData = contact?.cozyMetadata?.sync || {}
    const isLinkedToAccounts = Object.keys(syncData).length > 0
    if (isLinkedToAccounts) {
      return super.update({
        ...contact,
        trashed: true
      })
    } else {
      return super.destroy(contact)
    }
  }
}

export default ContactsCollection
