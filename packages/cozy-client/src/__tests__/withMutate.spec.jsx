import React from 'react'
import { shallow } from 'enzyme'

import CozyStackLink from 'cozy-stack-link'

import CozyClient from '../CozyClient'
import withMutate from '../withMutate'

describe('withMutate', () => {
  const link = new CozyStackLink()
  const client = new CozyClient({ link })

  const NEW_TODO = {
    label: 'Jettison fairings',
    done: false
  }

  link
    .collection()
    .create.mockReturnValue(Promise.resolve({ data: [NEW_TODO] }))

  const mutationCreator = newTodo => link =>
    link.collection('io.cozy.todos').create(newTodo)

  it('should inject a `mutate` prop into the wrapped component', async () => {
    const AddButton = ({ mutate }) => (
      <button onClick={() => mutate(NEW_TODO)}>Add</button>
    )
    const ConnectedAddButton = withMutate(mutationCreator)(AddButton)

    const wrapper = shallow(<ConnectedAddButton />, {
      context: { client }
    })
    wrapper
      .dive()
      .find('button')
      .simulate('click')

    expect(link.collection().create).toHaveBeenCalledWith(NEW_TODO)
  })

  it('should inject a prop whose name match the `name` option', async () => {
    const AddButton = ({ addTodo }) => (
      <button onClick={() => addTodo(NEW_TODO)}>Add</button>
    )
    const ConnectedAddButton = withMutate(mutationCreator, { name: 'addTodo' })(
      AddButton
    )

    const wrapper = shallow(<ConnectedAddButton />, {
      context: { client }
    })
    wrapper
      .dive()
      .find('button')
      .simulate('click')

    expect(link.collection().create).toHaveBeenCalledWith(NEW_TODO)
  })
})
