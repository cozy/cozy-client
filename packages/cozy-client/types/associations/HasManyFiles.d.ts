export function getFileDatetime(file: import('../types').IOCozyFile): string;
/**
 *  This class is only used for photos albums relationships.
 *  Behind the hood, the queries uses a view returning the files sorted
 *  by datetime, with a cursor-based pagination.
 */
export default class HasManyFiles extends HasMany {
    fetchMore(): Promise<void>;
    addById(idsArg: any): Promise<void>;
    removeById(idsArg: any): Promise<void>;
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
import HasMany from './HasMany';
