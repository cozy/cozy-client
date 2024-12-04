export const clientContext: import("react").Context<{
    /** @type {CozyClient|null}  */
    client: CozyClient | null;
    store: any;
}>;
export default clientContext;
import CozyClient from "./CozyClient";
