import React from 'react'
import { shallow } from 'enzyme'

import CozyClient from '../CozyClient'
import CozyLink from '../CozyLink'
import withMutation from '../withMutation'

describe('withMutation', () => {
  const NEW_TODO = {
    label: 'Jettison fairings',
    _type: 'io.cozy.todos',
    done: false
  }
  const link = new CozyLink(
    jest.fn(() => Promise.resolve({ data: [NEW_TODO] }))
  )
  const client = new CozyClient({ link })

  const mutationCreator = jest.fn()

  it('should inject a `mutate` prop into the wrapped component', async () => {
    const AddButton = ({ mutate }) => (
      <button onClick={() => mutate(NEW_TODO)}>Add</button>
    )
    const ConnectedAddButton = withMutation(mutationCreator)(AddButton)

    const wrapper = shallow(<ConnectedAddButton />, { context: { client } })
    wrapper
      .dive()
      .find('button')
      .simulate('click')

    expect(mutationCreator).toHaveBeenCalledWith(NEW_TODO)
  })

  it('should inject a prop whose name match the `name` option', async () => {
    const AddButton = ({ addTodo }) => (
      <button onClick={() => addTodo(NEW_TODO)}>Add</button>
    )
    const ConnectedAddButton = withMutation(mutationCreator, {
      name: 'addTodo'
    })(AddButton)

    const wrapper = shallow(<ConnectedAddButton />, { context: { client } })
    wrapper
      .dive()
      .find('button')
      .simulate('click')

    expect(mutationCreator).toHaveBeenCalledWith(NEW_TODO)
  })
})
