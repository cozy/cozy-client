export const pouchReplication = (url, options) => {
  const replication = {
    on: (event, fn) => {
      if (event == 'complete') {
        setTimeout(fn, 1)
      }
      return replication
    },
    cancel: () => {}
  }
  return replication
}
