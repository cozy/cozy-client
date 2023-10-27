export function ensureFilePath(couchDBDoc: import("../types").IOCozyFile, options?: {
    doctype: string;
    client: CozyClient;
}): Promise<import("../types").CozyClientDocument>;
import CozyClient from "../CozyClient";
