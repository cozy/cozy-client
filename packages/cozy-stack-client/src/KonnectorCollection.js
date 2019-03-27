import AppCollection from './AppCollection'

export const KONNECTORS_DOCTYPE = 'io.cozy.konnectors'

class KonnectorCollection extends AppCollection {
  constructor(stackClient) {
    super(stackClient)
    this.doctype = KONNECTORS_DOCTYPE
    this.endpoint = '/konnectors/'
  }
}

export default KonnectorCollection
