import path from 'path'
import ts from 'typescript'

it('accepts supported create and mutate options in the published types', () => {
  const filename = path.resolve(__dirname, '../types/CozyClient.consumer.js')
  const source = `
    import CozyClient from './CozyClient'

    const client = new CozyClient({})
    client.create('io.cozy.todos', {}, null, {
      updateQueries: {
        todos: (documents, response) => documents.concat(response.data)
      }
    })
    client.create('io.cozy.files', {}, null, { forceStack: true })
    client.create('io.cozy.files', {}, null, {
      forceLink: 'stack', as: 'create-directory'
    })
    client.create('io.cozy.todos', {})

    const mutation = {
      mutationType: 'CREATE_DOCUMENT',
      document: { _type: 'io.cozy.todos', title: 'A task' }
    }
    client.mutate(mutation)
    client.mutate(mutation, { forceLink: 'stack' })
    client.mutate(mutation, { forceStack: true })
    client.mutate(mutation, {
      as: 'create-task',
      update: document => document,
      updateQueries: {
        todos: (documents, response) => documents.concat(response.data)
      },
      options: {}
    })

    // @ts-expect-error Link names must be strings.
    client.mutate(mutation, { forceLink: false })
    // @ts-expect-error The legacy routing flag must be a boolean.
    client.mutate(mutation, { forceStack: 'stack' })
    // @ts-expect-error Each query updater must be a function.
    client.mutate(mutation, { updateQueries: { todos: 'invalid' } })

    // @ts-expect-error Each query updater must be a function.
    client.create('io.cozy.todos', {}, null, { updateQueries: { todos: 'invalid' } })
  `
  const options = {
    allowJs: true,
    checkJs: true,
    noEmit: true,
    skipLibCheck: true,
    esModuleInterop: true,
    target: ts.ScriptTarget.ES2018,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    types: []
  }
  const host = ts.createCompilerHost(options)
  const getSourceFile = host.getSourceFile.bind(host)
  host.getSourceFile = (name, languageVersion, ...args) =>
    name === filename
      ? ts.createSourceFile(name, source, languageVersion)
      : getSourceFile(name, languageVersion, ...args)
  const program = ts.createProgram([filename], options, host)
  const diagnostics = ts.getPreEmitDiagnostics(program)

  expect(
    diagnostics.map(diagnostic =>
      ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
    )
  ).toEqual([])
})
