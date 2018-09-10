export const pouchReplication = mockOptions => (url, options) => {
  const replication = {
    on: (event, fn) => {
      if (event == 'complete') {
        setTimeout(fn, 5)
      }
      if (event == 'change') {
        setTimeout(() => fn(mockOptions), 2)
      }
      return replication
    },
    cancel: () => {}
  }
  return replication
}
