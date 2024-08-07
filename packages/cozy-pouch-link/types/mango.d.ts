export function getIndexNameFromFields(fields: any): string;
export function getIndexFields({ selector, sort }: {
    selector?: {
        _id: {
            $gt: any;
        };
    };
    sort?: {};
}): string[];
