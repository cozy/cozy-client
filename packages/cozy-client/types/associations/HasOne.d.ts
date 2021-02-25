export default class HasOne extends Association {
    static query(doc: any, client: any, assoc: any): import("../queries/dsl").QueryDefinition;
    constructor(target: any, name: string, doctype: string, options: {
        get: Function;
        query: Function;
        mutate: Function;
        save: Function;
        dispatch: Function;
    });
    set(doc: any): void;
    unset(): void;
}
import Association from "./Association";
