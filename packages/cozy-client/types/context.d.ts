export const clientContext: import("react").Context<{
    /** @type {CozyClient}  */
    client: CozyClient;
    store: any;
}>;
export default clientContext;
import CozyClient from "./CozyClient";
