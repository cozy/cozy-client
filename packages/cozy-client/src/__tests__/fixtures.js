export const TODO_1 = {
  _id: '12345',
  _rev: '4-43bdf4f7123f4d748645ba9536a46daa',
  _type: 'io.cozy.todos',
  label: 'Buy bread',
  done: false
}

export const TODO_2 = {
  _id: '67890',
  _rev: '2-4e015d830d3246e5a83b3466f437bf1f',
  _type: 'io.cozy.todos',
  label: 'Check email',
  done: false
}

export const TODO_3 = {
  _id: '54321',
  _rev: '22-6af94ee48bcc4867aa06b72b635837e9',
  _type: 'io.cozy.todos',
  label: 'Build stuff',
  done: true
}
export const TODO_4 = {
  _id: '4',
  _rev: '19-cc30042f909f4fa7a487c4c7f0a11d19',
  _type: 'io.cozy.todos',
  label: 'Run a semi-marathon',
  done: true
}

export const TODOS = [TODO_1, TODO_2, TODO_3]

export const TODO_WITH_RELATION = {
  _id: 5,
  _rev: '1-7f02bbb542fb4eb0805b130a80b9be1a',
  _type: 'io.cozy.todos',
  label: 'tototot',
  relationships: {
    attachments: {
      doctype: 'io.cozy.files',
      files: [
        {
          _type: 'io.cozy.files',
          _id: 1
        },
        {
          _type: 'io.cozy.files',
          _id: 2
        }
      ]
    }
  }
}

export const FILE_1 = {
  _id: 1,
  _rev: '3-bd9bb7286a094842b954d9e86429090d',
  _type: 'io.cozy.files',
  label: 'File 1'
}
export const FILE_2 = {
  _id: 2,
  _rev: '2-aa462e9a9867449f916c932fef481c27',
  _type: 'io.cozy.files',
  label: 'File 2'
}
export const SCHEMA = {
  todos: {
    doctype: 'io.cozy.todos',
    relationships: {
      attachments: {
        type: 'has-many',
        doctype: 'io.cozy.files'
      },
      authors: {
        type: 'has-many',
        doctype: 'io.cozy.persons'
      }
    }
  }
}
