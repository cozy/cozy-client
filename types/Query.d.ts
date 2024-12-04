export function fetchQuery(client: any, query: any): any;
declare class Query extends Component<any, any, any> {
    constructor(props: any, context: any);
    /**
     * Current client
     *
     * @type {CozyClient}
     */
    client: CozyClient;
    /**
     * Observable query to connect store to query
     *
     * @type {ObservableQuery}
     */
    observableQuery: ObservableQuery;
    /**
     * Callback to unsubscribe from observable query
     *
     * @type {Function}
     */
    queryUnsubscribe: Function;
    executeQueryRespectingFetchPolicy(): void;
    onQueryChange: () => void;
    recomputeChildrenArgs(): void;
    childrenArgs: any[];
}
declare namespace Query {
    namespace contextTypes {
        const client: PropTypes.Requireable<object>;
        const store: PropTypes.Requireable<object>;
    }
    namespace propTypes {
        const query: PropTypes.Validator<object>;
        const enabled: PropTypes.Requireable<boolean>;
        const as: PropTypes.Requireable<string>;
        const children: PropTypes.Validator<(...args: any[]) => any>;
        const fetchPolicy: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const enabled_1: boolean;
        export { enabled_1 as enabled };
    }
}
export default Query;
import { Component } from "react";
import CozyClient from "./CozyClient";
import ObservableQuery from "./ObservableQuery";
import PropTypes from "prop-types";
/**
 * Get attributes that will be assigned to the instance of a Query
 */
export function getQueryAttributes(client: any, props: any): {
    client: any;
    observableQuery: any;
    queryDefinition: any;
    createDocument: any;
    saveDocument: any;
    deleteDocument: any;
    getAssociation: any;
    fetchMore: any;
    fetch: any;
    mutations: any;
};
export function computeChildrenArgs(queryAttributes: any): any[];
