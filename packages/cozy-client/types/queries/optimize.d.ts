export default optimizeQueries;
/**
 * Reduce the number of queries used to fetch documents.
 *
 * - Deduplication of queries
 * - Groups id queries
 *
 * @param  {QueryDefinition[]} queries - Queries to optimized
 * @returns {QueryDefinition[]} Optimized queries
 * @private
 */
declare function optimizeQueries(queries: QueryDefinition[]): QueryDefinition[];
import { QueryDefinition } from "./dsl";
