export function startReplication(pouch: object, replicationOptions: {
    strategy: string;
    initialReplication: boolean;
    doctype: string;
    warmupQueries: import('cozy-client/types/types').Query[];
}, getReplicationURL: Function, storage: import('./localStorage').PouchLocalStorage): import('./types').CancelablePromise;
export function replicateAllDocs(db: object, baseUrl: string, doctype: string, storage: import('./localStorage').PouchLocalStorage): Promise<any[]>;
