export function extractFiltersFromSelector(selector: any, indexedFields: any, { forceInMemory }?: {
    forceInMemory?: boolean;
}): {
    notForCursorFilters: {};
    cursorFilters: {};
};
export function getSortDirection(sort: any): "next" | "prev";
export function evaluateSelectorInMemory(store: any, data: any, selector: any, sort: any): Promise<any>;
export function executeIDBFind(store: any, { selector, indexedFields, sort, forceInMemory, limit, offset }: {
    selector: any;
    indexedFields: any;
    sort: any;
    forceInMemory?: boolean;
    limit?: number;
    offset?: number;
}): Promise<any>;
