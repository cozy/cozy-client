export default class HasOne extends Association {
    constructor(target: any, name: string, doctype: string, options: {
        get: Function;
        query: Function;
        mutate: Function;
        save: Function;
        dispatch: Function;
    });
    /**
     * Add the relationship to the target document
     *
     * @param {CozyClientDocument} doc - Document to add as a relationship
     * @returns {CozyClientDocument} The saved target document
     */
    add(doc: CozyClientDocument): CozyClientDocument;
    /**
     * Remove the relationship from the target document
     *
     * @returns {CozyClientDocument} The saved target document
     */
    remove(): CozyClientDocument;
    setRelationship(doc: any): void;
    set(doc: any): void;
    unset(): void;
    dehydrate(doc: any): any;
}
import Association from "./Association";
import { CozyClientDocument } from "../types";
