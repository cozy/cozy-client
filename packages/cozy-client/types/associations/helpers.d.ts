export function pickTypeAndId(x: any): any;
export function responseToRelationship(response: any): any;
export function attachRelationships(response: any, relationshipsByDocId: any): any;
export function resolveClass(doctype: any, type: any): any;
export function create(target: any, { name, type, doctype }: {
    name: any;
    type: any;
    doctype: any;
}, accessors: any): any;
export function isReferencedBy(file: import("../types").IOCozyFile, referencedBy: import("../types").Doctype): boolean;
export function isReferencedById(file: import("../types").IOCozyFile, referencedBy: import("../types").Doctype, referencedId: string): boolean;
export function getReferencedBy(file: import("../types").IOCozyFile, referencedBy: import("../types").Doctype): import("../types").Reference[];
export function getReferencedById(file: import("../types").IOCozyFile, referencedBy: import("../types").Doctype, referencedId: string): import("../types").Reference[];
