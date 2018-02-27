import React from 'react'
import { createStore, combineReducers } from 'redux'
import { default as configureMockStore } from 'redux-mock-store'
import { shallow } from 'enzyme'

import CozyStackLink from 'cozy-stack-link'

import CozyClient from '../CozyClient'
import connect from '../connect'
import { all } from '../Query'
import { getQueryFromStore, initQuery } from '../store'

import { TODO_1, TODO_2, TODO_3 } from './fixtures'

describe('connect', () => {
  const link = new CozyStackLink()
  const client = new CozyClient({ link })

  it('should dispatch the query on componentWillMount', () => {
    const store = configureMockStore()({})
    client.setStore(store)
    const Foo = () => <div>Foo</div>
    const query = all('io.cozy.todos')
    const ConnectedFoo = connect(query, { as: 'allTodos' })(Foo)
    const wrapper = shallow(<ConnectedFoo />, { context: { client } })
    expect(store.getActions()[0]).toEqual(initQuery('allTodos', query))
  })

  it('should inject data props into the wrapped component', async () => {
    const store = createStore(combineReducers({ cozy: client.reducer() }))
    client.setStore(store)
    link.collection().all.mockReturnValueOnce(
      Promise.resolve({
        data: [TODO_1, TODO_2, TODO_3],
        meta: { count: 3 },
        skip: 0,
        next: false
      })
    )
    const waitForSuccess = () => {
      store.subscribe(() => {
        const query = getQueryFromStore(store.getState(), 'allTodos')
        if (query.fetchStatus === 'loaded') {
          return Promise.resolve()
        }
      })
    }
    const TodoList = ({ data, fetchStatus }) =>
      fetchStatus === 'loading' ? (
        <div>Loading</div>
      ) : (
        <ul>{data.map(todo => <li key={todo._id}>{todo.label}</li>)}</ul>
      )
    const query = all('io.cozy.todos')
    const ConnectedTodoList = connect(query, { as: 'allTodos' })(TodoList)
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
