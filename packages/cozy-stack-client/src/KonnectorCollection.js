import AppCollection from './AppCollection'

export const KONNECTORS_DOCTYPE = 'io.cozy.konnectors'

class KonnectorCollection extends AppCollection {
  doctype = KONNECTORS_DOCTYPE
  endpoint = '/konnectors/'
}

export default KonnectorCollection
