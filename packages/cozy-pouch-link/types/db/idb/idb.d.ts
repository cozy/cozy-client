export default class IndexedDBQueryEngine extends DatabaseQueryEngine {
    constructor(pouchManager: any, doctype: any);
    db: IDBDatabase;
    client: any;
    doctype: any;
    storeName: string;
    openRequest: IDBOpenDBRequest;
}
import DatabaseQueryEngine from "../dbInterface";
