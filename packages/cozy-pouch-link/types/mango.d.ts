export function makeKeyFromPartialFilter(condition: object): string;
export function getIndexNameFromFields(fields: Array<string>, partialFilter?: object): string;
export function getIndexFieldsFromFind({ selector, sort, partialFilter }: import('./types').MangoQueryOptions): string[];
export function createIndex(db: object, fields: any[], { partialFilter, indexName, doctype }?: {
    partialFilter: object;
    indexName: string;
    doctype: string;
}): Promise<import('./types').PouchDbIndex>;
export function findExistingIndex(doctype: string, options: import('./types').MangoQueryOptions, indexName: string): import('./types').PouchDbIndex | undefined;
export function getIndexFields({ selector, sort, partialFilter, indexedFields }: {
    selector: any;
    sort: any;
    partialFilter: any;
    indexedFields: any;
}): any;
export function getIndexName({ selector, sort, indexedFields, partialFilter }: {
    selector: any;
    sort: any;
    indexedFields: any;
    partialFilter: any;
}): string;
