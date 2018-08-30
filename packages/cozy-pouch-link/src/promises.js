/**
 * Will periodically run a function so that when the promise
 * is resolved, the next function is called after <delay>ms.
 *
 * Returns a function which cancels the periodic calling.
 * When canceled, if there is an ongoing promise, it will
 * continue.
 *
 */
const setIntervalPromise = (fn, delay) => {
  let timeout, canceled

  const round = async () => {
    await fn()
    if (!canceled) {
      timeout = setTimeout(round, delay)
    }
  }

  round()

  return () => {
    canceled = true
    clearTimeout(timeout)
  }
}

export { setIntervalPromise as setInterval }
