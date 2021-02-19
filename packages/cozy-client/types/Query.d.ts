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
        const client: any;
        const store: any;
    }
    namespace propTypes {
        const query: any;
        const as: any;
        const children: any;
        const fetchPolicy: any;
    }
}
export default Query;
import { Component } from "react";
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
