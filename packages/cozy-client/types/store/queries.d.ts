export function isQueryAction(action: any): boolean;
export function isReceivingData(action: any): boolean;
export function convert$gtNullSelectors(selector: any): {};
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
