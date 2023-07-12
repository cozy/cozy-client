export const RETURN_URL_KEY: "returnUrl";
export function generatePrivateUrl(notesAppUrl: string, file: object, options?: {}): string;
export function generateUrlForNote(notesAppUrl: any, file: any): string;
export function fetchURL(client: object, file: object): Promise<string>;
export function generateReturnUrlToNotesIndex(client: object, file: object, returnUrl: string): Promise<string>;
