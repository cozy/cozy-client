export default fetchPolicies;
declare namespace fetchPolicies {
    function olderThan(delay: number): Function;
    function noFetch(): boolean;
}
