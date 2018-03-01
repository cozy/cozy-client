import CozyStackClient from 'cozy-stack-client'
import { StackLink } from '../CozyLink'
import { all, find } from '../Query'
import { update } from '../Mutation'

describe('StackLink', () => {
  const client = new CozyStackClient()
  const link = new StackLink({ client })

  it('should call `document(<doctype>).all() on the stack client for `all()` queries', async () => {
    const allQuery = all('io.cozy.todos')
    client.collection().all.mockReset()
    await link.execute(allQuery)
    expect(client.collection().all).toHaveBeenCalled()
    expect(client.collection).toHaveBeenCalledWith('io.cozy.todos')
  })

  it('should call `document(<doctype>).find() on the stack client for `find()` queries', async () => {
    const findQuery = find('io.cozy.todos').where({ checked: true })
    client.collection().find.mockReset()
    await link.execute(findQuery)
    expect(client.collection().find).toHaveBeenCalledWith({ checked: true }, {})
  })

  it('should execute a mutation function by passing it the stack client instance', async () => {
    const mutation = jest.fn()
    await link.execute(mutation)
    expect(mutation).toHaveBeenCalledWith(client)
  })
})
