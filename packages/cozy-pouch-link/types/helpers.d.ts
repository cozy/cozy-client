export const LIMIT_BUG: 999;
export default helpers;
declare namespace helpers {
    function isAdapterBugged(adapterName: any): boolean;
    function isDesignDocument(doc: any): boolean;
    function isDeletedDocument(doc: any): any;
    function insertBulkDocs(db: any, docs: any): Promise<any>;
    function normalizeFindSelector({ selector, sort, indexedFields, partialFilter, doctype, sharingId }: {
        selector: any;
        sort: any;
        indexedFields: any;
        partialFilter: any;
        doctype: any;
        sharingId: any;
    }): any;
}
