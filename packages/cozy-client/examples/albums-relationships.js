const minimist = require('minimist')
const { QueryDefinition, HasMany, default: CozyClient } = require('../dist')
global.fetch = require('node-fetch') // in the browser we have native fetch

class HasManyReferenced extends HasMany {

  get data() {
    const refs = this.target.relationships.referenced_by.data
    const albums = refs
      .map(ref => this.get(ref.type, ref.id))
      .filter(Boolean)
    return albums
  }

  static query(doc, client, assoc) {
    if (!doc['relationships'] || !doc['relationships']['referenced_by']) {
      return null
    }
    const included = doc['relationships']['referenced_by']['data']
    const ids = included.map(inc => inc.type === assoc.doctype ? inc.id : null)

    return new QueryDefinition({ doctype: assoc.doctype, ids })
  }
}

const schema = {
  albums: {
    doctype: 'io.cozy.photos.albums'
  },
  files: {
    doctype: 'io.cozy.files',
    relationships: {
      albums: {
        type: HasManyReferenced,
        doctype: 'io.cozy.photos.albums'
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
  const args = minimist(_args.slice(2), {
    string: ['selector']
  })
  const client = new CozyClient({ uri, token, schema })
  const query = new QueryDefinition({
    doctype: 'io.cozy.files',
    limit: 50,
    selector: {
      class: 'image',
      trashed: false
    }
  }).include(['albums'])

  const resp = await client.query(query)
  const files = client.hydrateDocuments('io.cozy.files', resp.data)
  files.forEach(file => {
    console.log(file.albums.data)
  })
}

main(process.argv).catch(e => console.error(e))
