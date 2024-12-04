/**
 * Creates a client suitable for use in tests
 *
 * - client.{query,save} are mocked
 * - client.stackClient.fetchJSON is mocked
 *
 * @param  {object} options Options
 * @param  {object} [options.queries] Prefill queries inside the store
 * @param  {object} [options.remote] Mock data from the server
 * @param  {object} [options.clientOptions] Options passed to the client
 * @param  {object} [options.clientFunctions] Functions to overide client functions
 * @returns {CozyClient}
 */
export function createMockClient({ queries, remote, clientOptions, clientFunctions }?: {
    queries: object;
    remote: object;
    clientOptions: object;
    clientFunctions: object;
}): CozyClient;
/**
 * Creates a client with pre-filled store
 * This can be useful for demo in documentation (e.g. storybook)
 *
 * - client.{query,save} are replaced with empty functions
 * - client.stackClient.fetchJSON is replaced with empty functions
 *
 * @param  {object} options Options
 * @param  {object} [options.queries] Prefill queries inside the store
 * @param  {object} [options.remote] Mock data from the server
 * @param  {object} [options.clientOptions] Options passed to the client
 * @param  {object} [options.clientFunctions] Functions to overide client functions useful for testing
 * @returns {CozyClient}
 */
export function createFakeClient({ queries, remote, clientOptions, clientFunctions }?: {
    queries: object;
    remote: object;
    clientOptions: object;
    clientFunctions: object;
}): CozyClient;
import CozyClient from "./CozyClient";
