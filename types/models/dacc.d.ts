export function isCorrectDateFormat(date: string): boolean;
export function checkMeasureParams(measure: import("../types").DACCMeasure): void;
export function sendMeasureToDACC(client: CozyClient, remoteDoctype: string, measure: import("../types").DACCMeasure): Promise<void>;
export function buildAggregateParams(params: Params): import("../types").DACCAggregatesParams;
export function fetchAggregatesFromDACC(client: CozyClient, remoteDoctype: string, params: import("../types").DACCAggregatesParams): Promise<import("../types").DACCAggregatesResponse>;
/**
 * - The unformatted DACC aggregate params
 */
export type Params = {
    /**
     * - The measure name
     */
    measureName?: string;
    /**
     * - The measure start date
     */
    startDate?: string;
    /**
     * - The measure end date
     */
    endDate?: string;
};
import CozyClient from "../CozyClient";
