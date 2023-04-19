export function useQueries(querySpecs: any): {};
export default useQuery;
/**
 * Fetches a queryDefinition and returns the queryState
 *
 * @param {QueryDefinition} queryDefinition - Definition created with Q()
 * @param {import("../types").QueryOptions} options - Options created with Q()
 * @returns {import("../types").UseQueryReturnValue}
 */
declare function useQuery(queryDefinition: QueryDefinition, options: import("../types").QueryOptions): import("../types").UseQueryReturnValue;
import { QueryDefinition } from "../queries/dsl";
