export function useQueries(querySpecs: any): {};
export default useQuery;
/**
 * Fetches a queryDefinition and returns the queryState
 */
export type UseQueryOptions = {
    /**
     * - Name for the query [required]
     */
    as: object;
    /**
     * - If set to false, the query won't be executed
     */
    enabled: boolean;
    /**
     * - Fetch policy
     */
    fetchPolicy: object;
    /**
     * - If true, the "data" returned will be
     * a single doc instead of an array for single doc queries. Defaults to false for backward
     * compatibility but will be set to true in the future.
     */
    singleDocData: object;
    /**
     * - Callback if the query is errored
     */
    onError: Function;
};
/**
 * Fetches a queryDefinition and returns the queryState
 *
 * @param  {QueryDefinition} queryDefinition - Definition created with Q()
 *
 * @typedef {object} UseQueryOptions
 * @property  {object} as - Name for the query [required]
 * @property  {boolean} enabled - If set to false, the query won't be executed
 * @property  {object} fetchPolicy - Fetch policy
 * @property  {object} singleDocData - If true, the "data" returned will be
 * a single doc instead of an array for single doc queries. Defaults to false for backward
 * compatibility but will be set to true in the future.
 * @property {Function} onError - Callback if the query is errored
 *
 * @returns {UseQueryReturnValue}
 */
declare function useQuery(queryDefinition: QueryDefinition, options: any): UseQueryReturnValue;
import { QueryDefinition } from "../queries/dsl";
import { UseQueryReturnValue } from "../types";
