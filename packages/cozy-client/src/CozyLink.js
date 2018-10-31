export default class CozyLink {
  constructor(requestHandler) {
    if (typeof requestHandler === 'function') {
      this.request = requestHandler
    }
  }

  request(operation, result, forward) {
    throw new Error('request is not implemented')
  }
}

const toLink = handler =>
  typeof handler === 'function' ? new CozyLink(handler) : handler

const defaultLinkHandler = (operation, result) => {
  if (result) return result
  else
    throw new Error(
      `No link could handle operation ${JSON.stringify(operation)}`
    )
}

export const chain = links =>
  [...links, defaultLinkHandler].map(toLink).reduce(concat)

const concat = (firstLink, nextLink) => {
  return new CozyLink((operation, result, forward) => {
    const nextForward = (op, res) => {
      return nextLink.request(op, res, forward)
    }
    return firstLink.request(operation, result, nextForward)
  })
}
