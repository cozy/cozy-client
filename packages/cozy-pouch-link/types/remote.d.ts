export const DATABASE_NOT_FOUND_ERROR: "Database does not exist";
export const DATABASE_RESERVED_DOCTYPE_ERROR: "Reserved doctype";
export function isDatabaseNotFoundError(error: any): boolean;
export function isDatabaseUnradableError(error: any): boolean;
export function fetchRemoteInstance(url: URL, params?: object): Promise<object>;
export function fetchRemoteLastSequence(baseUrl: string): Promise<string>;
