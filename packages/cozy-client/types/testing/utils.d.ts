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
export function makeWrapper(client: any): ({ children }: {
    children: any;
}) => JSX.Element;
import CozyClient from "../CozyClient";
