export function isCorrectDateFormat(date: string): boolean;
export function checkMeasureParams(measure: DACCMeasure): void;
export function sendMeasureToDACC(client: CozyClient, remoteDoctype: string, measure: DACCMeasure): Promise<void>;
export function buildAggregateParams(params: Params): DACCAggregatesParams;
export function fetchAggregatesFromDACC(client: CozyClient, remoteDoctype: string, params: DACCAggregatesParams): Promise<DACCAggregatesResponse>;
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
import { DACCMeasure } from "../types";
import CozyClient from "../CozyClient";
import { DACCAggregatesParams } from "../types";
import { DACCAggregatesResponse } from "../types";
