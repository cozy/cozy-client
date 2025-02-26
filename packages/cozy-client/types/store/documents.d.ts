export function mergeDocumentsWithRelationships(prevDocument?: {}, nextDocument?: {}): import("../types").CozyClientDocument;
export default documents;
export function getDocumentFromSlice(state: import('../types').DocumentsStateSlice, doctype: string, id: string): import('../types').CozyClientDocument;
export function getDocumentsFromSlice(state: import('../types').DocumentsStateSlice, doctype: string, ids: Array<string>): Array<import('../types').CozyClientDocument>;
export function getCollectionFromSlice(state: {}, doctype: any): any[];
export function extractAndMergeDocument(data: any, updatedStateWithIncluded: any): any;
declare function documents(state: {}, action: any): any;
