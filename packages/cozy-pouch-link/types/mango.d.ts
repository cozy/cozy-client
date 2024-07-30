export function makeKeyFromPartialFilter(condition: object): string;
export function getIndexNameFromFields(fields: Array<string>, partialFilter?: object): string;
export function getIndexFields({ selector, sort, partialFilter }: import('./types').MangoQueryOptions): string[];
