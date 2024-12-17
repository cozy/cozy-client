export class StoreProxy {
    constructor(state: any);
    state: any;
    readDocument(doctype: any, id: any): any;
    writeDocument(document: any): void;
    setState(updaterFn: any): void;
    getState(): any;
}
export default combinedReducer;
export function createStore(performanceApi: any): any;
declare function combinedReducer(performanceApi: any): (state: {
    documents: {};
    queries: {};
}, action: any) => {
    documents: any;
    queries: Record<string, import("../types").QueryState>;
};
export function resetState(): {
    type: string;
};
export { getStateRoot, getCollectionFromState, getDocumentFromState, getQueryFromStore, getQueryFromState, getRawQueryFromState, isQueryExisting } from "./stateHelpers";
export { initQuery, loadQuery, resetQuery, receiveQueryResult, receiveQueryError, executeQueryFromState } from "./queries";
export { initMutation, receiveMutationResult, receiveMutationError } from "./mutations";
export { dispatchCreate, dispatchUpdate, dispatchDelete } from "./realtime";
