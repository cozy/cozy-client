export function isCorrectDateFormat(date: any): boolean;
export function checkMeasureParams(measure: DACCMeasure): void;
export function sendMeasureToDACC(client: object, remoteDoctype: string, measure: DACCMeasure): Promise<void>;
export function buildAggregateParams(params: any): {
    measureName: string;
    startDate: any;
    endDate: any;
};
export function fetchAggregatesFromDACC(client: object, remoteDoctype: string, params: DACCAggregatesParams): Promise<void>;
import { DACCMeasure } from "../types";
import { DACCAggregatesParams } from "../types";
