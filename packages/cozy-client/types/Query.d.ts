export function fetchQuery(client: any, query: any): any;
declare class Query {
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
    componentDidMount(): void;
    executeQueryRespectingFetchPolicy(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    onQueryChange: () => void;
    recomputeChildrenArgs(): void;
    childrenArgs: any[];
    render(): any;
}
declare namespace Query {
    namespace contextTypes {
        let client: any;
        let store: any;
    }
    namespace propTypes {
        let query: any;
        let enabled: any;
        let as: any;
        let children: any;
        let fetchPolicy: any;
    }
    namespace defaultProps {
        let enabled_1: boolean;
        export { enabled_1 as enabled };
    }
}
export default Query;
import CozyClient from './CozyClient';
import ObservableQuery from './ObservableQuery';
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
