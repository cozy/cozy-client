export function ensureFirstSlash(path: any): any;
export function generateWebLink({ cozyUrl, searchParams: searchParamsOption, pathname, hash, slug, subDomainType }: {
    cozyUrl: string;
    searchParams: any[];
    pathname: string;
    hash: string;
    slug: string;
    subDomainType: string;
}): string;
export function deconstructCozyWebLinkWithSlug(webLink: string, subDomainType?: import("../types").SubdomainType): import("../types").CozyLinkData;
export function deconstructRedirectLink(redirectLink: string): import("../types").RedirectLinkData;
export class InvalidRedirectLinkError extends Error {
    constructor(redirectLink: any);
    redirectLink: any;
}
export class InvalidProtocolError extends Error {
    constructor(url: any);
    url: any;
}
export class BlockedCozyError extends Error {
    constructor(url: any);
    url: any;
}
export class InvalidCozyUrlError extends Error {
    constructor(url: any);
    url: any;
}
export function rootCozyUrl(url: URL): Promise<URL>;
