export default class CozyLink {
  constructor(requestHandler, persistHandler) {
    if (typeof requestHandler === 'function') {
      this.request = requestHandler
    }

    if (typeof persistHandler === 'function') {
      this.persistData = persistHandler
    }
  }

  request(operation, result, forward) {
    throw new Error('request is not implemented')
  }

  persistData(data, forward) {
    throw new Error('persistData is not implemented')
  }
}

const toLink = handler =>
  typeof handler === 'function' ? new CozyLink(handler) : handler

const defaultLinkRequestHandler = (operation, result) => {
  if (result) return result
  else if (operation.execute) return operation.execute()
  else
    throw new Error(
      `No link could handle operation ${JSON.stringify(operation)}`
    )
}

const defaultLinkPersistHandler = (operation, result) => {
  // Do nothing
}

const defaultLinkHandler = new CozyLink(
  defaultLinkRequestHandler,
  defaultLinkPersistHandler
)

export const chain = links =>
  [...links, defaultLinkHandler].map(toLink).reduce(concat)

const concat = (firstLink, nextLink) => {
  const requestHandler = (operation, result, forward) => {
    const nextForward = (op, res) => {
      return nextLink.request(op, res, forward)
    }
    return firstLink.request(operation, result, nextForward)
  }

  const persistHandler = (data, forward) => {
    const nextForward = d => {
      return nextLink.persistData(d, forward)
    }
    return firstLink.persistData(data, nextForward)
  }

  return new CozyLink(requestHandler, persistHandler)
}
