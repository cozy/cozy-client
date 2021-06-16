export function saveTimeSeries(client: object, timeseriesOption: TimeSeries): Promise<any>;
export function fetchTimeSeriesByIntervalAndSource(client: object, { startDate, endDate, dataType, source, limit }: {
    startDate: Date;
    endDate: Date;
    dataType: string;
    source: string;
    limit: number;
}): Promise<TimeSeriesJSONAPI>;
export type TimeSeries = {
    /**
     * - The type of time series, e.g. 'electricity'
     */
    dataType: string;
    /**
     * - The starting date of the series
     */
    startDate: Date;
    /**
     * - The end date of the series
     */
    endDate: Date;
    /**
     * - The starting date of the series
     */
    endType: Date;
    /**
     * - The data source, e.g. 'enedis.fr'
     */
    source: string;
    /**
     * - The theme used to group time series, e.g. 'energy'
     */
    theme: string;
    /**
     * - An array of objects representing the time series
     */
    series: any[];
};
/**
 * Helper to retrieve time series by their date interval and source.
 */
export type TimeSeriesJSONAPI = {
    /**
     * - The JSON-API data response
     */
    data: Array<TimeSeries>;
};
