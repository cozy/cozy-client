export const ENFORCE_LIST: string[];
export function shouldEnforcePersist(definition: any): boolean;
export function shouldDocumentBePersisted(document: CozyClientDocument, shouldEnforce?: boolean): boolean;
export function persistVirtualDocuments(client: CozyClient, definition: QueryDefinition, data: CozyClientDocument | Array<CozyClientDocument>): Promise<void>;
export type CozyClientDocument = {
    /**
     * - Id of the document
     */
    _id?: string;
    /**
     * - Id of the document
     */
    id?: string;
    /**
     * - Type of the document
     */
    _type?: string;
    /**
     * - Current revision of the document
     */
    _rev?: string;
    /**
     * - When the document has been deleted
     */
    _deleted?: boolean;
    /**
     * - Relationships of the document
     */
    relationships?: import("./types").ReferencedByRelationship;
    /**
     * - referenced by of another document
     */
    referenced_by?: import("./types").Reference[];
    /**
     * - Cozy Metadata
     */
    cozyMetadata?: import("./types").CozyMetadata;
    /**
     * - Pouch Metadata
     */
    meta?: import("./types").CozyClientDocumentMeta;
    /**
     * - When true the document should NOT be replicated to the remote database
     */
    cozyLocalOnly?: boolean;
    /**
     * - Id of a shared drive, only for shared io.cozy.files
     */
    driveId?: string;
};
import CozyClient from "./CozyClient";
import { QueryDefinition } from "./queries/dsl";
