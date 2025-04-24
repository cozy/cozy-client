export const MAX_LIMIT: number;
export function parseResults(client: any, result: any, doctype: any, { isSingleDoc, skip, limit }?: {
    isSingleDoc?: boolean;
    skip?: number;
    limit?: number;
}): {
    data: any;
    meta?: undefined;
    skip?: undefined;
    next?: undefined;
} | {
    data: any[];
    meta: {
        count: number;
    };
    skip: number;
    next: boolean;
};
export function queryWithCursor(index: any, idbKeyRange: any, { offset, limit, sortDirection }?: {
    offset?: number;
    limit?: number;
    sortDirection?: string;
}): Promise<any>;
export function queryWithAll(store: any, { limit }?: {
    limit?: number;
}): Promise<any>;
export function getAllData(store: any, { limit, skip }?: {
    limit?: number;
    skip?: number;
}): Promise<any>;
export function findData(store: any, findOpts: any): Promise<any>;
export function getSingleDoc(store: any, id: any): Promise<any>;
export function createIDBIndex(queryEngine: any, { indexName, indexedFields, shouldRecreateIndex }: {
    indexName: any;
    indexedFields: any;
    shouldRecreateIndex?: boolean;
}): Promise<any>;
