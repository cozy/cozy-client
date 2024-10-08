export default class HasOne extends Association {
    /**
     * Add the relationship to the target document
     *
     * @param {import("../types").CozyClientDocument} doc - Document to add as a relationship
     * @returns {import("../types").CozyClientDocument} The saved target document
     */
    add(doc: import("../types").CozyClientDocument): import("../types").CozyClientDocument;
    /**
     * Remove the relationship from the target document
     *
     * @returns {import("../types").CozyClientDocument} The saved target document
     */
    remove(): import("../types").CozyClientDocument;
    setRelationship(doc: any): void;
    set(doc: any): void;
    unset(): void;
    dehydrate(doc: any): any;
}
import Association from './Association';
