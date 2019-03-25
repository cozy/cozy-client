import AppCollection from './AppCollection'

export const KONNECTORS_DOCTYPE = 'io.cozy.konnectors'

class KonnectorCollection extends AppCollection {
  endpoint = '/konnectors/'

  constructor(stackClient) {
    super(stackClient)
    this.doctype = KONNECTORS_DOCTYPE
  }
}

export default KonnectorCollection
