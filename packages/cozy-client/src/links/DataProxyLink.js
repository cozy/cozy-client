import CozyLink from './CozyLink'

export default class DataProxyLink extends CozyLink {
  /**
   * @param {object} [options] - Options
   * @param  {object} [options.dataproxy] - The dataproxy reference
   */
  constructor({ dataproxy } = {}) {
    super()
    this.dataproxy = dataproxy || null
  }

  registerClient(client) {
    // does nothing, we don't need any client for this kind of link
  }

  /**
   * When the link is given to a cozy-client instance, the dataproxy might not be ready yet.
   * Thus, this method will be typically called afterwards by the DataProxyProvider once
   * the dataproxy is ready and set
   *
   * @param {object} dataproxy - The dataproxy instance
   */
  registerDataProxy(dataproxy) {
    this.dataproxy = dataproxy
  }

  async reset() {
    // does nothing, we don't need any client for this kind of link
  }

  async request(operation, options, result, forward) {
    if (this.dataproxy) {
      // Send the request to the DataProxy, that will handle both web and mobile environments
      const opts = options || {}
      return this.dataproxy.requestLink(operation, opts)
    } else {
      return forward(operation, options)
    }
  }

  async persistCozyData(data, forward) {
    // Persist data should do nothing here as data is already persisted on DataProxy side
    return
  }
}
