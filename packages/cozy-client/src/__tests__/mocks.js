const mockImplementations = (base, implementations) => {
  if (!implementations) {
    return
  }
  Object.entries(implementations).map(([name, implementation]) => {
    base[name].mockImplementation(implementation)
  })
}

export const client = implementations => {
  const base = {
    query: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    destroy: jest.fn(),
    getAssociation: jest.fn(),
    watchQuery: jest.fn(),
    all: jest.fn()
  }
  mockImplementations(base, implementations)
  return base
}

export const observableQuery = implementations => {
  const base = {
    currentResult: jest.fn(),
    subscribe: jest.fn(),
    fetchMore: jest.fn(),
    fetch: jest.fn()
  }
  mockImplementations(base, implementations)
  return base
}
