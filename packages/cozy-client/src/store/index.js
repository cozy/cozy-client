import { combineReducers } from 'redux'

import documents from './documents'
import queries from './queries'

export default combineReducers({
  documents,
  queries
})

export { getDocumentFromStore } from './documents'
export {
  getQueryFromStore,
  initQuery,
  receiveQueryResult,
  receiveQueryError
} from './queries'
