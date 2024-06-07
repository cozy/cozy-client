export function getMutedErrors(account: import('cozy-client/types/types').IOCozyAccount): any[];
export function muteError(account: import('cozy-client/types/types').IOCozyAccount, errorType: string): import('cozy-client/types/types').IOCozyAccount;
export function getContractSyncStatusFromAccount(account: import('cozy-client/types/types').IOCozyAccount, contractId: string): boolean;
export function setContractSyncStatusInAccount(account: import('cozy-client/types/types').IOCozyAccount, contractId: string, syncStatus: string): import('cozy-client/types/types').IOCozyAccount;
export function getAccountLogin(account: import('cozy-client/types/types').IOCozyAccount): string | null;
export function getAccountName(account: import('cozy-client/types/types').IOCozyAccount): string | null;
export function buildAccount(konnector: import('cozy-client/types/types').IOCozyKonnector, authData: object): import('cozy-client/types/types').IOCozyAccount;
export function isAccountWithTrigger(client: import('cozy-client/types/CozyClient').default, account: import('cozy-client/types/types').IOCozyAccount): Promise<boolean>;
