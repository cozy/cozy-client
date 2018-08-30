#!/usr/bin/env babel-node

import PouchManager from './PouchManager'
import { getReplicationURL } from './CozyPouchLink'
import AccessToken from './AccessToken'
import map from 'lodash/map'

const expiredToken = process.env.expiredToken
const newToken = process.env.newToken

const TOKEN = new AccessToken({
  accessToken: newToken
})

const DOCTYPE = 'io.cozy.bank.operations'
const URI = 'https://pbrowne.mycozy.cloud'

const manager = new PouchManager([DOCTYPE], {
  getReplicationURL: doctype => getReplicationURL(URI, TOKEN, doctype),
  onError: err => {
    if (err.error == 'code=400, message=Expired token') {
      console.log('You need to refresh the token')
    }
  },
  onSync: res => {
    console.log('last sync at', new Date())
  }
})

const displayDocs = async pouch => {
  const res = await pouch.allDocs({ include_docs: true })
  console.log(res.rows.slice(-1).map(row => row.doc.label))
}

const main = async () => {
  manager.startReplicationLoop(2 * 1000)
  setInterval(() => {
    map(manager.pouches, displayDocs)
  }, 2000)
}

main().catch(err => console.error(err))
