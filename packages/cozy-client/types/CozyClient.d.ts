export default CozyClient;
export type ClientOptions = {
    client?: object;
    link?: object;
    links?: object;
    token?: Token;
    uri?: string;
    stackClient?: object;
    warningForCustomHandlers?: boolean;
    autoHydrate?: boolean;
    oauth?: object;
    onTokenRefresh?: Function;
    /**
     * - Schema description for each doctypes
     */
    schema?: object;
    /**
     * - Metadata about the application that will be used in ensureCozyMetadata
     */
    appMetadata?: AppMetadata;
};
/**
 * @typedef {object} ClientOptions
 * @property {object} [client]
 * @property {object} [link]
 * @property {object} [links]
 * @property {Token} [token]
 * @property {string} [uri]
 * @property {object} [stackClient]
 * @property {boolean} [warningForCustomHandlers]
 * @property {boolean} [autoHydrate]
 * @property {object} [oauth]
 * @property {Function} [onTokenRefresh]
 * @property {Function} [onTokenRefresh]
 * @property  {Link}         [link]   - Backward compatibility
 * @property  {Array<Link>}  [links]  - List of links
 * @property  {object}       [schema] - Schema description for each doctypes
 * @property  {AppMetadata}  [appMetadata] - Metadata about the application that will be used in ensureCozyMetadata
 */
/**
 * Responsible for
 *
 * - Creating observable queries
 * - Hydration
 * - Creating plan for saving documents
 * - Associations
 */
