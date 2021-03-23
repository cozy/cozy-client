import useClient from './useClient'

const useDocument = (doctype, id) => {
  const client = useClient()
  return client.getDocumentFromState(doctype, id)
}

export default useDocument
