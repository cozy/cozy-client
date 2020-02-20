import { Schema } from 'prosemirror-model'
import { generateWebLink } from '../helpers'
import { marks, nodes } from './note_schema'
/**
 *
 * @param {string} notesAppUrl URL to the Notes App (https://notes.foo.mycozy.cloud)
 * @param {object} file io.cozy.files object
 */
export const generateUrlForNote = (notesAppUrl, file) => {
  return notesAppUrl + '#/n/' + file._id
}

/**
 * Fetch and build an URL to open a note.
 *
 * @param {object} client CozyClient instance
 * @param {object} file io.cozy.file object
 * @returns {string} url
 */
export const fetchUrlToOpenANote = async (client, file) => {
  const {
    data: { note_id, subdomain, protocol, instance, sharecode, public_name }
  } = await client
    .getStackClient()
    .collection('io.cozy.notes')
    .fetchURL({ _id: file.id })
  const searchParams = [['id', note_id]]
  if (sharecode) searchParams.push(['sharecode', sharecode])
  if (public_name) searchParams.push(['username', public_name])
  const pathname = sharecode ? '/public/' : ''
  const url = generateWebLink({
    cozyUrl: `${protocol}://${instance}`,
    searchParams,
    pathname,
    hash: `/n/${note_id}`,
    slug: 'notes',
    subDomainType: subdomain
  })
  return url
}

/**
 * @typedef {object} CozyClient
 *
 * Create a note and return the created object
 * @param {CozyClient} client
 * @param {string} dir_id
 */
export function createNoteDocument(client, dir_id) {
  return client.getStackClient().fetchJSON('POST', '/notes', {
    data: {
      type: 'io.cozy.notes.documents',
      attributes: {
        title: '',
        schema: schemaOrdered,
        dir_id
      }
    }
  })
}

export const generateUrlForNoteWithReturnUrl = (
  noteAppUrl,
  file,
  returnUrl
) => {
  const url = new URL(generateUrlForNote(noteAppUrl, file))
  url.searchParams.set('returnUrl', returnUrl)
  url.hash = `#/n/${file.id}`
  return url
}

function orderedToObject(ordered) {
  return ordered.reduce(function(acc, cur) {
    acc[cur[0]] = cur[1]
    return acc
  }, {})
}

export const schemaOrdered = {
  nodes,
  marks
}

export const schemaObject = {
  nodes: orderedToObject(nodes),
  marks: orderedToObject(marks)
}

export const schema = new Schema(schemaObject)
