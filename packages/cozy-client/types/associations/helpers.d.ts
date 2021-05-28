export function pickTypeAndId(x: any): Pick<any, "_id" | "_type">;
export function responseToRelationship(response: any): import("lodash").Dictionary<any>;
export function attachRelationships(response: any, relationshipsByDocId: any): any;
export function resolveClass(doctype: any, type: any): any;
export function create(target: any, { name, type, doctype }: {
    name: any;
    type: any;
    doctype: any;
}, accessors: any): any;
