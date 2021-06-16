export default class HasOne extends Association {
    constructor(target: any, name: string, doctype: string, options: {
        get: Function;
        query: Function;
        mutate: Function;
        save: Function;
        dispatch: Function;
    });
    set(doc: any): void;
    unset(): void;
    dehydrate(doc: any): any;
}
import Association from "./Association";
