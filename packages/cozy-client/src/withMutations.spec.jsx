import React from 'react'
import { shallow } from 'enzyme'

import CozyClient from '../CozyClient'
import CozyLink from '../CozyLink'
import withMutations from '../withMutations'

describe('withMutations', () => {
  const clientMock = {
    create: jest.fn(),
    destroy: jest.fn(),
    save: jest.fn(),
    mutate: jest.fn()
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should inject base mutations props into wrapped component', async () => {
    const Foo = () => <div />
    const ConnectedFoo = withMutations()(Foo)

    const wrapper = shallow(<ConnectedFoo />, { context: { client: clientMock } })

    const {
      createDocument,
      saveDocument,
      deleteDocument
    } = wrapper.props()

    expect(typeof createDocument).toBe('function')
    expect(typeof saveDocument).toBe('function')
    expect(typeof deleteDocument).toBe('function')
  })

  it('should inject mutations props from one source into wrapped component', async () => {
    const Foo = () => <div />

    const ConnectedFoo = withMutations(client => ({
      mutate: client => client.mutate()
    }))(Foo)

    const wrapper = shallow(<ConnectedFoo />, { context: { client: clientMock } })

    const {
      mutate
    } = wrapper.props()
    expect(typeof mutate).toBe('function')

    mutate(clientMock)
    expect(clientMock.mutate).toHaveBeenCalled()
  })
})
