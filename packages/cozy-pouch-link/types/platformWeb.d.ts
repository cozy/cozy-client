export namespace platformWeb {
    export { storage };
    export { events };
    export { PouchDB as pouchAdapter };
    export { isOnline };
}
declare namespace storage {
    function getItem(key: any): Promise<string>;
    function setItem(key: any, value: any): Promise<void>;
    function removeItem(key: any): Promise<void>;
}
declare namespace events {
    function addEventListener(eventName: any, handler: any): void;
    function removeEventListener(eventName: any, handler: any): void;
}
declare function isOnline(): Promise<boolean>;
export {};
