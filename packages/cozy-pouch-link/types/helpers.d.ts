export default helpers;
declare namespace helpers {
    function isAdapterBugged(adapterName: any): boolean;
    function withoutDesignDocuments(res: any): any;
    function getDocs(db: any, fct: any, options?: {}): any;
    function allDocs(db: any, options?: {}): Promise<any>;
    function find(db: any, options?: {}): Promise<any>;
    function isDesignDocument(doc: any): boolean;
    function isDeletedDocument(doc: any): any;
    function insertBulkDocs(db: any, docs: any): Promise<any>;
    function normalizeFindSelector({ selector, sort, indexedFields }: {
        selector: any;
        sort: any;
        indexedFields: any;
    }): any;
}
