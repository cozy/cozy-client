export default useAppLinkWithStoreFallback;
declare function useAppLinkWithStoreFallback(slug: any, client: any, path?: string): {
    fetchStatus: string;
    isInstalled: boolean;
    url: any;
};
