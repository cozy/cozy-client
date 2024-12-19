declare var _default: {};
export default _default;
export type MeasureColor = "error" | "primary" | "primary-light" | "primary-dark" | "secondary" | "secondary-light" | "secondary-dark" | "tertiary" | "tertiary-light" | "tertiary-dark";
export type MeasureOptions = {
    /**
     * - Mark name used as the start point for performance measurement
     */
    markName: string;
    /**
     * - Measure name that will be displayed in the performance graph. If not provided, markName will be used by default
     */
    measureName?: string;
    /**
     * - Category where the measure will be displayed int he performance graph
     */
    category?: string;
    /**
     * - Category where the measure will be displayed int he performance graph
     */
    color?: MeasureColor;
};
export type PerformanceAPI = {
    measure: (arg0: MeasureOptions) => void;
    mark: (arg0: string) => string;
};
