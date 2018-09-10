import startsWith from 'lodash/startsWith'

export const withoutDesignDocuments = res => {
  const rows = res.rows.filter(doc => !startsWith(doc.id, '_design/'))

  return {
    ...res,
    rows,
    total_rows: rows.length
  }
}

export const isDesignDocument = doc => startsWith(doc._id, '_design')

export const isDeletedDocument = doc => doc._deleted
