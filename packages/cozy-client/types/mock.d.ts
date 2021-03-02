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
 * @returns {CozyClient}
 */
export function createMockClient({ queries, remote, clientOptions }: {
    queries: object;
    remote: object;
    clientOptions: object;
}): CozyClient;
import CozyClient from "./CozyClient";
