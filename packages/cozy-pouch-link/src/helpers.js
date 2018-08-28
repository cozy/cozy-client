import startsWith from 'lodash/startsWith'

export const withoutDesignDocuments = res => {
  const rows = res.rows.filter(doc => !startsWith(doc.id, '_design/'))

  return {
    ...res,
    rows,
    total_rows: rows.length
  }
}
