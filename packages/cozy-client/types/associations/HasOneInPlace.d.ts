/**
 * Here the id of the document is directly set in the attribute
 * of the document, not in the relationships attribute
 */
export default class HasOneInPlace extends Association {
    dehydrate(doc: any): any;
}
export const BelongsToInPlace: typeof HasOneInPlace;
import Association from './Association';
