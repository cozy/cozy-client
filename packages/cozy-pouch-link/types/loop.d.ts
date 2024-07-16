export default Loop;
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
declare class Loop {
    constructor(task: any, delay: any, _afterRound: any, _sleep: any);
    task: any;
    delay: any;
    /**
     * Runs immediate tasks and then schedule the next round.
     * Immediate tasks are called sequentially without delay
     * There is a delay between immediate tasks and normal periodic tasks.
     */
    round(): Promise<void>;
    immediateTasks: any[];
    started: boolean;
    afterRound: any;
    sleep: any;
    /**
     * Starts the loop. Will run the task periodically each `this.delay` ms.
     * Ignores multiple starts.
     */
    start(): void;
    /**
     * Stops the loop, clears immediate tasks.
     * Cancels current task if possible
     */
    stop(): void;
    waitForCurrent(): Promise<void>;
    /**
     * Flushes the immediate tasks list and calls each task.
     * Each task is awaited before the next is started.
     */
    runImmediateTasks(): Promise<void>;
    /**
     * Schedules a task to be run immediately at next round.
     * Ignored if loop is not started.
     * If not task is passed, the default task from the loop is used.
     *
     * @param  {Function} task - Optional custom function to be run immediately
     */
    scheduleImmediateTask(task?: Function): Promise<void>;
    clearImmediateTasks(): void;
    /**
     * Calls and saves current task.
     * Stops loop in case of error of the task.
     */
    runTask(task: any): Promise<void>;
    currentTask: any;
    _rounding: boolean;
    timeout: NodeJS.Timeout;
}
