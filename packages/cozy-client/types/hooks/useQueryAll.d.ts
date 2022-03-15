export default useQueryAll;
/**
 * Fetches a queryDefinition and run fetchMore on the query until the query is fully loaded
 *
 * @param {QueryDefinition} queryDefinition - Definition created with Q()
 * @param {QueryOptions} options - Options created with Q()
 * @returns {UseQueryReturnValue}
 */
declare function useQueryAll(queryDefinition: QueryDefinition, options: QueryOptions): UseQueryReturnValue;
import { QueryDefinition } from "../queries/dsl";
import { QueryOptions } from "../types";
import { UseQueryReturnValue } from "../types";
