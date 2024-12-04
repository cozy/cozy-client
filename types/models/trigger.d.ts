export namespace triggerStates {
    function getLastExecution(trigger: import("../types").IOCozyTrigger): string;
    function getLastSuccess(trigger: import("../types").IOCozyTrigger): string;
    function getLastsuccess(trigger: import("../types").IOCozyTrigger): string;
    function isErrored(trigger: import("../types").IOCozyTrigger): boolean;
    function getLastErrorType(trigger: import("../types").IOCozyTrigger): string;
}
export namespace triggers {
    function isKonnectorWorker(trigger: import("../types").IOCozyTrigger): boolean;
    function isKonnector(trigger: any): boolean;
    function getKonnector(trigger: import("../types").IOCozyTrigger): string | void;
    function getAccountId(trigger: import("../types").IOCozyTrigger): string;
    function isLatestErrorMuted(trigger: import("../types").IOCozyTrigger, account: import("../types").IOCozyAccount): boolean;
    function hasActionableError(trigger: import("../types").IOCozyTrigger): boolean;
    function buildTriggerAttributes({ account, cron, folder, konnector }: {
        konnector: import("../types").IOCozyKonnector;
        account: import("../types").IOCozyAccount;
        cron?: string;
        folder?: any;
    }): import("../types").IOCozyTrigger;
}
