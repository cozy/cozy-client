import CozyLink from './CozyLink'

export default class WebFlagshipLink extends CozyLink {
  /**
   * @param {object} [options] - Options
   * @param  {import('cozy-intent').WebviewService} [options.webviewIntent] - The webview's intent reference
   */
  constructor({ webviewIntent } = {}) {
    super()
    this.webviewIntent = webviewIntent
  }

  registerClient(client) {
    // does nothing, we don't need any client for this kind of link
  }

  async reset() {
    // does nothing, we don't need any client for this kind of link
  }

  async request(operation, result, forward) {
    return this.webviewIntent.call('flagshipLinkRequest', operation)
  }

  async persistCozyData(data, forward) {
    // Persist data should do nothing here as data is already persisted on Flagship side
    return
  }
}
