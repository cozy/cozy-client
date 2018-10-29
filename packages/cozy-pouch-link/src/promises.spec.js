const { setInterval: setIntervalPromise } = require('./promises')

describe('set interval promises', () => {
  let fn, stop

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    if (stop) {
      stop()
    }
  })

  it('should wait for the end of a task to schedule another one', done => {
    let i = 0
    let time = 0
    const interval = 100
    const limit = 900
    const longTaskDuration = interval * 6

    const scheduleForward = duration => {
      time = time + duration
      Promise.resolve().then(() => jest.advanceTimersByTime(duration))
    }

    // Delay working in conjunction with fakeTimers
    // https://stackoverflow.com/questions/51126786/jest-fake-timers-with-promises
    const delay = duration => {
      scheduleForward(duration)
      return new Promise(resolve => setTimeout(resolve, duration))
    }

    const finish = () => {
      stop()

      // Since a task took longer than the other ones, `fn` was called
      // less than limit / interval
      expect(fn).toHaveBeenCalledTimes(4)
      done()
    }

    fn = jest.fn().mockImplementation(async () => {
      i++
      if (i === 2) {
        // One task takes longer than expected
        await delay(longTaskDuration)
      } else if (time >= limit) {
        finish()
      }
    })

    stop = setIntervalPromise(fn, interval, async () => {
      await scheduleForward(interval)
    })
  })
})
