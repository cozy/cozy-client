const groupBy = (arr, fn) => {
  const res = {}
  for (let item of arr) {
    const groupKey = fn(item)
    res[groupKey] = res[groupKey] || []
    res[groupKey].push(item)
  }
  return res
}

const reactSpecificIdentifiers = [
  'CozyProvider',
  'Query',
  'withClient',
  'withMutation',
  'withMutations',
  'queryConnect',
  'withClient',
  'connect'
]

const isReactSpecifier = spec => {
  if (!spec.imported) {
    return false
  }
  return reactSpecificIdentifiers.includes(spec.imported.name)
}

export default function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  const importDeclarations = root.find(j.ImportDeclaration, {
    source: {
      value: 'cozy-client'
    }
  })

  importDeclarations.forEach(path => {
    const node = path.node

    const {
      true: reactSpecifiers = [],
      false: nonReactSpecifiers = []
    } = groupBy(node.specifiers, isReactSpecifier)

    if (reactSpecifiers.length) {
      path.insertAfter(
        j.importDeclaration(reactSpecifiers, j.literal('cozy-client/react'))
      )
    }

    node.specifiers = nonReactSpecifiers
    if (node.specifiers.length === 0) {
      path.prune()
    }
  })

  return root.toSource()
}
