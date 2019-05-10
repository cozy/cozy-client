const sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

/**
 * Utility to call a function (task) periodically
 * and on demand immediately.
 *
 * Public API
 *
 * - start
 * - stop
 * - scheduleImmediateTask
 * - waitForCurrentTask
 */
class Loop {
  constructor(task, delay, _afterRound, _sleep) {
    this.task = task
    this.delay = delay

    this.round = this.round.bind(this)
    this.immediateTasks = []
    this.started = false

    // Only for tests
    this.afterRound = _afterRound
    this.sleep = _sleep || sleep
  }

  /**
   * Starts the loop. Will run the task periodically each `this.delay` ms.
   * Ignores multiple starts.
   */
  start() {
    if (this.started) {
      return
    }
    this.round()
    this.started = true
  }

  /**
   * Stops the loop, clears immediate tasks.
   * Cancels current task if possible
   */
  stop() {
    if (!this.started) {
      return
    }
    if (this.currentTask && this.currentTask.cancel) {
      this.currentTask.cancel()
    }
    clearTimeout(this.timeout)
    this.clearImmediateTasks()
    this.started = false
  }

  async waitForCurrent() {
    await this.currentTask
    return
  }

  /**
   * Flushes the immediate tasks list and calls each task.
   * Each task is awaited before the next is started.
   */
  async runImmediateTasks() {
    while (this.immediateTasks.length > 0) {
      const task = this.immediateTasks.splice(0, 1)[0]
      await this.runTask(task)
    }
  }

  /**
   * If loop started, schedules tasks that will be run in priority without
   * delay at next round.
   */
  async scheduleImmediateTask(task) {
    if (!this.started) {
      console.warn('Cannot schedule immediate task, loop is not started')
      return
    }

    this.immediateTasks.push(task || this.task)

    // No current task, we are waiting for the next
    // task. Let's not wait and go now !
    if (!this.currentTask) {
      clearTimeout(this.timeout)
      this.round()
    }
  }

  clearImmediateTasks() {
    this.immediateTasks.splice(0, this.runImmediateTasks.length)
  }

  /**
   * Calls and saves current task.
   * Stops loop in case of error of the task.
   */
  async runTask(task) {
    try {
      this.currentTask = task()
      await this.currentTask
    } catch (err) {
      this.stop()
      console.warn('ERROR', err)
      throw err
    } finally {
      this.currentTask = null
    }
  }

  /**
   * Runs immediate tasks and then schedule the next round.
   * Immediate tasks are called sequentially without delay
   * There is a delay between immediate tasks and normal periodic tasks.
   */
  async round() {
    if (this._rounding) {
      return
    }
    try {
      this._rounding = true
      if (this.immediateTasks.length > 0) {
        await this.runImmediateTasks()
        await this.sleep(this.delay)
      }
      await this.runTask(this.task)
      if (this.started) {
        this.timeout = setTimeout(this.round, this.delay)
      }
    } finally {
      this._rounding = false
      this.afterRound && this.afterRound()
    }
  }
}

export default Loop
