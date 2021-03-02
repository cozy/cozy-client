export function getMutedErrors(account: object): any[];
export function muteError(account: CozyAccount, errorType: string): CozyAccount;
export function getContractSyncStatusFromAccount(account: CozyAccount, contractId: any): any;
export function setContractSyncStatusInAccount(account: CozyAccount, contractId: any, syncStatus: any): any;
export type CozyAccount = any;
