export function getFileDatetime(file: import('../types').IOCozyFile): string;
/**
 *  This class is only used for photos albums relationships.
 *  Behind the hood, the queries uses a view returning the files sorted
 *  by datetime, with a cursor-based pagination.
 */
export default class HasManyFiles extends HasMany {
    constructor(target: any, name: string, doctype: string, options: {
        get: Function;
        query: Function;
        mutate: Function;
        save: Function;
        dispatch: Function;
    });
    addReferences(referencedDocs: any): {
        mutationType: string;
        referencedDocuments: any;
        document: any;
    };
    removeReferences(referencedDocs: any): {
        mutationType: string;
        referencedDocuments: any;
        document: any;
    };
}
import HasMany from "./HasMany";
