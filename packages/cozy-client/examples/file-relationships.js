const { QueryDefinition, default: CozyClient } = require('../dist')
global.fetch = require('node-fetch') // in the browser we have native fetch

const schema = {
  albums: {
    doctype: 'io.cozy.photos.albums',
    attributes: {
      name: {
        type: 'string',
        unique: true
      }
    },
    relationships: {
      photos: {
        type: 'has-many',
        doctype: 'io.cozy.files'
      }
    }
  }
}

const main = async _args => {
  const uri = process.env.COZY_URL || 'http://cozy.tools:8080'
  const token = process.env.COZY_TOKEN
  if (!token) {
    throw new Error('You should provide COZY_TOKEN as an environement variable')
  }
  const client = new CozyClient({ uri, token, schema })
  const query = new QueryDefinition({
    doctype: 'io.cozy.photos.albums',
    limit: 10
  }).include(['photos'])

  const resp = await client.query(query)
  const albums = client.hydrateDocuments('io.cozy.photos.albums', resp.data)
  console.log(albums[0].name)
  console.log(albums[0].photos.data)
}

main(process.argv).catch(e => console.error(e))
