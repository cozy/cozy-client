import CozyClient, { Q, useQuery } from 'cozy-client'

const fetchPolicy = CozyClient.fetchPolicies.olderThan(30 * 1000)

const buildHomeMagicFolderQuery = () => {
  return {
    query: Q('io.cozy.files')
      .where({ path: '/Settings/Home' })
      .indexFields(['path']),
    as: 'io.cozy.files/path/Settings/Home',
    fetchPolicy: fetchPolicy
  }
}

const buildHomeShortcutsQuery = folderId => {
  return {
    query: Q('io.cozy.files')
      .where({ dir_id: folderId, class: 'shortcut' })
      .indexFields(['dir_id', 'class']),
    as: `io.cozy.files/dir_id/${folderId}/class/shortcut`,
    fetchPolicy: fetchPolicy
  }
}

const useFetchHomeShortcuts = () => {
  const homeMagicFolderQuery = buildHomeMagicFolderQuery()

  const magicHomeFolder = useQuery(
    homeMagicFolderQuery.query,
    homeMagicFolderQuery
  )

  const magicHomeFolderId = magicHomeFolder?.data?.[0]?._id

  const homeShortcutsQuery = buildHomeShortcutsQuery(magicHomeFolderId)

  const { data: shortcuts } = useQuery(homeShortcutsQuery.query, {
    ...homeShortcutsQuery,
    enabled: !!magicHomeFolderId
  })

  return shortcuts
}

export default useFetchHomeShortcuts
