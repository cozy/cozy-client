export function normalizeDocs(client: any, doctype: any, docs: any): void;
export function normalizeDoc(client: any, doctype: any, doc: any): any;
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
