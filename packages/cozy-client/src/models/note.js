import { generateWebLink } from '../helpers'
/**
 *
 * @param {string} notesAppUrl URL to the Notes App (https://notes.foo.mycozy.cloud)
 * @param {object} file io.cozy.files object
 */
export const generatePrivateUrl = (notesAppUrl, file, options = {}) => {
  const { returnUrl } = options
  const url = new URL(notesAppUrl)
  if (returnUrl) {
    url.searchParams.set('returnUrl', returnUrl)
  }
  url.hash = `#/n/${file.id}`
  return url.toString()
}
export const generateUrlForNote = (notesAppUrl, file) => {
  console.warn(
    'generateUrlForNote is deprecated. Please use models.note.generatePrivateUrl instead'
  )
  return generatePrivateUrl(notesAppUrl, file)
}
/**
 * Fetch and build an URL to open a note.
 *
 * @param {object} client CozyClient instance
 * @param {object} file io.cozy.file object
 * @returns {string} url
 */
export const fetchURL = async (client, file) => {
  const {
    data: { note_id, subdomain, protocol, instance, sharecode, public_name }
  } = await client
    .getStackClient()
    .collection('io.cozy.notes')
    .fetchURL({ _id: file.id })
  if (sharecode) {
    const searchParams = [['id', note_id]]
    searchParams.push(['sharecode', sharecode])
    if (public_name) searchParams.push(['username', public_name])
    return generateWebLink({
      cozyUrl: `${protocol}://${instance}`,
      searchParams,
      pathname: '/public/',
      slug: 'notes',
      subDomainType: subdomain
    })
  } else {
    return generateWebLink({
      cozyUrl: `${protocol}://${instance}`,
      pathname: '',
      slug: 'notes',
      subDomainType: subdomain,
      hash: `/n/${note_id}`
    })
  }
}
