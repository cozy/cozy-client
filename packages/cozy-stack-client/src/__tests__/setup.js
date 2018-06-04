const fail = msg => ({ message: () => msg, pass: false })

expect.extend({
  toConformToJSONAPI(received) {
    if (!Array.isArray(received.data) && typeof received.data !== 'object')
      return fail('expected response to have a `data` property')
    if (Array.isArray(received.data)) {
      if (
        typeof received.meta !== 'object' ||
        !received.meta.hasOwnProperty('count')
      )
        return fail(
          'expected response to have a `meta` property with a `count`'
        )
      if (typeof received.next !== 'boolean')
        return fail('expected response to have a boolean `next` property')
      if (typeof received.skip !== 'number')
        return fail('expected response to have a `skip` property')
    }
    return {
      message: () => 'expected response to conform to JSON API',
      pass: true
    }
  },
  toHaveDocumentIdentity(received) {
    if (!received.id) return fail('expected document to have an `id` property')
    if (!received._id)
      return fail('expected document to have an `_id` property')
    if (!received._type)
      return fail('expected document to have a `_type` property')
    return {
      message: () => 'expected document to be normalized',
      pass: true
    }
  }
})

// In Node v7 unhandled promise rejections will terminate the process
if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
  process.on('unhandledRejection', reason => {
    console.log('REJECTION', reason)
  })
  // Avoid memory leak by adding too many listeners
  process.env.LISTENING_TO_UNHANDLED_REJECTION = true
}
