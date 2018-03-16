export const TODO_1 = {
  _id: '12345',
  _type: 'io.cozy.todos',
  label: 'Buy bread',
  done: false
}
export const TODO_2 = {
  _id: '67890',
  _type: 'io.cozy.todos',
  label: 'Check email',
  done: false
}
export const TODO_3 = {
  _id: '54321',
  _type: 'io.cozy.todos',
  label: 'Build stuff',
  done: true
}

export const TODO_SCHEMA = {
  todos: {
    doctype: 'io.cozy.todos',
    relationships: {
      attachments: {
        type: 'has-many',
        doctype: 'io.cozy.files'
      }
    }
  }
}
