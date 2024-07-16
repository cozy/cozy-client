export function migratePouch({ dbName, fromAdapter, toAdapter }: MigrationParams): Promise<object>;
/**
 * Migrate a PouchDB database to a new adapter.
 */
export type MigrationParams = {
    /**
     * - The database name
     */
    dbName?: string;
    /**
     * - The current adapter type, e.g. 'idb'
     */
    fromAdapter?: string;
    /**
     * - The new adapter type, e.g. 'indexeddb'
     */
    toAdapter?: string;
};
