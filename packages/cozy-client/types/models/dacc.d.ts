export function checkMeasureParams(measure: DACCMeasure): void;
export function sendMeasureToDACC(client: object, remoteDoctype: string, measure: DACCMeasure): Promise<void>;
import { DACCMeasure } from "../types";
