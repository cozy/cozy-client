export namespace triggerStates {
    function getLastExecution(triggerState: any): any;
    function getLastsuccess(triggerState: any): any;
    function getLastSuccess(triggerState: any): any;
    function isErrored(triggerState: any): boolean;
    function getLastErrorType(triggerState: any): any;
}
export namespace triggers {
    function isKonnectorWorker(trigger: any): boolean;
    function getKonnector(trigger: any): string | void;
    function getAccountId(trigger: any): string;
    function isLatestErrorMuted(trigger: any, account: any): boolean;
    function hasActionableError(trigger: any): boolean;
}
