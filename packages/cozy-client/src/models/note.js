/**
 *
 * @param {string} notesAppUrl URL to the Notes App (https://notes.foo.mycozy.cloud)
 * @param {object} file io.cozy.files object
 */
export const generateUrlForNote = (notesAppUrl, file) => {
  return notesAppUrl + '#/n/' + file._id
}
