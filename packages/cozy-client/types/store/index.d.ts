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
declare function combinedReducer(state: {
    documents: {};
    queries: {};
}, action: any): {
    documents: {};
    queries: {};
} | {
    documents: any;
    queries: import("../types").QueriesStateSlice;
};
export function resetState(): {
    type: string;
};
export { getStateRoot, getCollectionFromState, getDocumentFromState, getQueryFromStore, getQueryFromState, getRawQueryFromState, isQueryExisting } from "./stateHelpers";
export { initQuery, loadQuery, resetQuery, receiveQueryResult, receiveQueryError, executeQueryFromState } from "./queries";
export { initMutation, receiveMutationResult, receiveMutationError } from "./mutations";
export { dispatchCreate, dispatchUpdate, dispatchDelete } from "./realtime";
