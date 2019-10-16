import React from 'react'
import { shallow } from 'enzyme'

import withMutations from './withMutations'

describe('withMutations', () => {
  const clientMock = {
    create: jest.fn(),
    destroy: jest.fn(),
    save: jest.fn(),
    mutate: jest.fn(),
    mutateAsWell: jest.fn()
  }

  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should not throw error on withMutations usage', () => {
    const Foo = () => <div />
    // mock for proptypes
    jest.spyOn(console, 'error').mockImplementation(message => {
      throw new Error(message)
    })
    const mutationsMock = client => ({
      myMutation1: () => {},
      myMutation2: () => {}
    })

    expect(() => {
      const ConnectedFoo = withMutations(mutationsMock)(Foo)
      shallow(<ConnectedFoo />, {
        context: { client: clientMock }
      })
    }).not.toThrowError()
  })

  it('should inject base mutations props into wrapped component', async () => {
    const Foo = () => <div />
    const ConnectedFoo = withMutations()(Foo)

    const wrapper = shallow(<ConnectedFoo />, {
      context: { client: clientMock }
    })

    const { createDocument, saveDocument, deleteDocument } = wrapper.props()

    expect(typeof createDocument).toBe('function')
    expect(typeof saveDocument).toBe('function')
    expect(typeof deleteDocument).toBe('function')
  })

  it('should inject mutations props from one source into wrapped component', async () => {
    const Foo = () => <div />

    const ConnectedFoo = withMutations(client => ({
      mutate: client => client.mutate()
    }))(Foo)

    const wrapper = shallow(<ConnectedFoo />, {
      context: { client: clientMock }
    })

    const { mutate } = wrapper.props()
    expect(typeof mutate).toBe('function')

    mutate(clientMock)
    expect(clientMock.mutate).toHaveBeenCalled()
  })

  it('should inject mutations props from several sources into wrapped component', async () => {
    const Foo = () => <div />

    const mutations = client => ({
      mutate: client => client.mutate()
    })

    const anotherMutations = client => ({
      mutateAsWell: client => client.mutateAsWell()
    })

    const ConnectedFoo = withMutations(mutations, anotherMutations)(Foo)

    const wrapper = shallow(<ConnectedFoo />, {
      context: { client: clientMock }
    })

    const { mutate, mutateAsWell } = wrapper.props()

    expect(typeof mutate).toBe('function')
    expect(typeof mutateAsWell).toBe('function')

    mutate(clientMock)
    expect(clientMock.mutate).toHaveBeenCalled()

    mutateAsWell(clientMock)
    expect(clientMock.mutateAsWell).toHaveBeenCalled()
  })
})
