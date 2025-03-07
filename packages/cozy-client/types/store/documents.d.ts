export function mergeDocumentsWithRelationships(prevDocument?: {}, nextDocument?: {}): import("../types").CozyClientDocument;
export default documents;
export function getDocumentFromSlice(state: import('../types').DocumentsStateSlice, doctype: string, id: string): import('../types').CozyClientDocument;
export function getDocumentsFromSlice(state: import('../types').DocumentsStateSlice, doctype: string, ids: Array<string>): Array<import('../types').CozyClientDocument>;
export function getCollectionFromSlice(state: {}, doctype: any): any[];
export function extractAndMergeDocument(newData: Array<import('../types').CozyClientDocument>, updatedStateWithIncluded: import("../types").DocumentsStateSlice): import("../types").DocumentsStateSlice;
declare function documents(state: {}, action: any): any;
