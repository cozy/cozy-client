export default HasManyTriggers;
/**
 * Association used for konnectors to retrieve all their related triggers.
 *
 * @augments HasMany
 */
declare class HasManyTriggers extends HasMany {
    /**
     * In this association the query is special, we need to fetch all the triggers
     * having for the 'konnector' worker, and then filter them based on their
     * `message.konnector` attribute
     */
    static query(doc: any, client: any): import("../queries/dsl").QueryDefinition;
    constructor(target: any, name: string, doctype: string, options: {
        get: Function;
        query: Function;
        mutate: Function;
        save: Function;
        dispatch: Function;
    });
}
import HasMany from "./HasMany";
