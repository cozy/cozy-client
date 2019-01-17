/**
 * Will periodically run a function so that when the promise
 * is resolved, the next function is called after `delay`ms.
 *
 * Returns a function which cancels the periodic calling.
 * When canceled, if there is an ongoing promise, it will
 * continue.
 *
 * @private
 */
const setIntervalPromise = (fn, delay, roundCallback) => {
  let timeout, canceled

  const round = async () => {
    const res = fn()

    if (res && res.then) {
      await res
    } else {
      throw new Error(
        'The function passed to setIntervalPromise should return a thenable'
      )
    }

    if (!canceled) {
      timeout = setTimeout(round, delay)
    }
    roundCallback && roundCallback()
  }

  round()

  return () => {
    canceled = true
    clearTimeout(timeout)
  }
}

export { setIntervalPromise as setInterval }