declare class CozyClient {
    /**
     * To help with the transition from cozy-client-js to cozy-client, it is possible to instantiate
     * a client with a cookie-based instance of cozy-client-js.
     *
     * @param {OldCozyClient} oldClient - An instance of the deprecated cozy-client
     * @returns {CozyClient}
     */
    static fromOldClient(oldClient: OldCozyClient, options: any): CozyClient;
    /**
     * To help with the transition from cozy-client-js to cozy-client, it is possible to instantiate
     * a client with an OAuth-based instance of cozy-client-js.
     *
     * Warning: unlike other instantiators, this one needs to be awaited.
     *
     * @param {OldCozyClient} oldClient - An instance of the deprecated cozy-client
     * @returns {Promise<CozyClient>} An instance of a client, configured from the old client
     */
    static fromOldOAuthClient(oldClient: OldCozyClient, options: any): Promise<CozyClient>;
    /**
     * In konnector/service context, CozyClient can be instantiated from
     * environment variables
     *
     * @param  {NodeEnvironment} [envArg]  - The environment
     * @param  {object} options - Options
     * @returns {CozyClient}
     */
    static fromEnv(envArg?: NodeEnvironment, options?: object): CozyClient;
    /**
     * When used from an app, CozyClient can be instantiated from the data injected by the stack in
     * the DOM.
     *
     * @param  {string}   selector - Options
     * @param  {object}   options  - CozyClient constructor options
     * @returns {object} - CozyClient instance
     */
    static fromDOM(selector?: string, options?: object): object;
    /**
     * Hooks are an observable system for events on documents.
     * There are at the moment only 2 hooks available.
     *
     * - before:destroy, called just before a document is destroyed via CozyClient::destroy
     * - after:destroy, called after a document is destroyed via CozyClient::destroy
     *
     * @example
     * ```
     * CozyClient.registerHook('io.cozy.bank.accounts', 'before:destroy', () => {
     *   console.log('A io.cozy.bank.accounts is being destroyed')
     * })
     * ```
     *
     * @param  {string}   doctype - Doctype on which the hook will be registered
     * @param  {string}   name    - Name of the hook
     * @param  {Function} fn      - Callback to be executed
     */
    static registerHook(doctype: string, name: string, fn: Function): void;
    /**
     * @param  {ClientOptions} rawOptions - Options
     *
     * @example
     * ```js
     * const client = new CozyClient({
     *   schema: {
     *     todos: {
     *       doctype: 'io.cozy.todos',
     *       relationships: {
     *         authors: {
     *           type: 'has-many',
     *           doctype: 'io.cozy.persons'
     *         }
     *       }
     *     }
     *   }
     * })
     * ```
     *
     * Cozy-Client will automatically call `this.login()` if provided with a token and an uri
     */
    constructor(rawOptions?: ClientOptions);
    appMetadata: any;
    options: {
        client?: object;
        token?: Token;
        uri?: string;
        stackClient?: object;
        warningForCustomHandlers?: boolean;
        autoHydrate?: boolean;
        oauth?: object;
        onTokenRefresh?: Function;
    };
    idCounter: number;
    isLogged: boolean;
    instanceOptions: {};
    /** Sets public attribute and emits event related to revocation */
    handleRevocationChange(state: any): void;
    /** Emits event when token is refreshed */
    handleTokenRefresh(token: any): void;
    links: any[];
    chain: any;
    schema: Schema;
    plugins: {};
    /**
     * @type {object}
     */
    storeAccesors: object;
    /**
     * Gets overrided by MicroEE.mixin
     * This is here just so typescript does not scream
     *
     * TODO Find a better way to make TS understand that emit is
     * a method from cozy-client
     */
    emit(...args: any[]): void;
    on(...args: any[]): void;
    removeListener(...args: any[]): void;
    /**
     * A plugin is a class whose constructor receives the client as first argument.
     * The main mean of interaction with the client should be with events
     * like "login"/"logout".
     *
     * The plugin system is meant to encourage separation of concerns, modularity
     * and testability : instead of registering events at module level, please
     * create a plugin that subscribes to events.
     *
     * Plugin instances are stored internally in the `plugins` attribute of the client
     * and can be accessed via this mean. A plugin class must have the attribute
     * `pluginName` that will be use as the key in the `plugins` object.
     *
     * Two plugins with the same `pluginName` cannot co-exist.
     *
     * @example
     * ```js
     * class AlertPlugin {
     *   constructor(client, options) {
     *     this.client = client
     *     this.options = options
     *     this.handleLogin = this.handleLogin.bind(this)
     *     this.handleLogout = this.handleLogout.bind(this)
     *     this.client.on("login", this.handleLogin)
     *     this.client.on("logout", this.handleLogout)
     *   }
     *
     *   handleLogin() {
     *     alert(this.options.onLoginAlert)
     *   }
     *
     *   handleLogout() {
     *     alert(this.options.onLogoutAlert)
     *   }
     * }
     *
     * AlertPlugin.pluginName = 'alerts'
     *
     * client.registerPlugin(AlertPlugin, {
     *   onLoginAlert: 'client has logged in !',
     *   onLogoutAlert: 'client has logged out !'
     * })
     *
     * // the instance of the plugin is accessible via
     * client.plugins.alerts
     * ```
     */
    registerPlugin(Plugin: any, options: any): any;
    addSchema(schemaDefinition: any): void;
    registerClientOnLinks(): void;
    /**
     * Notify the links that they can start and set isLogged to true.
     *
     * On mobile, where url/token are set after instantiation, use this method
     * to set the token and uri via options.
     *
     * Emits
     *
     * - "beforeLogin" at the beginning, before links have been set up
     * - "login" when the client is fully logged in and links have been set up
     *
     * @param  {object}   [options] - Options
     * @param  {string}   options.token  - If passed, the token is set on the client
     * @param  {string}   options.uri  - If passed, the uri is set on the client
     * @returns {Promise} - Resolves when all links have been setup and client is fully logged in
     *
     */
    login(options?: {
        token: string;
        uri: string;
    }): Promise<any>;
    loginPromise: Promise<void>;
    _login(options: any): Promise<void>;
    isRevoked: boolean;
    /**
     * Logs out the client and reset all the links
     *
     * Emits
     *
     * - "beforeLogout" at the beginning, before links have been reset
     * - "login" when the client is fully logged out and links have been reset
     *
     * @returns {Promise} - Resolves when all links have been reset and client is fully logged out
     */
    logout(): Promise<any>;
    /**
     * Forwards to a stack client instance and returns
     * a [DocumentCollection]{@link https://docs.cozy.io/en/cozy-client/api/cozy-stack-client/#DocumentCollection} instance.
     *
     * @param  {string} doctype The collection doctype.
     * @returns {DocumentCollection} Collection corresponding to the doctype
     */
    collection(doctype: string): DocumentCollection;
    fetch(method: any, path: any, body: any, options?: {}): any;
    all(doctype: any): QueryDefinition;
    find(doctype: any, selector?: any): QueryDefinition;
    get(doctype: any, id: any): QueryDefinition;
    /**
     * Creates a document and saves it on the server
     *
     * @param  {string} type - Doctype of the document
     * @param  {object} doc - Document to save
     * @param  {ReferenceMap} [references] - References are a special kind of relationship
     * that is not stored inside the referencer document, they are used for example between a photo
     * and its album. You should not need to use it normally.
     * @param  {object} options - Mutation options
     *
     * @example
     * ```js
     * await client.create('io.cozy.todos', {
     *   label: 'My todo',
     *   relationships: {
     *     authors: {
     *       data: [{_id: 1, _type: 'io.cozy.persons'}]
     *     }
     *   }
     * })
     * ```
     *
     * @returns {Promise}
     */
    create(type: string, doc: object, references?: ReferenceMap, options?: object): Promise<any>;
    validate(document: any): Promise<{}>;
    save(document: any, mutationOptions?: {}): Promise<any>;
    ensureCozyMetadata(document: any, options?: {
        event: string;
    }): any;
    /**
     * Creates a list of mutations to execute to create a document and its relationships.
     *
     * ```js
     * const baseDoc = { _type: 'io.cozy.todo', label: 'Go hiking' }
     * // relations can be arrays or single objects
     * const relationships = {
     *   attachments: [{ _id: 12345, _type: 'io.cozy.files' }, { _id: 6789, _type: 'io.cozy.files' }],
     *   bills: { _id: 9999, _type: 'io.cozy.bills' }
     * }
     * client.getDocumentSavePlan(baseDoc, relationships)
     * ```
     *
     *
     * @param  {object} document - Document to create
     * @param  {ReferenceMap} [referencesByName] - References to the created document. The
     * relationship class associated to each reference list should support references, otherwise this
     * method will throw.
     *
     * @returns {Mutation[]|Mutation}  One or more mutation to execute
     */
    getDocumentSavePlan(document: object, referencesByName?: ReferenceMap): Mutation[] | Mutation;
    triggerHook(name: any, document: any): void;
    /**
     * Destroys a document. {before,after}:destroy hooks will be fired.
     *
     * @param  {CozyClientDocument} document - Document to be deleted
     * @returns {Promise<CozyClientDocument>} The document that has been deleted
     */
    destroy(document: CozyClientDocument, mutationOptions?: {}): Promise<CozyClientDocument>;
    upload(file: any, dirPath: any, mutationOptions?: {}): Promise<any>;
    ensureQueryExists(queryId: any, queryDefinition: any): void;
    /**
     * Executes a query and returns its results.
     *
     * Results from the query will be saved internally and can be retrieved via
     * `getQueryFromState` or directly using `<Query />`. `<Query />` automatically
     * executes its query when mounted if no fetch policy has been indicated.
     *
     * @param  {QueryDefinition} queryDefinition - Definition that will be executed
     * @param  {object} [options] - Options
     * @param  {string} [options.as] - Names the query so it can be reused (by multiple components for example)
     * @param  {Function} [options.fetchPolicy] - Fetch policy to bypass fetching based on what's already inside the state. See "Fetch policies"
     * @param  {string} [options.update] - Does not seem to be used
     * @returns {Promise<QueryResult>}
     */
    query(queryDefinition: QueryDefinition, { update, ...options }?: {
        as?: string;
        fetchPolicy?: Function;
        update?: string;
    }): Promise<QueryResult>;
    /**
     * Will fetch all documents for a `queryDefinition`, automatically fetching more
     * documents if the total of documents is superior to the pagination limit. Can
     * result in a lot of network requests.
     *
     * @param  {QueryDefinition} queryDefinition - Definition to be executed
     * @param  {object} options - Options to the query
     * @returns {Promise<Array>} All documents matching the query
     */
    queryAll(queryDefinition: QueryDefinition, options: object): Promise<any[]>;
    watchQuery(...args: any[]): ObservableQuery;
    makeObservableQuery(queryDefinition: any, options?: {}): ObservableQuery;
    /**
     * Mutate a document
     *
     * @param  {object}    mutationDefinition - Describe the mutation
     * @param {object} [options] - Options
     * @param  {string}    [options.as] - Mutation id
     * @param  {Function}    [options.update] - Function to update the document
     * @param  {Function}    [options.updateQueries] - Function to update queries
     * @returns {Promise}
     */
    mutate(mutationDefinition: object, { update, updateQueries, ...options }?: {
        as?: string;
        update?: Function;
        updateQueries?: Function;
    }): Promise<any>;
    /**
     * Executes a query through links and fetches relationships
     *
     * @private
     * @param  {QueryDefinition} definition QueryDefinition to be executed
     * @returns {Promise<ClientResponse>}
     */
    private requestQuery;
    /**
     * Fetch relationships for a response (can be several docs).
     * Fills the `relationships` attribute of each documents.
     *
     * Can potentially result in several fetch requests.
     * Queries are optimized before being sent (multiple single documents queries can be packed into
     * one multiple document query) for example.
     *
     * @private
     */
    private fetchRelationships;
    requestMutation(definition: any): any;
    getIncludesRelationships(queryDefinition: any): any;
    /**
     * Returns documents with their relationships resolved according to their schema.
     * If related documents are not in the store, they will not be fetched automatically.
     * Instead, the relationships will have null documents.
     *
     * @param  {string} doctype - Doctype of the documents being hydrated
     * @param  {Array<CozyClientDocument>} documents - Documents to be hydrated
     * @returns {Array<HydratedDocument>}
     */
    hydrateDocuments(doctype: string, documents: Array<CozyClientDocument>): Array<HydratedDocument>;
    /**
     * Resolves relationships on a document.
     *
     * The original document is kept in the target attribute of
     * the relationship
     *
     * @param  {CozyClientDocument} document - for which relationships must be resolved
     * @param  {Schema} [schemaArg] - Optional
     * @returns {HydratedDocument}
     */
    hydrateDocument(document: CozyClientDocument, schemaArg?: Schema): HydratedDocument;
    hydrateRelationships(document: any, schemaRelationships: any): any;
    /**
     * Creates (locally) a new document for the given doctype.
     * This document is hydrated : its relationships are there
     * and working.
     */
    makeNewDocument(doctype: any): any;
    /**
     * Returns the accessors that are given to the relationships for them
     * to deal with the stores.
     *
     * Relationships need to have access to the store to ping it when
     * a modification (addById/removeById etc...) has been done. This wakes
     * the store up, which in turn will update the `<Query>`s and re-render the data.
     */
    getRelationshipStoreAccessors(): {
        get: any;
        save: (document: any, opts: any) => any;
        dispatch: any;
        query: (def: any, opts: any) => any;
        mutate: (def: any, opts: any) => any;
    };
    storeAccessors: {
        get: any;
        save: (document: any, opts: any) => any;
        dispatch: any;
        query: (def: any, opts: any) => any;
        mutate: (def: any, opts: any) => any;
    };
    /**
     * Get a collection of documents from the internal store.
     *
     * @param {string} type - Doctype of the collection
     *
     * @returns {CozyClientDocument[]} Array of documents or null if the collection does not exist.
     */
    getCollectionFromState(type: string): CozyClientDocument[];
    /**
     * Get a document from the internal store.
     *
     * @param {string} type - Doctype of the document
     * @param {string} id   - Id of the document
     *
     * @returns {CozyClientDocument} Document or null if the object does not exist.
     */
    getDocumentFromState(type: string, id: string): CozyClientDocument;
    /**
     * Get a query from the internal store.
     *
     * @param {string} id - Id of the query (set via Query.props.as)
     * @param {object} options - Options
     * @param {boolean} [options.hydrated] - Whether documents should be returned already hydrated (default: false)
     * @param  {object} [options.singleDocData] - If true, the "data" returned will be
     * a single doc instead of an array for single doc queries. Defaults to false for backward
     * compatibility but will be set to true in the future.
     *
     * @returns {QueryState} - Query state or null if it does not exist.
     */
    getQueryFromState(id: string, options?: {
        hydrated?: boolean;
        singleDocData?: object;
    }): QueryState;
    /**
     * Executes a query and returns the results from internal store.
     *
     * Can be useful in pure JS context (without React)
     * Has a behavior close to <Query /> or useQuery
     *
     * @param {object} query - Query with definition and options
     * @returns {Promise<QueryState>} Query state
     */
    fetchQueryAndGetFromState: (query: object) => Promise<QueryState>;
    /**
     * Performs a complete OAuth flow using a Cordova webview for auth.
     * The `register` method's name has been chosen for compat reasons with the Authentication compo.
     *
     * @param   {string} cozyURL Receives the URL of the cozy instance.
     * @returns {object}   Contains the fetched token and the client information.
     */
    register(cozyURL: string): object;
    /**
     * Performs a complete OAuth flow, including updating the internal token at the end.
     *
     * @param   {Function} openURLCallback Receives the URL to present to the user as a parameter, and should return a promise that resolves with the URL the user was redirected to after accepting the permissions.
     * @returns {Promise<object>} Contains the fetched token and the client information. These should be stored and used to restore the client.
     */
    startOAuthFlow(openURLCallback: Function): Promise<object>;
    authorize(openURLCallback: any): Promise<{
        token: any;
        infos: any;
        client: any;
    }>;
    /**
     * Renews the token if, for instance, new permissions are required or token
     * has expired.
     *
     * @returns {object}   Contains the fetched token and the client information.
     */
    renewAuthorization(): object;
    /**
     * Sets the internal store of the client. Use this when you want to have cozy-client's
     * internal store colocated with your existing Redux store.
     *
     * Typically, you would need to do this only once in your application, this is why
     * setStore throws if you do it twice. If you really need to set the store again,
     * use options.force = true.
     *
     * @example
     * ```
     * const client = new CozyClient()
     * const store = createStore(combineReducers({
     *   todos: todoReducer,
     *   cozy: client.reducer()
     * })
     * client.setStore(store)
     * ```
     *
     * @param {ReduxStore} store - A redux store
     * @param {object} [options] - Options
     * @param {boolean} [options.force] - Will deactivate throwing when client's store already exists
     */
    setStore(store: ReduxStore, { force }?: {
        force?: boolean;
    }): void;
    store: any;
    ensureStore(): void;
    /**
     * Returns whether the client has been revoked on the server
     */
    checkForRevocation(): Promise<any>;
    /**
     * If no stack client has been passed in options, creates a default stack
     * client and attaches handlers for revocation and token refresh.
     * If a stackClient has been passed in options, ensure it has handlers for
     * revocation and token refresh.
     *
     * If `oauth` options are passed, stackClient is an OAuthStackClient.
     */
    createClient(): void;
    stackClient: any;
    client: any;
    getClient(): any;
    getStackClient(): any;
    reducer(): (state: {
        documents: {};
        queries: {};
    }, action: any) => {
        documents: any;
        queries: any;
    };
    dispatch(action: any): any;
    /**
     * Generates a random id for queries
     *
     * @returns {string}
     */
    generateId(): string;
    /**
     * getInstanceOptions - Returns current instance options, such as domain or app slug
     *
     * @returns {object}
     */
    getInstanceOptions(): object;
    /**
     * loadInstanceOptionsFromDOM - Loads the dataset injected by the Stack in web pages and exposes it through getInstanceOptions
     *
     * @param {string} [selector=[role=application]] A selector for the node that holds the dataset to load
     *
     * @returns {void}
     */
    loadInstanceOptionsFromDOM(selector?: string): void;
    /**
     * Directly set the data in the store, without using a query
     * This is useful for cases like Pouch replication, which wants to
     * set some data in the store.
     *
     * @param {object} data - Data that is inserted in the store. Shape: { doctype: [data] }
     */
    setData(data: object): void;
    toJSON(): SnapshotClient;
}
declare namespace CozyClient {
    export const hooks: {};
    export { fetchPolicies };
    export const version: string;
}
import { Token } from "./types";
import { AppMetadata } from "./types";
import Schema from "./Schema";
import { DocumentCollection } from "./types";
import { QueryDefinition } from "./queries/dsl";
import { ReferenceMap } from "./types";
import { Mutation } from "./types";
import { CozyClientDocument } from "./types";
import { QueryResult } from "./types";
import ObservableQuery from "./ObservableQuery";
import { HydratedDocument } from "./types";
import { QueryState } from "./types";
import { ReduxStore } from "./types";
import { CozyClient as SnapshotClient } from "./testing/snapshots";
import { OldCozyClient } from "./types";
import { NodeEnvironment } from "./types";
import fetchPolicies from "./policies";
