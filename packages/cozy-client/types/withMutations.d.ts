export default withMutations;
/**
 * @function
 * @description HOC to provide mutations to components. Needs client in context or as prop.
 * @deprecated Prefer to use withClient and access directly the client.
 * @param  {Array<Function>} mutations One ore more mutations, which are function
 * taking CozyClient as parameter and returning an object containing one or
 * more mutations as attributes.
 * @returns {Function} - Component that will receive mutations as props
 */
declare function withMutations(...mutations: Array<Function>): Function;
