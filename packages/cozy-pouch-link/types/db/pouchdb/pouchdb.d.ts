export default class PouchDBQueryEngine extends DatabaseQueryEngine {
    constructor(pouchManager: any, doctype: any);
    pouchManager: any;
    client: any;
    doctype: any;
    db: any;
}
import DatabaseQueryEngine from "../dbInterface";
