export default useQueryAll;
/**
 * Fetches a queryDefinition and run fetchMore on the query until the query is fully loaded
 *
 * @param {QueryDefinition} queryDefinition - Definition created with Q()
 * @param {import("../types").QueryOptions} options - Options created with Q()
 * @returns {import("../types").UseQueryReturnValue}
 */
declare function useQueryAll(queryDefinition: QueryDefinition, options: import("../types").QueryOptions): import("../types").UseQueryReturnValue;
import { QueryDefinition } from "../queries/dsl";
