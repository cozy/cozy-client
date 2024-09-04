export function normalizeDoc(doc: any, doctype: any, client: any): any;
export function fromPouchResult({ res, withRows, doctype, client }: {
    res: any;
    withRows: any;
    doctype: any;
    client: any;
}): {
    data: any;
    meta?: undefined;
    skip?: undefined;
    next?: undefined;
} | {
    data: any;
    meta: {
        count: any;
    };
    skip: any;
    next: boolean;
};
