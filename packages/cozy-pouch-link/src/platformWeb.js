import PouchDB from 'pouchdb-browser'

const events = {
  addEventListener: (eventName, handler) => {
    document.addEventListener(eventName, handler)
  },
  removeEventListener: (eventName, handler) => {
    document.removeEventListener(eventName, handler)
  }
}

const storage = {
  getItem: async key => {
    return window.localStorage.getItem(key)
  },
  setItem: async (key, value) => {
    return window.localStorage.setItem(key, value)
  },
  removeItem: async key => {
    return window.localStorage.removeItem(key)
  },
  destroy: async () => {
    return window.localStorage.clear()
  }
}

const isOnline = async () => {
  return window.navigator.onLine
}

export const platformWeb = {
  storage,
  events,
  pouchAdapter: PouchDB,
  isOnline
}
