export function getExistingDocument(queryEngine: DatabaseQueryEngine, id: string, throwIfNotFound?: boolean): Promise<import('./dbInterface').QueryResponseSingleDoc>;
export function areDocsEqual(oldDoc: any, newDoc: any): Promise<boolean>;
export function getCozyPouchData(doc: import('../CozyPouchLink').CozyPouchDocument): Array<import('cozy-client/types/types').CozyClientDocument>;
import DatabaseQueryEngine from "./dbInterface";
