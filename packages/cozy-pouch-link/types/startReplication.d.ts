export function startReplication(pouch: object, replicationOptions: {
    strategy: string;
    initialReplication: boolean;
    doctype: string;
    warmupQueries: import('cozy-client/types/types').Query[];
}, getReplicationURL: Function): import('./types').CancelablePromise;
export function replicateAllDocs(db: object, baseUrl: string, doctype: string): Promise<any[]>;
