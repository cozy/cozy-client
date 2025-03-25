export const DATABASE_NAME_SEPARATOR: "__doctype__";
export function getDatabaseName(prefix: string, doctype: string): string;
export function getOldDatabaseName(prefix: string, doctype: string): string;
export function getDoctypeFromDatabaseName(dbName: any): any;
export function getPrefix(uri: string): string;
export function formatAggregatedError(aggregatedError: any): any;
export function allSettled(promises: Promise<any>[]): Promise<(FulfilledPromise | RejectedPromise)[]>;
export type FulfilledPromise = {
    /**
     * - The status of the promise
     */
    status: 'fulfilled';
    /**
     * - The Error rejected by the promise (undefined when fulfilled)
     */
    reason: undefined;
    /**
     * - The resolved value of the promise
     */
    value: any;
};
export type RejectedPromise = {
    /**
     * - The status of the promise
     */
    status: 'rejected';
    /**
     * - The Error rejected by the promise
     */
    reason: Error;
    /**
     * - The resolved value of the promise (undefined when rejected)
     */
    value: undefined;
};
