import DocumentCollection, { normalizeDoc } from './DocumentCollection'

const normalizeMyselfResp = resp => {
  return {
    ...normalizeDoc(resp.data, CONTACTS_DOCTYPE),
    ...resp.data.attributes,
    _rev: resp.data.meta.rev
  }
}

class ContactsCollection extends DocumentCollection {
  async find(selector, options) {
    if (Object.values(selector).length === 1 && selector['me'] == true) {
      return this.findMyself()
    } else {
      return super.find(selector, options)
    }
  }

  async findMyself() {
    const resp = await this.stackClient.fetchJSON('POST', '/contacts/myself')
    const col = {
      data: [normalizeMyselfResp(resp)],
      next: false,
      meta: null,
      bookmark: false
    }
    return col
  }
}

export const CONTACTS_DOCTYPE = 'io.cozy.contacts'

export default ContactsCollection
