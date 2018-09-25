# Higher-Order Component (HOC)

## Connect

If you prefer HOCs to render-prop components, we provide a higher-order component called `connect`. Basic example of usage:

```jsx
import React from 'react'
import { connect } from 'cozy-client'

const query = client => client.find('io.cozy.todos').where({ checked: false })

const TodoList = ({ data, fetchStatus }) =>
  fetchStatus !== 'loaded'
    ? <h1>Loading...</h1>
    : <ul>{data.map(todo => <li>{todo.label}</li>)}</ul>

export default connect(query)(TodoList)
```

When we use `connect` to bind a query to a component, three things happen:
 - The query passed as an argument will be executed when the component mounts, resulting in the loading of data from the client-side store, or the server if the data is not in the store ;
 - Our component subscribes to the store, so that it is updated if the data changes ;
 - props are injected into the component: if we were to declare `propTypes` they would look like this:

```jsx
TodoList.propTypes = {
  fetchStatus: PropTypes.string.isRequired,
  data: PropTypes.array
}
```

## withMutation

Using `withMutation` higher-order component makes it easy to bind actions to your components. `withMutation` provides only a simple function to the wrapper component, in a prop called `mutate`:

```jsx
import { withMutation } from 'cozy-client'

const AddTodo = ({ mutate }) => {
  let input

  return (
    <form onSubmit={e => {
      e.preventDefault()
      mutate(input.value)
      input.value = ''
    }}>
      <input ref={node => { input = node }} />
      <button type="submit">Add Todo</button>
    </form>
  )
}

export default withMutation(
  label => client => client.create('io.cozy.todos', { label })
)(AddTodo)
```
