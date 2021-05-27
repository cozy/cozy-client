export function isQueryAction(action: any): boolean;
export function isReceivingData(action: any): boolean;
export function convert$gtNullSelectors(selector: any): object;
export function mergeSelectorAndPartialIndex(queryDefinition: object): object;
export function makeSorterFromDefinition(definition: any): (docs: any) => any;
export default queries;
export function initQuery(queryId: any, queryDefinition: any): {
    type: string;
    queryId: any;
    queryDefinition: any;
};
export function loadQuery(queryId: any): {
    type: string;
    queryId: any;
};
export function receiveQueryResult(queryId: any, response: any, options?: {}): {
    type: string;
    queryId: any;
    response: any;
};
export function receiveQueryError(queryId: any, error: any): {
    type: string;
    queryId: any;
    error: any;
};
export function getQueryFromSlice(state: any, queryId: any, documents: any): any;
declare function queries(state: {}, action: any, nextDocuments?: {}, haveDocumentsChanged?: boolean): any;
export class QueryIDGenerator {
    idCounter: number;
    /**
     * Generates a random id for unamed queries
     */
    generateRandomId(): string;
    /**
     * Generates an id for queries
     * If the query is a getById only query,
     * we can generate a name for it.
     *
     * If not, let's generate a random id
     *
     * @param {QueryDefinition} queryDefinition The query definition
     * @returns {string}
     */
    generateId(queryDefinition: QueryDefinition): string;
}
export namespace QueryIDGenerator {
    const UNNAMED: string;
}
