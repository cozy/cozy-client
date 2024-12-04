import React, { useState, useCallback } from 'react'
import { useQuery, Q } from 'cozy-client'

const styles = {
  data: {
    maxHeight: 200,
    overflow: 'scroll',
    background: 'lightyellow',
    padding: '1rem'
  },

  stateTester: {
    background: 'lavender',
    padding: '1rem'
  },

  queries: {
    display: 'flex'
  },

  block: {
    border: '3px dotted',
    margin: '1rem',
    width: '50%',
    padding: '1rem'
  },

  amount: {
    positive: {
      color: 'teal'
    },
    negative: {
      color: 'crimson'
    }
  }
}

const accountsConn = {
  definition: () => Q('io.cozy.bank.accounts'),
  options: {
    as: 'accounts'
  }
}

const transactionsConn = {
  definition: () => Q('io.cozy.bank.operations').limitBy(10).sortBy([{'date': 'desc'}]).where({}),
  options: {
    as: 'transactions'
  }
}

const QueryResult = ({ collection }) => {

  return (
    <div style={styles.data}>
      id: { collection.id }<br/>
      bookmark: {collection.bookmark }<br/>
      length: {collection.data ? collection.data.length : 0}{' '}
    </div>
  )
}

const useCounter = initialCount => {
  const [count, setCount] = useState(initialCount)
  const increment = useCallback(() => setCount(count + 1), [setCount, count])
  const decrement = useCallback(() => setCount(count - 1), [setCount, count])
  return [count, increment, decrement]
}

const ColoredAmount = ({ amount }) => {
  return <span style={amount > 0 ? styles.amount.positive : styles.amount.negative}>{ amount }</span>
}

const TransactionRow = ({ transaction: tr }) => (
  <div>
    {tr.date.slice(0, 10)} - {tr.label} - <ColoredAmount amount={tr.amount} />
  </div>
)

const Queries = () => {
  const [count, increment, decrement] = useCounter(0)
  const accounts = useQuery(accountsConn.definition, accountsConn.options)
  const transactions = useQuery(transactionsConn.definition, transactionsConn.options)

  return (
    <div style={styles.queries}>
      <div style={styles.block}>
        <div style={styles.stateTester}>
          <i>Changing "Count" here should not trigger any network requests</i><br/>
          Count: {count}<br/>
          <button onClick={increment}>increment</button>
          <button onClick={decrement}>decrement</button>
        </div>

        <QueryResult collection={accounts} />
        <QueryResult collection={transactions} />
      </div>
      <div style={styles.block}>
        {transactions.data ? `${transactions.data.length} transactions shown` : null }
        {transactions.data &&
          transactions.data.map(tr => (
            <TransactionRow key={tr._id} transaction={tr} />
          ))}
        <button onClick={() => transactions.fetchMore()}>Load more</button>
      </div>
    </div>
  )
}

const Playground = () => {
  const [showing, setShowing] = useState(true)
  return (
    <div>
      <button onClick={() => setShowing(!showing)}>toggle</button>
      {showing ? <Queries /> : null}
    </div>
  )
}

export default Playground
