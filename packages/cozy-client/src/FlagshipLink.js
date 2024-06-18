import CozyLink from './CozyLink'
import logger from './logger'

export default class FlagshipLink extends CozyLink {
  /**
   * @param {object} [options] - Options
   * @param  {object} [options.stackClient] - A StackClient
   * @param  {object} [options.client] - A StackClient (deprecated)
   * @param  {import('cozy-intent').WebviewService} [options.webviewIntent] - The webview's intent reference
   */
  constructor({ client, stackClient, webviewIntent } = {}) {
    super()
    if (client) {
      logger.warn(
        'Using options.client is deprecated, prefer options.stackClient'
      )
    }
    this.stackClient = stackClient || client
    this.webviewIntent = webviewIntent
  }

  registerClient(client) {
    this.stackClient = client.stackClient || client.client
  }

  reset() {
    this.stackClient = null
  }

  async request(operation, result, forward) {
    return this.webviewIntent.call('flagshipLinkRequest', operation)
  }

  async persistData(data, forward) {
    // Persist data should do nothing here as data is already persisted on Flagship side
    return
  }
}
