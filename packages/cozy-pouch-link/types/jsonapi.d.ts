export function normalizeDoc(doc: any, doctype: any): any;
export function fromPouchResult(res: any, withRows: any, doctype: any): {
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
