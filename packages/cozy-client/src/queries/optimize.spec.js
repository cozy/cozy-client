import { QueryDefinition } from '../queries/dsl'
import optimizeQueries from './optimize'

describe('query optimization', () => {
  it('should group id queries together', () => {
    const queries = [
      new QueryDefinition({ id: 1, doctype: 'io.cozy.todos' }),
      new QueryDefinition({ id: 2, doctype: 'io.cozy.todos' }),
      new QueryDefinition({ id: 3, doctype: 'io.cozy.todos' }),
      new QueryDefinition({ ids: [6, 7, 8], doctype: 'io.cozy.todos' }),
      new QueryDefinition({ id: 4, doctype: 'io.cozy.rockets' }),
      new QueryDefinition({ id: 5, doctype: 'io.cozy.rockets' }),
      new QueryDefinition({ id: 6, doctype: 'io.cozy.rockets' })
    ]

    const optimized = optimizeQueries(queries)
    expect(optimized.length).toBe(2)
    expect(optimized[0]).toMatchObject({
      ids: [1, 2, 3, 6, 7, 8],
      doctype: 'io.cozy.todos'
    })
    expect(optimized[1]).toMatchObject({
      ids: [4, 5, 6],
      doctype: 'io.cozy.rockets'
    })
  })

  it('should not fail when there are no id queries', () => {
    const queries = [
      new QueryDefinition({
        selector: { done: false },
        doctype: 'io.cozy.todos'
      })
    ]
    const optimized = optimizeQueries(queries)
    expect(optimized.length).toBe(1)
  })

  it('should deduplicate identical queries', () => {
    const queries = []

    for (let i = 0; i <= 5; i++)
      queries.push(
        new QueryDefinition({
          doctype: 'io.cozy.foos',
          selector: { far: 'buz' }
        })
      )

    const optimized = optimizeQueries(queries)
    expect(optimized).toEqual([
      new QueryDefinition({
        doctype: 'io.cozy.foos',
        selector: { far: 'buz' }
      })
    ])
  })
})
