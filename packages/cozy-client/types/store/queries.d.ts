export function isQueryAction(action: any): boolean;
export function isReceivingData(action: any): boolean;
export function convert$gtNullSelectors(selector: any): object;
export function mergeSelectorAndPartialIndex(queryDefinition: object): object;
export function makeSorterFromDefinition(definition: QueryDefinition): (arg0: Array<CozyClientDocument>) => Array<CozyClientDocument>;
export default queries;
export function initQuery(queryId: string, queryDefinition: QueryDefinition, options?: QueryOptions): {
    type: string;
    queryId: string;
    queryDefinition: QueryDefinition;
    options: QueryOptions;
};
export function loadQuery(queryId: any): {
    type: string;
    queryId: any;
};
export function receiveQueryResult(queryId: any, response: any, options?: {}): {
    type: string;
    queryId: any;
    response: any;
};
export function receiveQueryError(queryId: any, error: any): {
    type: string;
    queryId: any;
    error: any;
};
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
export type QueryStates = {
    [x: string]: QueryState;
};
import { QueryDefinition } from "../queries/dsl";
import { CozyClientDocument } from "../types";
/**
 * @typedef {Record<string, QueryState>} QueryStates
 */
/**
 * @param  {QueryStates}  state - Redux slice containing all the query states indexed by name
 * @param  {object}  action - Income redux action
 * @param  {object}  nextDocuments
 * @param  {boolean} haveDocumentsChanged
 */
declare function queries(state: QueryStates, action: object, nextDocuments?: object, haveDocumentsChanged?: boolean): {
    [x: string]: any;
};
import { QueryOptions } from "../types";
import { QueryState } from "../types";
