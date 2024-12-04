export function getSharingLink(client: CozyClient, filesIds: string[], { ttl, password }?: {
    ttl: string;
    password: string;
}): Promise<string>;
import CozyClient from "../CozyClient";
