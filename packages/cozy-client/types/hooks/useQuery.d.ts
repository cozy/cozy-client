export function useQueries(querySpecs: any): {};
export default useQuery;
/**
 * Fetches a queryDefinition and returns the queryState
 *
 * @param  {object} queryDefinition - Definition created with Q()
 *
 * @param  {object} options - Options
 * @param  {object} options.as - Name for the query [required]
 * @param  {boolean} options.enabled - If set to false, the query won't be executed
 * @param  {object} options.fetchPolicy - Fetch policy
 * @param  {object} options.singleDocData - If true, the "data" returned will be
 * a single doc instead of an array for single doc queries. Defaults to false for backward
 * compatibility but will be set to true in the future.
 *
 * @returns {UseQueryReturnValue}
 */
declare function useQuery(queryDefinition: object, options: {
    as: object;
    enabled: boolean;
    fetchPolicy: object;
    singleDocData: object;
}): UseQueryReturnValue;
import { UseQueryReturnValue } from "../types";
