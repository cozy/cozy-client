export function getMutedErrors(account: import('../types').IOCozyAccount): any[];
export function muteError(account: import('../types').IOCozyAccount, errorType: string): import('../types').IOCozyAccount;
export function getContractSyncStatusFromAccount(account: import('../types').IOCozyAccount, contractId: string): boolean;
export function setContractSyncStatusInAccount(account: import('../types').IOCozyAccount, contractId: string, syncStatus: string): import('../types').IOCozyAccount;
export function getAccountLogin(account: import('../types').IOCozyAccount): string | null;
export function getAccountName(account: import('../types').IOCozyAccount): string | null;
export function buildAccount(konnector: import('../types').IOCozyKonnector, authData: object): import('../types').IOCozyAccount;
export function isAccountWithTrigger(client: import('../CozyClient').default, account: import('../types').IOCozyAccount): Promise<boolean>;
