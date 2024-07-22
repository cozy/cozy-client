export class StoreProxy {
    constructor(state: any);
    state: any;
    readDocument(doctype: any, id: any): any;
    writeDocument(document: any): void;
    setState(updaterFn: any): void;
    getState(): any;
}
export default combinedReducer;
export function createStore(): any;
export function getStateRoot(state: any): any;
export function getCollectionFromState(state: any, doctype: any): any[];
export function getDocumentFromState(state: any, doctype: any, id: any): any;
export function getQueryFromStore(store: any, queryId: any): any;
export function getQueryFromState(state: any, queryId: any): any;
export function getRawQueryFromState(state: any, queryId: any): any;
export function isQueryExisting(state: any, queryId: any): boolean;
declare function combinedReducer(state: {
    documents: {};
    queries: {};
}, action: any): {
    documents: any;
    queries: Record<string, import("../types").QueryState>;
};
export function resetState(): {
    type: string;
};
export { initQuery, loadQuery, resetQuery, receiveQueryResult, receiveQueryError } from "./queries";
export { initMutation, receiveMutationResult, receiveMutationError } from "./mutations";
