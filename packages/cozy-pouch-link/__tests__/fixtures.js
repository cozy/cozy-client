// TODO figure if it would be a good idea to share common files
// under a common directory at the root of the workspace
export const TODO_1 = {
  _id: '1',
  _type: 'io.cozy.todos',
  label: 'Buy bread',
  done: false
}
export const TODO_2 = {
  _id: '2',
  _type: 'io.cozy.todos',
  label: 'Check email',
  done: false
}
export const TODO_3 = {
  _id: '3',
  _type: 'io.cozy.todos',
  label: 'Build stuff',
  done: true
}
export const TODO_4 = {
  _id: '4',
  _type: 'io.cozy.todos',
  label: 'Run a semi-marathon',
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
