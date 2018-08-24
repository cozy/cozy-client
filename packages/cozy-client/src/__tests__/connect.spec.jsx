import React from 'react'
import { createStore, combineReducers } from 'redux'
import { default as configureMockStore } from 'redux-mock-store'
import { shallow } from 'enzyme'

import CozyClient from '../CozyClient'
import CozyLink from '../CozyLink'
import connect from '../connect'
import { getQueryFromState, initQuery } from '../store'

import { TODO_1, TODO_2, TODO_3 } from './fixtures'

describe('connect', () => {
  const requestHandler = jest.fn()
  const link = new CozyLink(requestHandler)
  const client = new CozyClient({ link })

  it('should dispatch the query on componentWillMount', () => {
    const store = configureMockStore()({})
    client.setStore(store)
    const Foo = () => <div>Foo</div>
    const query = client.all('io.cozy.todos')
    const ConnectedFoo = connect(
      query,
      { as: 'allTodos' }
    )(Foo)
    shallow(<ConnectedFoo />, { context: { client } })
    expect(store.getActions()[0]).toEqual(initQuery('allTodos', query))
  })

  it('should inject data props into the wrapped component', async () => {
    const store = createStore(combineReducers({ cozy: client.reducer() }))
    client.setStore(store)
    requestHandler.mockReturnValueOnce(
      Promise.resolve({
        data: [TODO_1, TODO_2, TODO_3],
        meta: { count: 3 },
        skip: 0,
        next: false
      })
    )
    const waitForSuccess = () =>
      new Promise(resolve => {
        store.subscribe(() => {
          const query = getQueryFromState(store.getState(), 'allTodos')
          if (query.fetchStatus === 'loaded') {
            resolve()
          }
        })
      })

    const TodoList = ({ data, fetchStatus }) =>
      fetchStatus === 'loading' ? (
        <div>Loading</div>
      ) : (
        <ul>
          {data.map(todo => (
            <li key={todo._id}>{todo.label}</li>
          ))}
        </ul>
      )

    const query = client.all('io.cozy.todos')
    const ConnectedTodoList = connect(
      query,
      { as: 'allTodos' }
    )(TodoList)
    const wrapper = shallow(<ConnectedTodoList />, {
      context: { client, store }
    })
    expect(
      wrapper
        .dive()
        .dive()
        .contains(<div>Loading</div>)
    ).toBe(true)

    await waitForSuccess()

    expect(
      wrapper
        .dive()
        .dive()
        .find('li')
    ).toHaveLength(3)
  })
})
