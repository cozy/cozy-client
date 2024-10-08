/**
 * Creates and starts and HTTP server suitable for OAuth authentication
 */
export type DestroyableServer = object;
/**
 * Creates a client with interactive authentication.
 *
 * - Will start an OAuth flow and open an authentication page
 * - Starts a local server to listen for the oauth callback
 * - Resolves with the client after user authentication
 *
 * @param {object} clientOptions Same as CozyClient::constructor.
 *
 * @example
 * ```
 * import { createClientInteractive } from 'cozy-client/dist/cli'
 * await createClientInteractive({
 *   uri: 'http://cozy.tools:8080',
 *   scope: ['io.cozy.bills'],
 *   oauth: {
 *     softwareID: 'my-cli-application-using-bills'
 *   }
 * })
 * ```
 *
 * @returns {Promise<CozyClient>} - A client that is ready with a token
 */
export function createClientInteractive(clientOptions: object, serverOpts: any): Promise<CozyClient>;
import CozyClient from '../CozyClient';
