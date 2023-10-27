export function dispatchCreate(client: object, doctype: import("../types").Doctype, couchDBDoc: import("../types").CouchDBDocument, options?: DispatchOptions): Promise<void>;
export function dispatchUpdate(client: object, doctype: import("../types").Doctype, couchDBDoc: import("../types").CouchDBDocument, options?: DispatchOptions): Promise<void>;
export function dispatchDelete(client: object, doctype: import("../types").Doctype, couchDBDoc: import("../types").CouchDBDocument, options?: DispatchOptions): Promise<void>;
export type DispatchOptions = {
    /**
     * Optional function to enhance the document attributes before dispatch
     */
    enhanceDocFn?: Function;
};
