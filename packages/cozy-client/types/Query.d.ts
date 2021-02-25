export function fetchQuery(client: any, query: any): any;
declare class Query extends Component<any, any, any> {
    constructor(props: any, context: any);
    queryUnsubscribe: any;
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
        const as: PropTypes.Requireable<string>;
        const children: PropTypes.Validator<(...args: any[]) => any>;
        const fetchPolicy: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
export default Query;
import { Component } from "react";
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
