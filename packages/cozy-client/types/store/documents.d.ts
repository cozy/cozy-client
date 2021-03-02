export function mergeDocumentsWithRelationships(prevDocument?: {}, nextDocument?: {}): CozyClientDocument;
export default documents;
export function getDocumentFromSlice(state: {}, doctype: any, id: any): any;
export function getCollectionFromSlice(state: {}, doctype: any): any[];
export function extractAndMergeDocument(data: any, updatedStateWithIncluded: any): any;
import { CozyClientDocument } from "../types";
declare function documents(state: {}, action: any): any;
