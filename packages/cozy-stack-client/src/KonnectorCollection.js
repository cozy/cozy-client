import AppCollection from './AppCollection'

export const KONNECTORS_DOCTYPE = 'io.cozy.konnectors'

class KonnectorCollection extends AppCollection {
  constructor(stackClient) {
    super(stackClient)
    this.doctype = KONNECTORS_DOCTYPE
    this.endpoint = '/konnectors/'
  }

  async create() {
    throw new Error('create() method is not available for konnectors')
  }

  async find() {
    throw new Error('find() method is not available for konnectors')
  }

  async destroy() {
    throw new Error('destroy() method is not available for konnectors')
  }

  async update() {
    throw new Error('update() method is not available for konnectors')
  }
}

export default KonnectorCollection
