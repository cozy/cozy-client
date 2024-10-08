export default useFetchJSON;
/**
 * Hook to use the generic fetchJSON method
 *
 * Takes the same arguments as fetchJSON
 *
 * Returns an object with the same keys { data, fetchStatus, error } as useQuery
 */
declare function useFetchJSON(method: any, path: any, body: any, options: any, dependencies: any): {
    fetchStatus: any;
    error: any;
    data: any;
};
