export namespace platformWeb {
    export { storage };
    export { events };
    export { PouchDB as pouchAdapter };
    export { isOnline };
}
declare namespace storage {
    export { getItem };
    export { setItem };
    export { removeItem };
    export { destroy };
}
declare namespace events {
    function addEventListener(eventName: any, handler: any): void;
    function removeEventListener(eventName: any, handler: any): void;
}
declare function isOnline(): Promise<boolean>;
declare function getItem(key: any): Promise<string>;
declare function setItem(key: any, value: any): Promise<void>;
declare function removeItem(key: any): Promise<void>;
declare function destroy(): Promise<void>;
export {};
