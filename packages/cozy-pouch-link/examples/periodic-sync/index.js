#!/usr/bin/env babel-node

import React from 'react'
import ReactDOM from 'react-dom'
import map from 'lodash/map'
import fromPairs from 'lodash/fromPairs'

import PouchManager from '../../src/PouchManager'
import { getReplicationURL } from '../../src/CozyPouchLink'
import AccessToken from '../../src/AccessToken'

const expiredToken = process.env.expiredToken
const newToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGkiLCJpYXQiOjE1MzU3MDUyMzMsImlzcyI6InBicm93bmUubXljb3p5LmNsb3VkIiwic2NvcGUiOiJpby5jb3p5LmJhbmsub3BlcmF0aW9ucyJ9.FTBO5e_BB3ykdOI5OcosF2HhNq05H9LOIuZNEdFxic50L3-lkiQwxnL-G2KRpVt7t4GCLxviGSUfOs3n0gbBpw'

const TOKEN = new AccessToken({
  accessToken: newToken
})

const DOCTYPE = 'io.cozy.bank.operations'
const URI = 'https://pbrowne.mycozy.cloud'

class App extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}

    this.handleStart = this.handleStart.bind(this)
    this.handleStop = this.handleStop.bind(this)
  }

  componentDidMount() {
    this.manager = new PouchManager([DOCTYPE], {
      replicationDelay: 2 * 1000,
      getReplicationURL: doctype => getReplicationURL(URI, TOKEN, doctype),
      onError: err => {
        if (err.error == 'code=400, message=Expired token') {
          console.log('You need to refresh the token')
        }
        this.setStat({ error: err.error })
      },
      onSync: async res => {
        const docsByDoctype = {}
        await Promise.all(
          map(this.manager.pouches, async (pouch, doctype) => {
            const resp = await pouch.allDocs({ include_docs: true })
            const docs = resp.rows.map(row => row.doc)
            docsByDoctype[doctype] = docs
          })
        )
        this.setState({ lastSync: new Date(), docs: docsByDoctype })
        console.log('done sync')
      }
    })
    this.manager.startReplicationLoop()
  }

  componentWillUnmount() {
    this.manager.stopReplicationLoop()
  }

  handleStart() {
    console.log('stopping replication loop')
    this.manager.startReplicationLoop()
  }

  handleStop(){
    console.log('stopping replication loop')
    this.manager.stopReplicationLoop()
  }

  render() {
    return (
      <div>
        <h1>Periodic sync</h1>
        {this.state.error ? (
          <pre>{JSON.stringify(this.state.error)}</pre>
        ) : null}
        <button onClick={this.handleStart}>start</button>
        <button onClick={this.handleStop}>stop</button>
        {map(this.state.docs, (docs, doctype) => (
          <div>
            <p>
              Doctype: {doctype}<br/>
              Last synced: {this.state.lastSync.toString()}<br/>
              Documents:<br/>
            </p>
            <div>
              {docs.slice(0, 5).map(doc => <div key={doc._id}>{doc.label}</div>)}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const root = document.querySelector('#root')
console.log(root)
ReactDOM.render(<App />, root)
