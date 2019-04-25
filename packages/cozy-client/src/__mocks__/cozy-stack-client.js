const StackClient = jest.requireActual('cozy-stack-client').default

const collectionMock = {
  all: jest.fn(() => Promise.resolve()),
  find: jest.fn(() => Promise.resolve()),
  create: jest.fn(() => Promise.resolve()),
  update: jest.fn(() => Promise.resolve()),
  destroy: jest.fn(() => Promise.resolve()),
  findReferencedBy: jest.fn(() => Promise.resolve())
}

class MockedStackClient extends StackClient {
  constructor(opts) {
    super(opts)
    this.collection = jest.fn(() => collectionMock)
  }
}

export default MockedStackClient
