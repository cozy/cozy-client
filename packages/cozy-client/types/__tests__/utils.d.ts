export function queryResultFromData(data: any, opts?: {}): {
    data: any;
    meta: {
        count: any;
    };
    skip: number;
    next: boolean;
};
export function createTestAssets(): {
    client: CozyClient;
    store: any;
    link: CozyLink;
};
import CozyClient from "../CozyClient";
import CozyLink from "../links/CozyLink";
