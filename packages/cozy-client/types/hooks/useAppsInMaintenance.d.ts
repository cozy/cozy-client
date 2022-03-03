export default useAppsInMaintenance;
/**
 * Returns all apps in maintenance
 *
 * @param {CozyClient} client CozyClient instance
 *
 * @returns {AppsDoctype[]} An array with all apps in maintenance
 */
declare function useAppsInMaintenance(client: CozyClient): AppsDoctype[];
import CozyClient from "../CozyClient";
import { AppsDoctype } from "../types";
