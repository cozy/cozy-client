const mockImplementations = (base, implementations) => {
  if (!implementations) {
    return
  }
  Object.entries(implementations).map(([name, implementation]) => {
    try {
      base[name].mockImplementation(implementation)
    } catch (e) {
      console.error(e)
      throw new Error(`Could not mock '${name}. Original error above.`)
    }
  })
}

export const client = implementations => {
  const base = {
    query: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    destroy: jest.fn(),
    getAssociation: jest.fn(),
    makeObservableQuery: jest.fn(),
    requestQuery: jest.fn(),
    all: jest.fn(),
    setStore: jest.fn(),
    fetchQueryAndGetFromState: jest.fn()
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
