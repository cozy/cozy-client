export function getStateRoot(state: any): any;
export function getCollectionFromState(state: any, doctype: any): any[];
export function getDocumentFromState(state: any, doctype: any, id: any): import("../types").CozyClientDocument;
export function getDocumentsFromState(state: any, doctype: any, ids: any): import("../types").CozyClientDocument[];
export function getQueryFromStore(store: any, queryId: any): any;
export function getQueryFromState(state: any, queryId: any): any;
export function getRawQueryFromState(state: any, queryId: any): any;
export function isQueryExisting(state: any, queryId: any): boolean;
