import PouchDB from 'pouchdb-browser'

const storage = {
  getItem: async key => {
    return window.localStorage.getItem(key)
  },
  setItem: async (key, value) => {
    return window.localStorage.setItem(key, value)
  },
  removeItem: async key => {
    return window.localStorage.removeItem(key)
  }
}

const isOnline = async () => {
  return window.navigator.onLine
}

export const platformWeb = {
  storage,
  pouchAdapter: PouchDB,
  isOnline
}
