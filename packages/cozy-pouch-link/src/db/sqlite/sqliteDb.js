import DatabaseQueryEngine from '../dbInterface'
export default class SQLiteQueryEngine extends DatabaseQueryEngine {
  constructor(pouchManager, doctype) {
    super()
    throw new Error(
      'SQLiteQueryEngine is not implemented for non-native environments'
    )
  }
}
