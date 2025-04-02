export default class SQLiteQueryEngine extends DatabaseQueryEngine {
    constructor(pouchManager: any, doctype: any);
    db: import("@op-engineering/op-sqlite").DB;
    client: any;
    doctype: any;
}
import DatabaseQueryEngine from "../dbInterface";
