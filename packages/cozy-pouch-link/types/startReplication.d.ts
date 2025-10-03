export function startReplication(pouch: object, replicationOptions: {
    strategy: string;
    initialReplication: boolean;
    driveId: string;
    doctype: string;
    warmupQueries: import('cozy-client/types/types').Query[];
}, getReplicationURL: Function, storage: import('./localStorage').PouchLocalStorage, client: CozyClient): import('./types').CancelablePromise;
export function replicateAllDocs({ db, baseUrl, doctype, storage }: {
    db: object;
    baseUrl: string;
    doctype: string;
    storage: import('./localStorage').PouchLocalStorage;
}): Promise<any[]>;
export function sharedDriveReplicateAllDocs({ driveId, pouch, storage, initialReplication, doctype, client }: {
    driveId: string;
    pouch: any;
    storage: any;
    doctype: string;
    initialReplication: boolean;
    client: CozyClient;
}): Promise<any[]>;
import CozyClient from "cozy-client";
