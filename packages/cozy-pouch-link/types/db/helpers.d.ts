export function getExistingDocument(queryEngine: DatabaseQueryEngine, id: string, throwIfNotFound?: boolean): Promise<import('./dbInterface').QueryResponseSingleDoc>;
export function areDocsEqual(oldDoc: any, newDoc: any): Promise<boolean>;
import DatabaseQueryEngine from "./dbInterface";
