export function getFilePath(id: any): any;
export function resetAllPaths(): void;
export function normalizeDocs(client: CozyClient, doctype: string, docs: Array<import('./CozyPouchLink').CozyPouchDocument>): void;
export function normalizeDoc(client: CozyClient, doctype: string, doc: import('./CozyPouchLink').CozyPouchDocument): void;
export function computeFileFullpath(client: CozyClient, file: import('cozy-client/types/types').IOCozyFile): Promise<import('cozy-client/types/types').IOCozyFile>;
export function fromPouchResult({ res, withRows, doctype, client }: {
    res: any;
    withRows: any;
    doctype: any;
    client: any;
}): {
    data: any;
    meta: {
        count: any;
    };
    skip: any;
    next: boolean;
} | {
    data: any;
};
export function sanitized(doc: any): Pick<any, string | number | symbol>;
export function sanitizeJsonApi(doc: any): Pick<Pick<any, string | number | symbol>, string | number | symbol>;
import CozyClient from "cozy-client";
