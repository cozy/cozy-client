export default class CozyLink {
  constructor(requestHandler) {
    this.handler = requestHandler
  }

  execute(request) {
    return this.handler(request)
  }
}

export class StackLink {
  constructor({ client }) {
    this.client = client
  }

  execute(request) {
    if (typeof request === 'function') {
      return this.executeMutation(request)
    }
    return this.executeQuery(request)
  }

  executeQuery({ doctype, selector, ...options }) {
    if (!doctype) {
      throw new Error('No doctype found in a query definition')
    }
    const collection = this.client.collection(doctype)
    return !selector
      ? collection.all(options)
      : collection.find(selector, options)
  }

  executeMutation(mutationFn) {
    return mutationFn(this.client)
  }
}
