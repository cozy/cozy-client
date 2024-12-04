export function generatePrivateUrl(notesAppUrl: string, file: object, options?: {}): string;
export function generateUrlForNote(notesAppUrl: any, file: any): string;
export function fetchURL(client: object, file: object, options?: {
    pathname: string;
}): Promise<string>;
