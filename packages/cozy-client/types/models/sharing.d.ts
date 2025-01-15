export function makeSharingLink(client: CozyClient, filesIds: string[], { ttl, password, verbs }?: {
    ttl: string;
    password: string;
    verbs: string[];
}): Promise<string>;
import CozyClient from "../CozyClient";
