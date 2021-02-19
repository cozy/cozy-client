export function setupClient({ queries }?: {
    queries: any;
}): import("../CozyClient").default;
export function makeWrapper(client: any): ({ children }: {
    children: any;
}) => JSX.Element;
