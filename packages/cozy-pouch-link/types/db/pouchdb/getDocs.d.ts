export function getDocsAndNormalize({ client, doctype, db, queryFunc, queryParams, withRows }: {
    client: any;
    doctype: any;
    db: any;
    queryFunc: any;
    queryParams?: {};
    withRows?: boolean;
}): Promise<{
    data: any;
    meta: {
        count: any;
    };
    skip: any;
    next: boolean;
} | {
    data: any;
}>;
export function getDocs(db: any, fct: any, queryParams?: {}): any;
