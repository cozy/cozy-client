export function isQueryAction(action: any): boolean;
export function isReceivingData(action: any): boolean;
export function sortAndLimitDocsIds(queryState: QueryState, documents: DocumentsStateSlice, ids: Array<string>, { count, fetchedPagesCount }: {
    count: number;
    fetchedPagesCount: number;
}): Array<string>;
export function convert$gtNullSelectors(selector: any): object;
export function mergeSelectorAndPartialIndex(queryDefinition: object): object;
export function makeSorterFromDefinition(definition: QueryDefinition): (arg0: Array<CozyClientDocument>) => Array<CozyClientDocument>;
export function updateData(query: QueryState, newData: Array<CozyClientDocument>, documents: DocumentsStateSlice): QueryState;
export default queries;
export function initQuery(queryId: string, queryDefinition: QueryDefinition, options?: QueryOptions): object;
export function loadQuery(queryId: string, options?: QueryOptions): object;
export function receiveQueryResult(queryId: string, response: object, options?: QueryOptions): object;
export function receiveQueryError(queryId: string, error: object, options?: QueryOptions): object;
export function getQueryFromSlice(state: any, queryId: any, documents: any): any;
export class QueryIDGenerator {
    idCounter: number;
    /**
     * Generates a random id for unamed queries
     */
    generateRandomId(): string;
    /**
     * Generates an id for queries
     * If the query is a getById only query,
     * we can generate a name for it.
     *
     * If not, let's generate a random id
     *
     * @param {QueryDefinition} queryDefinition The query definition
     * @returns {string}
     */
    generateId(queryDefinition: QueryDefinition): string;
}
export namespace QueryIDGenerator {
    const UNNAMED: string;
}
import { QueryState } from "../types";
import { DocumentsStateSlice } from "../types";
import { QueryDefinition } from "../queries/dsl";
import { CozyClientDocument } from "../types";
/**
 * @param  {QueriesStateSlice}  state - Redux slice containing all the query states indexed by name
 * @param  {object}  action - Income redux action
 * @param  {DocumentsStateSlice}  documents - Reference to documents slice
 * @param  {boolean} haveDocumentsChanged - Has the document slice changed with current action
 * @returns {QueriesStateSlice}
 */
declare function queries(state: QueriesStateSlice, action: object, documents?: DocumentsStateSlice, haveDocumentsChanged?: boolean): QueriesStateSlice;
import { QueryOptions } from "../types";
import { QueriesStateSlice } from "../types";
