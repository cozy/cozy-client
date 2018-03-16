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

export const chain = links => links.map(toLink).reduce(concat)

const concat = (firstLink, nextLink) =>
  new CozyLink((operation, result, forward) =>
    firstLink.request(operation, result, (op, res) =>
      nextLink.request(op, res, forward)
    )
  )
