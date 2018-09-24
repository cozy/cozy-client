const minimist = require('minimist')
const { QueryDefinition, default: CozyClient } = require('../dist')

const batchGetQuery = (client, assoc) => doc => {
  if (!doc[assoc.name]) {
    return null
  }
  const included = doc[assoc.name]
  const ids = included.indexOf(':')
    ? included.map(x => x.split(':')[1])
    : included

  return new QueryDefinition({ doctype: assoc.doctype, ids })
}

const TRANSACTION_DOCTYPE = 'io.cozy.bank.operations'
const BILLS_DOCTYPE = 'io.cozy.bills'

const schema = {
  transactions: {
    doctype: TRANSACTION_DOCTYPE,
    attributes: {},
    relationships: {
      bills: {
        type: 'has-many',
        doctype: BILLS_DOCTYPE,
        query: batchGetQuery
      }
    }
  }
}

global.fetch = require('node-fetch') // in the browser we have native fetch

const main = async _args => {
  const uri = process.env.COZY_URL || 'http://cozy.tools:8080'
  const token = process.env.COZY_TOKEN
  if (!token) {
    throw new Error('You should provide COZY_TOKEN as an environement variable')
  }
  const args = minimist(_args.slice(2), {
    string: ['selector']
  })
  const client = new CozyClient({ uri, token, schema })
  const query = new QueryDefinition({
    doctype: 'io.cozy.bank.operations',
    limit: 1,
    selector: {
      bills: {
        $exists: true
      }
    }
  }).include(['bills'])
  if (args.selector) {
    query.selector = args.selector ? JSON.parse(args.selector) : null
  }
  const resp = await client.query(query)
  const transactions = client.hydrateDocuments(TRANSACTION_DOCTYPE, resp.data)
  transactions.forEach(transaction => {
    const bill = transaction.bills.data[0]
    console.log(
      `${transaction.label} ${new Date(transaction.date).toLocaleDateString(
        'en-GB'
      )} -> ${bill.filename}`
    )
  })
}

main(process.argv).catch(e => console.error(e))
