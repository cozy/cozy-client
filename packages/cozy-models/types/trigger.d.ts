export namespace triggerStates {
    function getLastExecution(trigger: import("cozy-client/types/types").IOCozyTrigger): string;
    function getLastSuccess(trigger: import("cozy-client/types/types").IOCozyTrigger): string;
    function getLastsuccess(trigger: import("cozy-client/types/types").IOCozyTrigger): string;
    function isErrored(trigger: import("cozy-client/types/types").IOCozyTrigger): boolean;
    function getLastErrorType(trigger: import("cozy-client/types/types").IOCozyTrigger): string;
}
export namespace triggers {
    function isKonnectorWorker(trigger: import("cozy-client/types/types").IOCozyTrigger): boolean;
    function isKonnector(trigger: any): boolean;
    function getKonnector(trigger: import("cozy-client/types/types").IOCozyTrigger): string | void;
    function getAccountId(trigger: import("cozy-client/types/types").IOCozyTrigger): string;
    function isLatestErrorMuted(trigger: import("cozy-client/types/types").IOCozyTrigger, account: import("cozy-client/types/types").IOCozyAccount): boolean;
    function hasActionableError(trigger: import("cozy-client/types/types").IOCozyTrigger): boolean;
    function buildTriggerAttributes({ account, cron, folder, konnector }: {
        konnector: import("cozy-client/types/types").IOCozyKonnector;
        account: import("cozy-client/types/types").IOCozyAccount;
        cron?: string;
        folder?: any;
    }): import("cozy-client/types/types").IOCozyTrigger;
}
