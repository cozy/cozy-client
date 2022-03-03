/**
 * Setups a client suitable for testing
 */
export type MockQueryOptions = any;
/**
 * Setups a client suitable for testing
 *
 * @typedef {object} MockQueryOptions
 *
 * @param  {object} options - Options
 * @param  {MockQueryOptions} [options.queries] - Additional queries to insert in the client
 * @returns {CozyClient}
 */
export function setupClient({ queries }?: {
    queries: MockQueryOptions;
}): CozyClient;
/**
 * @private
 * @param  {CozyClient} client - A client
 * @returns {any}
 */
export function makeWrapper(client: CozyClient): any;
import CozyClient from "../CozyClient";
