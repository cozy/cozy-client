import makeUtils from 'cozy-ui/codemods/utils'

export default function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)
  const utils = makeUtils(j)

  const clientAllExpressions = root.find(j.CallExpression, {
    callee: { object: { name: 'client' }, property: { name: 'all' } }
  })

  clientAllExpressions.forEach(path => {
    path.node.callee = 'Q'
  })

  if (clientAllExpressions.length > 0) {
    utils.imports.add(
      root,
      {
        Q: true
      },
      'cozy-client'
    )
  }

  return root.toSource()
}
