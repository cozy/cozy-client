export default class HasOne extends Association {
    static query(doc: any, client: any, assoc: any): import("../queries/dsl").QueryDefinition;
    constructor(target: any, name: string, doctype: string, options: string);
    set(doc: any): void;
    unset(): void;
    dehydrate(doc: any): any;
}
import Association from "./Association";
