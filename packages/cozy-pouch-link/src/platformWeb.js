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

export const platformWeb = {
  storage
}
