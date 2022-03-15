export function useQueries(querySpecs: any): {};
export default useQuery;
/**
 * Fetches a queryDefinition and returns the queryState
 *
 * @param {QueryDefinition} queryDefinition - Definition created with Q()
 * @param {QueryOptions} options - Options created with Q()
 * @returns {UseQueryReturnValue}
 */
declare function useQuery(queryDefinition: QueryDefinition, options: QueryOptions): UseQueryReturnValue;
import { QueryDefinition } from "../queries/dsl";
import { QueryOptions } from "../types";
import { UseQueryReturnValue } from "../types";
