export function dehydrate(document: any): {};
export function ensureFirstSlash(path: any): any;
export function generateWebLink({ cozyUrl, searchParams: searchParamsOption, pathname, hash, slug, subDomainType }: {
    cozyUrl: string;
    searchParams: any[];
    pathname: string;
    hash: string;
    slug: string;
    subDomainType: string;
}): string;
export function deconstructCozyWebLinkWithSlug(webLink: string, subDomainType?: SubdomainType): CozyLinkData;
export class InvalidProtocolError extends Error {
    constructor(url: any);
    url: any;
}
export class InvalidCozyUrlError extends Error {
    constructor(url: any);
    url: any;
}
export function rootCozyUrl(url: URL): Promise<URL>;
import { SubdomainType } from "./types";
import { CozyLinkData } from "./types";
