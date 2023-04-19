export default useAppsInMaintenance;
/**
 * Returns all apps in maintenance
 *
 * @param {CozyClient} client CozyClient instance
 *
 * @returns {import("../types").AppsDoctype[]} An array with all apps in maintenance
 */
declare function useAppsInMaintenance(client: CozyClient): import("../types").AppsDoctype[];
import CozyClient from "../CozyClient";
