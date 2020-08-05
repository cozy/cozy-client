## Classes

<dl>
<dt><a href="#Association">Association</a></dt>
<dd><p>Associations are used by components to access related store documents that are
linked in a document. They are also responsible for building the <code>QueryDefinition</code> that is
used by the client to automatically fetch relationship data.</p>
<p>Hydrated documents used by components come with Association instances.</p>
</dd>
<dt><a href="#HasMany">HasMany</a></dt>
<dd><p>Related documents are stored in the relationships attribute of the object,
following the JSON API spec.</p>
<p>Responsible for</p>
<ul>
<li>Creating relationships</li>
<li>Removing relationships</li>
</ul>
</dd>
<dt><a href="#HasManyInPlace">HasManyInPlace</a></dt>
<dd><p>Used when related documents are stored directly under the attribute with
only the ids.</p>
</dd>
<dt><a href="#HasManyTriggers">HasManyTriggers</a> ⇐ <code><a href="#HasMany">HasMany</a></code></dt>
<dd><p>Association used for konnectors to retrieve all their related triggers.</p>
</dd>
<dt><a href="#CozyClient">CozyClient</a></dt>
<dd><p>Responsible for</p>
<ul>
<li>Creating observable queries</li>
<li>Hydration</li>
<li>Creating plan for saving documents</li>
<li>Associations</li>
</ul>
</dd>
<dt><a href="#QueryDefinition">QueryDefinition</a></dt>
<dd><p>Chainable API to create query definitions to retrieve documents
from a Cozy. <code>QueryDefinition</code>s are sent to links.</p>
</dd>
<dt><a href="#Schema">Schema</a></dt>
<dd><p>Stores information on a particular doctype.</p>
<ul>
<li>Attribute validation</li>
<li>Relationship access</li>
</ul>
<pre><code class="language-javascript">const schema = new Schema({
  todos: {
    attributes: {
      label: {
        unique: true
      }
    },
    relationships: {
      author: &#39;has-one-in-place&#39;
    }
  }
}, cozyStackClient)
</code></pre>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#generateWebLink">generateWebLink</a> ⇒ <code>string</code></dt>
<dd><p>generateWebLink - Construct a link to a web app</p>
<p>This function does not get its cozy url from a CozyClient instance so it can
be used to build urls that point to other Cozies than the user&#39;s own Cozy.
This is useful when pointing to the Cozy of the owner of a shared note for
example.</p>
</dd>
<dt><a href="#getMutedErrors">getMutedErrors</a> ⇒ <code>Array</code></dt>
<dd><p>getMutedErrors - Returns the list of errors that have been muted for the given account</p>
</dd>
<dt><a href="#muteError">muteError</a> ⇒ <code>object</code></dt>
<dd><p>muteError - Adds an error to the list of muted errors for the given account</p>
</dd>
<dt><a href="#getStoreURL">getStoreURL</a> ⇒ <code>string</code></dt>
<dd><p>Returns the store URL of an app/konnector</p>
</dd>
<dt><a href="#getStoreInstallationURL">getStoreInstallationURL</a> ⇒ <code>string</code></dt>
<dd><p>Returns the store URL to install/update an app/konnector</p>
</dd>
<dt><a href="#isInstalled">isInstalled</a> ⇒ <code>object</code></dt>
<dd></dd>
<dt><a href="#getUrl">getUrl</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#getAppDisplayName">getAppDisplayName</a> ⇒ <code>string</code></dt>
<dd><p>getAppDisplayName - Combines the translated prefix and name of the app into a single string.</p>
</dd>
<dt><a href="#getInitials">getInitials</a> ⇒ <code>string</code></dt>
<dd><p>Returns the initials of the contact.</p>
</dd>
<dt><a href="#getPrimaryEmail">getPrimaryEmail</a> ⇒ <code>string</code></dt>
<dd><p>Returns the contact&#39;s main email</p>
</dd>
<dt><a href="#getPrimaryCozy">getPrimaryCozy</a> ⇒ <code>string</code></dt>
<dd><p>Returns the contact&#39;s main cozy</p>
</dd>
<dt><a href="#getPrimaryPhone">getPrimaryPhone</a> ⇒ <code>string</code></dt>
<dd><p>Returns the contact&#39;s main phone number</p>
</dd>
<dt><a href="#getPrimaryAddress">getPrimaryAddress</a> ⇒ <code>string</code></dt>
<dd><p>Returns the contact&#39;s main address</p>
</dd>
<dt><a href="#getFullname">getFullname</a> ⇒ <code>string</code></dt>
<dd><p>Returns the contact&#39;s fullname</p>
</dd>
<dt><a href="#getDisplayName">getDisplayName</a> ⇒ <code>string</code></dt>
<dd><p>Returns a display name for the contact</p>
</dd>
<dt><a href="#getIndexByFamilyNameGivenNameEmailCozyUrl">getIndexByFamilyNameGivenNameEmailCozyUrl</a> ⇒ <code>string</code></dt>
<dd><p>Returns &#39;byFamilyNameGivenNameEmailCozyUrl&#39; index of a contact</p>
</dd>
<dt><a href="#splitFilename">splitFilename</a> ⇒ <code>object</code></dt>
<dd><p>Returns base filename and extension</p>
</dd>
<dt><a href="#isFile">isFile</a></dt>
<dd></dd>
<dt><a href="#isDirectory">isDirectory</a></dt>
<dd></dd>
<dt><a href="#isNote">isNote</a></dt>
<dd></dd>
<dt><a href="#isShortcut">isShortcut</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#ensureMagicFolder">ensureMagicFolder</a> ⇒ <code>object</code></dt>
<dd><p>Returns a &quot;Magic Folder&quot;, given its id. See <a href="https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.apps/#special-iocozyapps-doctypes">https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.apps/#special-iocozyapps-doctypes</a></p>
</dd>
<dt><a href="#createFolderWithReference">createFolderWithReference</a> ⇒ <code>object</code></dt>
<dd><p>Create a folder with a reference to the given document</p>
</dd>
<dt><a href="#getReferencedFolder">getReferencedFolder</a> ⇒ <code>Array</code></dt>
<dd><p>Returns an array of folder referenced by the given document</p>
</dd>
<dt><a href="#shouldDisplayOffers">shouldDisplayOffers</a></dt>
<dd><p>Returns whether an instance is concerned by our offers</p>
</dd>
<dt><a href="#hasAnOffer">hasAnOffer</a></dt>
<dd><p>Returns if an instance has subscribed to one of our offers</p>
</dd>
<dt><a href="#buildPremiumLink">buildPremiumLink</a></dt>
<dd><p>Returns the link to the Premium page on the Cozy&#39;s Manager</p>
</dd>
<dt><a href="#generatePrivateUrl">generatePrivateUrl</a></dt>
<dd></dd>
<dt><a href="#fetchURL">fetchURL</a> ⇒ <code>string</code></dt>
<dd><p>Fetch and build an URL to open a note.</p>
</dd>
<dt><a href="#triggerStates">triggerStates</a></dt>
<dd><p>Trigger states come from /jobs/triggers</p>
</dd>
<dt><a href="#fetchPolicies">fetchPolicies</a></dt>
<dd><p>Use those fetch policies with <code>&lt;Query /&gt;</code> to limit the number of re-fetch.</p>
</dd>
<dt><a href="#Q">Q</a></dt>
<dd><p>Helper to create a QueryDefinition. Recommended way to create
query definitions.</p>
</dd>
<dt><a href="#isQueryLoading">isQueryLoading</a></dt>
<dd><p>Returns whether the result of a query (given via queryConnect or Query)
is loading.</p>
</dd>
<dt><a href="#hasQueryBeenLoaded">hasQueryBeenLoaded</a></dt>
<dd><p>Returns whether a query has been loaded at least once</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#createClientInteractive">createClientInteractive(clientOptions)</a></dt>
<dd><p>Creates a client with interactive authentication.</p>
<ul>
<li>Will start an OAuth flow and open an authentication page</li>
<li>Starts a local server to listen for the oauth callback</li>
<li>Resolves with the client after user authentication</li>
</ul>
</dd>
<dt><a href="#withClient">withClient(Component)</a> ⇒ <code>function</code></dt>
<dd><p>HOC to provide client from context as prop</p>
</dd>
<dt><a href="#queryConnect">queryConnect(querySpecs)</a> ⇒ <code>function</code></dt>
<dd><p>HOC creator to connect component to several queries in a declarative manner</p>
</dd>
<dt><a href="#queryConnectFlat">queryConnectFlat(querySpecs)</a> ⇒ <code>function</code></dt>
<dd><p>HOC creator to connect component to several queries in a declarative manner
The only difference with queryConnect is that it does not wrap the component in N component
if there are N queries, only 1 extra level of nesting is introduced.</p>
</dd>
<dt><a href="#getErrorComponent">getErrorComponent(error)</a> ⇒ <code>function</code> | <code>null</code></dt>
<dd><p>Returns the handler for an error</p>
</dd>
<dt><a href="#useFetchJSON">useFetchJSON()</a></dt>
<dd><p>Hook to use the generic fetchJSON method</p>
<p>Takes the same arguments as fetchJSON</p>
<p>Returns an object with the same keys { data, fetchStatus, error } as useQuery</p>
</dd>
<dt><a href="#useQuery">useQuery(queryDefinition, options)</a> ⇒ <code>object</code></dt>
<dd><p>Fetches a queryDefinition and returns the queryState</p>
</dd>
<dt><a href="#sanitizeCategories">sanitizeCategories()</a></dt>
<dd><p>Filters unauthorized categories. Defaults to [&#39;others&#39;] if no suitable category.</p>
</dd>
<dt><a href="#sanitize">sanitize(manifest)</a> ⇒ <code>Manifest</code></dt>
<dd><p>Normalize app manifest, retrocompatibility for old manifests</p>
</dd>
<dt><a href="#createMockClient">createMockClient(options)</a> ⇒ <code><a href="#CozyClient">CozyClient</a></code></dt>
<dd><p>Creates a client suitable for use in tests</p>
<ul>
<li>client.{query,save} are mocked</li>
<li>client.stackClient.fetchJSON is mocked</li>
</ul>
</dd>
<dt><a href="#normalize">normalize(file)</a> ⇒ <code>object</code></dt>
<dd><p>Normalizes an object representing a io.cozy.files object</p>
<p>Ensures existence of <code>_id</code> and <code>_type</code></p>
</dd>
<dt><a href="#ensureFilePath">ensureFilePath(file, parent)</a> ⇒ <code>object</code></dt>
<dd><p>Ensure the file has a <code>path</code> attribute, or build it</p>
</dd>
<dt><a href="#getParentFolderId">getParentFolderId(file)</a> ⇒ <code>string</code> | <code>null</code></dt>
<dd><p>Get the id of the parent folder (<code>null</code> for the root folder)</p>
</dd>
<dt><a href="#fetchOwn">fetchOwn(client)</a> ⇒ <code><a href="#PermissionItem">Array.&lt;PermissionItem&gt;</a></code></dt>
<dd><p>Fetches the list of permissions blocks</p>
</dd>
<dt><a href="#isForType">isForType(permission, type)</a></dt>
<dd><p>Checks if the permission item is about a specific doctype</p>
</dd>
<dt><a href="#currentResult">currentResult()</a> ⇒ <code>HydratedQueryState</code></dt>
<dd><p>Returns the query from the store with hydrated documents.</p>
</dd>
<dt><a href="#fetchMore">fetchMore()</a></dt>
<dd><p>Generates and executes a query that is offsetted by the number of documents
we have in the store.</p>
</dd>
<dt><a href="#getQueryAttributes">getQueryAttributes()</a></dt>
<dd><p>Get attributes that will be assigned to the instance of a Query</p>
</dd>
<dt><a href="#cancelable">cancelable(promise)</a> ⇒ <code>AugmentedPromise</code></dt>
<dd><p>Wraps a promise so that it can be canceled</p>
<p>Rejects with canceled: true as soon as cancel is called</p>
</dd>
<dt><del><a href="#withMutations">withMutations(...mutations)</a> ⇒ <code>function</code></del></dt>
<dd><p>HOC to provide mutations to components. Needs client in context or as prop.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#QueryState">QueryState</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Document">Document</a> : <code>object</code></dt>
<dd><p>Couchdb document like an io.cozy.files</p>
</dd>
<dt><a href="#PermissionVerb">PermissionVerb</a> : <code>&#x27;ALL&#x27;</code> | <code>&#x27;GET&#x27;</code> | <code>&#x27;PATCH&#x27;</code> | <code>&#x27;POST&#x27;</code> | <code>&#x27;PUT&#x27;</code> | <code>&#x27;DELETE&#x27;</code></dt>
<dd></dd>
<dt><a href="#PermissionItem">PermissionItem</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Registry">Registry</a> : <code>RegistryApp</code></dt>
<dd></dd>
</dl>

<a name="Association"></a>

## Association
Associations are used by components to access related store documents that are
linked in a document. They are also responsible for building the `QueryDefinition` that is
used by the client to automatically fetch relationship data.

Hydrated documents used by components come with Association instances.

**Kind**: global class  

* [Association](#Association)
    * [new Association(target, name, doctype, options)](#new_Association_new)
    * _instance_
        * [.target](#Association+target) : <code>object</code>
        * [.name](#Association+name) : <code>string</code>
        * [.doctype](#Association+doctype) : <code>string</code>
        * [.get](#Association+get) : <code>function</code>
        * [.save](#Association+save) : <code>function</code>
        * [.dispatch](#Association+dispatch) : <code>function</code>
        * [.raw](#Association+raw)
        * [.data](#Association+data)
        * [.query(queryDefinition)](#Association+query)
        * [.mutate()](#Association+mutate)
    * _static_
        * [.query()](#Association.query) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)

<a name="new_Association_new"></a>

### new Association(target, name, doctype, options)
Example: The schema defines an `author` relationship :

```js
const BOOK_SCHEMA = {
  relationships: {
     author: 'has-one'
  }
}
```

Hydrated `books` will have the `author` association instance under the `author` key.
Accessing `hydratedBook.author.data` gives you the author from the store, for example :

```json
{
  "name": "St-Exupery",
  "firstName": "Antoine",
  "_id": "antoine"
}
```

It is the responsibility of the relationship to decide how the relationship data is stored.
For example, here since we use the default `has-one` relationship, the relationship data
is stored in the `relationships` attribute of the original document (in our case here, our book
would be

```json
{
  "title": "Le petit prince",
  "relationships": {
    "author": {
      "data": {
        "doctype": "io.cozy.authors",
        "_id": "antoine"
      }
    }
  }
}
```

In the case of an "in-place" relationship, the relationship data is stored directly under the attribute named
by the relationship (in our case `author`). Our book would be

```json
{
    "title": "Le petit prince",
    "author": "antoine"
}
```

---

Each different type of Association may change:

- `get raw`: how the relationship data is stored (either as per the JSON API spec or
 in a custom way)
- `get data`: how the store documents are then fetched from the store to be added to
the hydrated document (.data method). View components will access
`hydratedDoc[relationshipName].data`.
- `get query`: how to build the query to fetch related documents


| Param | Type | Description |
| --- | --- | --- |
| target | <code>object</code> | Original object containing raw data |
| name | <code>string</code> | Attribute under which the association is stored |
| doctype | <code>string</code> | Doctype of the documents managed by the association |
| options | <code>string</code> |  |
| options.dispatch | <code>function</code> | Store's dispatch, comes from the client |

<a name="Association+target"></a>

### association.target : <code>object</code>
The original document declaring the relationship

**Kind**: instance property of [<code>Association</code>](#Association)  
<a name="Association+name"></a>

### association.name : <code>string</code>
The name of the relationship.

**Kind**: instance property of [<code>Association</code>](#Association)  
**Example**  
```js
'author'
```
<a name="Association+doctype"></a>

### association.doctype : <code>string</code>
Doctype of the relationship

**Kind**: instance property of [<code>Association</code>](#Association)  
**Example**  
```js
'io.cozy.authors'
```
<a name="Association+get"></a>

### association.get : <code>function</code>
Returns the document from the store

**Kind**: instance property of [<code>Association</code>](#Association)  
<a name="Association+save"></a>

### association.save : <code>function</code>
Saves the relationship in store.

**Kind**: instance property of [<code>Association</code>](#Association)  
<a name="Association+dispatch"></a>

### association.dispatch : <code>function</code>
Dispatch an action on the store.

**Kind**: instance property of [<code>Association</code>](#Association)  
<a name="Association+raw"></a>

### association.raw
Returns the raw relationship data as stored in the original document

For a document with relationships stored as JSON API spec:

```js
const book = {
  title: 'Moby Dick',
  relationships: {
    author: {
      data: {
        doctype: 'io.cozy.authors',
        id: 'herman'
      }
    }
  }
 }
```

Raw value will be

```json
{
  "doctype": "io.cozy.authors",
  "id": "herman"
}
```

Derived `Association`s need to implement this method.

**Kind**: instance property of [<code>Association</code>](#Association)  
<a name="Association+data"></a>

### association.data
Returns the document(s) from the store

For document with relationships stored as JSON API spec :

```js
const book = {
  title: 'Moby Dick',
  relationships: {
    author: {
      data: {
        doctype: 'io.cozy.authors',
        id: 'herman'
      }
    }
  }
 }
```

`data` will be

```json
{
  "_id": "herman"
  "_type": "io.cozy.authors",
  "firstName": "herman",
  "name": "Melville"
}
```

Derived `Association`s need to implement this method.

**Kind**: instance property of [<code>Association</code>](#Association)  
<a name="Association+query"></a>

### association.query(queryDefinition)
Performs a query to retrieve relationship documents.

**Kind**: instance method of [<code>Association</code>](#Association)  

| Param | Type |
| --- | --- |
| queryDefinition | [<code>QueryDefinition</code>](#QueryDefinition) | 

<a name="Association+mutate"></a>

### association.mutate()
Performs a mutation on the relationship.

**Kind**: instance method of [<code>Association</code>](#Association)  
<a name="Association.query"></a>

### Association.query() ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Derived `Association`s need to implement this method.

**Kind**: static method of [<code>Association</code>](#Association)  
<a name="HasMany"></a>

## HasMany
Related documents are stored in the relationships attribute of the object,
following the JSON API spec.

Responsible for

- Creating relationships
- Removing relationships

**Kind**: global class  

* [HasMany](#HasMany)
    * [new HasMany()](#new_HasMany_new)
    * [.count](#HasMany+count) ⇒ <code>number</code>
    * [.addById()](#HasMany+addById)

<a name="new_HasMany_new"></a>

### new HasMany()
```
const schema = {
  todos: {
     doctype: 'io.cozy.todos',
     relationships: {
       tasks: {
         doctype: 'io.cozy.tasks',
         type: 'has-many'
       }
     }
   }
}

const todo = {
  label: "Protect people's privacy",
  relationships: {
    tasks: {
      data: [
        {_id: 1, _type: 'io.cozy.tasks'},
        {_id: 2, _type: 'io.cozy.tasks'}
      ]
    }
  }
}
```

<a name="HasMany+count"></a>

### hasMany.count ⇒ <code>number</code>
Returns the total number of documents in the relationship.
Does not handle documents absent from the store. If you want
to do that, you can use .data.length.

**Kind**: instance property of [<code>HasMany</code>](#HasMany)  
**Returns**: <code>number</code> - - Total number of documents in the relationships  
<a name="HasMany+addById"></a>

### hasMany.addById()
Add a referenced document by id. You need to call save()
in order to synchronize your document with the store.

**Kind**: instance method of [<code>HasMany</code>](#HasMany)  
**Todo**

- [ ] We shouldn't create the array of relationship manually since
it'll not be present in the store as well.
We certainly should use something like `updateRelationship`

<a name="HasManyInPlace"></a>

## HasManyInPlace
Used when related documents are stored directly under the attribute with
only the ids.

**Kind**: global class  
<a name="new_HasManyInPlace_new"></a>

### new HasManyInPlace()
An example document representing a TODO. See as the related
tasks are represented via ids.

```js
const todo = {
  label: "Protect people's privacy",
  tasks: [1, 2]
}
```

Here is the `Schema` that would represent this kind of document.
Components receiving todos via `Query`s would have an instance of `HasManyInPlace`
as their `tasks` attribute.

```js
const schema = {
  todos: {
     doctype: 'io.cozy.todos',
     relationships: {
       tasks: {
         doctype: 'io.cozy.tasks',
         type: 'has-many-in-place'
       }
     }
   }
}

const todo = {
  label: "Get rich",
  tasks: [1, 2]
}
```

<a name="HasManyTriggers"></a>

## HasManyTriggers ⇐ [<code>HasMany</code>](#HasMany)
Association used for konnectors to retrieve all their related triggers.

**Kind**: global class  
**Extends**: [<code>HasMany</code>](#HasMany)  

* [HasManyTriggers](#HasManyTriggers) ⇐ [<code>HasMany</code>](#HasMany)
    * _instance_
        * [.count](#HasMany+count) ⇒ <code>number</code>
        * [.addById()](#HasMany+addById)
    * _static_
        * [.query()](#HasManyTriggers.query)

<a name="HasMany+count"></a>

### hasManyTriggers.count ⇒ <code>number</code>
Returns the total number of documents in the relationship.
Does not handle documents absent from the store. If you want
to do that, you can use .data.length.

**Kind**: instance property of [<code>HasManyTriggers</code>](#HasManyTriggers)  
**Returns**: <code>number</code> - - Total number of documents in the relationships  
<a name="HasMany+addById"></a>

### hasManyTriggers.addById()
Add a referenced document by id. You need to call save()
in order to synchronize your document with the store.

**Kind**: instance method of [<code>HasManyTriggers</code>](#HasManyTriggers)  
**Todo**

- [ ] We shouldn't create the array of relationship manually since
it'll not be present in the store as well.
We certainly should use something like `updateRelationship`

<a name="HasManyTriggers.query"></a>

### HasManyTriggers.query()
In this association the query is special, we need to fetch all the triggers
having for the 'konnector' worker, and then filter them based on their
`message.konnector` attribute

**Kind**: static method of [<code>HasManyTriggers</code>](#HasManyTriggers)  
<a name="CozyClient"></a>

## CozyClient
Responsible for

- Creating observable queries
- Hydration
- Creating plan for saving documents
- Associations

**Kind**: global class  

* [CozyClient](#CozyClient)
    * [new CozyClient(options)](#new_CozyClient_new)
    * _instance_
        * [.registerPlugin()](#CozyClient+registerPlugin)
        * [.login(options)](#CozyClient+login) ⇒ <code>Promise</code>
        * [.logout()](#CozyClient+logout) ⇒ <code>Promise</code>
        * [.collection(doctype)](#CozyClient+collection) ⇒ <code>DocumentCollection</code>
        * [.getDocumentSavePlan(document, relationships)](#CozyClient+getDocumentSavePlan) ⇒ <code>Array.&lt;Mutation&gt;</code>
        * [.destroy(document)](#CozyClient+destroy) ⇒ [<code>Document</code>](#Document)
        * [.query(queryDefinition, options)](#CozyClient+query) ⇒ <code>QueryResult</code>
        * [.queryAll(queryDefinition, options)](#CozyClient+queryAll) ⇒ <code>Array</code>
        * [.hydrateDocuments(doctype, documents)](#CozyClient+hydrateDocuments) ⇒ <code>Array.&lt;HydratedDocument&gt;</code>
        * [.hydrateDocument(document, schema)](#CozyClient+hydrateDocument) ⇒ <code>HydratedDocument</code>
        * [.makeNewDocument()](#CozyClient+makeNewDocument)
        * [.getAssociation()](#CozyClient+getAssociation)
        * [.getRelationshipStoreAccessors()](#CozyClient+getRelationshipStoreAccessors)
        * [.getCollectionFromState(type)](#CozyClient+getCollectionFromState) ⇒ [<code>Array.&lt;Document&gt;</code>](#Document)
        * [.getDocumentFromState(type, id)](#CozyClient+getDocumentFromState) ⇒ [<code>Document</code>](#Document)
        * [.getQueryFromState(id, options)](#CozyClient+getQueryFromState) ⇒ [<code>QueryState</code>](#QueryState)
        * [.register(cozyURL)](#CozyClient+register) ⇒ <code>object</code>
        * [.startOAuthFlow(openURLCallback)](#CozyClient+startOAuthFlow) ⇒ <code>object</code>
        * [.renewAuthorization()](#CozyClient+renewAuthorization) ⇒ <code>object</code>
        * [.setStore(store, options)](#CozyClient+setStore)
        * [.checkForRevocation()](#CozyClient+checkForRevocation)
        * [.handleRevocationChange()](#CozyClient+handleRevocationChange)
        * [.handleTokenRefresh()](#CozyClient+handleTokenRefresh)
        * [.createClient()](#CozyClient+createClient)
        * [.getInstanceOptions()](#CozyClient+getInstanceOptions) ⇒ <code>object</code>
        * [.loadInstanceOptionsFromDOM([selector])](#CozyClient+loadInstanceOptionsFromDOM) ⇒ <code>void</code>
        * [.setData(data)](#CozyClient+setData)
    * _static_
        * [.fromOldClient()](#CozyClient.fromOldClient)
        * [.fromOldOAuthClient()](#CozyClient.fromOldOAuthClient) ⇒ [<code>CozyClient</code>](#CozyClient)
        * [.fromEnv()](#CozyClient.fromEnv)
        * [.registerHook(doctype, name, fn)](#CozyClient.registerHook)

<a name="new_CozyClient_new"></a>

### new CozyClient(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options |
| options.link | <code>Link</code> | Backward compatibility |
| options.links | <code>Array.Link</code> | List of links |
| options.schema | <code>object</code> | Schema description for each doctypes |
| options.appMetadata | <code>object</code> | Metadata about the application that will be used in ensureCozyMetadata Cozy-Client will automatically call `this.login()` if provided with a token and an uri |

<a name="CozyClient+registerPlugin"></a>

### cozyClient.registerPlugin()
A plugin is a class whose constructor receives the client as first argument.
The main mean of interaction with the client should be with events
like "login"/"logout".

The plugin system is meant to encourage separation of concerns, modularity
and testability : instead of registering events at module level, please
create a plugin that subscribes to events.

Plugin instances are stored internally in the `plugins` attribute of the client
and can be accessed via this mean. A plugin class must have the attribute
`pluginName` that will be use as the key in the `plugins` object.

Two plugins with the same `pluginName` cannot co-exist.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
**Example**  
```
class AlertPlugin {
  constructor(client, options) {
    this.client = client
    this.options = options
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.client.on("login", this.handleLogin)
    this.client.on("logout", this.handleLogout)
  }

  handleLogin() {
    alert(this.options.onLoginAlert)
  }

  handleLogout() {
    alert(this.options.onLogoutAlert)
  }
}

AlertPlugin.pluginName = 'alerts'

client.registerPlugin(AlertPlugin, {
  onLoginAlert: 'client has logged in !',
  onLogoutAlert: 'client has logged out !'
})

// the instance of the plugin is accessible via
client.plugins.alerts
```
<a name="CozyClient+login"></a>

### cozyClient.login(options) ⇒ <code>Promise</code>
Notify the links that they can start and set isLogged to true.

On mobile, where url/token are set after instantiation, use this method
to set the token and uri via options.

Emits

- "beforeLogin" at the beginning, before links have been set up
- "login" when the client is fully logged in and links have been set up

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
**Returns**: <code>Promise</code> - - Resolves when all links have been setup and client is fully logged in  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options |
| options.token | <code>string</code> | If passed, the token is set on the client |
| options.uri | <code>string</code> | If passed, the uri is set on the client |

<a name="CozyClient+logout"></a>

### cozyClient.logout() ⇒ <code>Promise</code>
Logs out the client and reset all the links

Emits

- "beforeLogout" at the beginning, before links have been reset
- "login" when the client is fully logged out and links have been reset

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
**Returns**: <code>Promise</code> - - Resolves when all links have been reset and client is fully logged out  
<a name="CozyClient+collection"></a>

### cozyClient.collection(doctype) ⇒ <code>DocumentCollection</code>
Forwards to a stack client instance and returns
a [DocumentCollection](https://docs.cozy.io/en/cozy-client/api/cozy-stack-client/#DocumentCollection) instance.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
**Returns**: <code>DocumentCollection</code> - Collection corresponding to the doctype  

| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | The collection doctype. |

<a name="CozyClient+getDocumentSavePlan"></a>

### cozyClient.getDocumentSavePlan(document, relationships) ⇒ <code>Array.&lt;Mutation&gt;</code>
Creates a list of mutations to execute to create a document and its relationships.

```js
const baseDoc = { _type: 'io.cozy.todo', label: 'Go hiking' }
// relations can be arrays or single objects
const relationships = {
  attachments: [{ _id: 12345, _type: 'io.cozy.files' }, { _id: 6789, _type: 'io.cozy.files' }],
  bills: { _id: 9999, _type: 'io.cozy.bills' }
}
client.getDocumentSavePlan(baseDoc, relationships)
```

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
**Returns**: <code>Array.&lt;Mutation&gt;</code> - One or more mutation to execute  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | The base document to create |
| relationships | <code>object</code> | The list of relationships to add, as a dictionnary. Keys should be relationship names and values the documents to link. |

<a name="CozyClient+destroy"></a>

### cozyClient.destroy(document) ⇒ [<code>Document</code>](#Document)
Destroys a document. {before,after}:destroy hooks will be fired.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
**Returns**: [<code>Document</code>](#Document) - The document that has been deleted  

| Param | Type | Description |
| --- | --- | --- |
| document | [<code>Document</code>](#Document) | Document to be deleted |

<a name="CozyClient+query"></a>

### cozyClient.query(queryDefinition, options) ⇒ <code>QueryResult</code>
Executes a query and returns its results.

Results from the query will be saved internally and can be retrieved via
`getQueryFromState` or directly using `<Query />`. `<Query />` automatically
executes its query when mounted if no fetch policy has been indicated.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  

| Param | Type | Description |
| --- | --- | --- |
| queryDefinition | [<code>QueryDefinition</code>](#QueryDefinition) | Definition that will be executed |
| options | <code>string</code> | Options |
| options.as | <code>string</code> | Names the query so it can be reused (by multiple components for example) |
| options.fetchPolicy | <code>string</code> | Fetch policy to bypass fetching based on what's already inside the state. See "Fetch policies" |

<a name="CozyClient+queryAll"></a>

### cozyClient.queryAll(queryDefinition, options) ⇒ <code>Array</code>
Will fetch all documents for a `queryDefinition`, automatically fetching more
documents if the total of documents is superior to the pagination limit. Can
result in a lot of network requests.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
**Returns**: <code>Array</code> - All documents matching the query  

| Param | Type | Description |
| --- | --- | --- |
| queryDefinition | [<code>QueryDefinition</code>](#QueryDefinition) | Definition to be executed |
| options | <code>object</code> | Options to the query |

<a name="CozyClient+hydrateDocuments"></a>

### cozyClient.hydrateDocuments(doctype, documents) ⇒ <code>Array.&lt;HydratedDocument&gt;</code>
Returns documents with their relationships resolved according to their schema.
If related documents are not in the store, they will not be fetched automatically.
Instead, the relationships will have null documents.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  

| Param | Type |
| --- | --- |
| doctype | <code>string</code> | 
| documents | [<code>Array.&lt;Document&gt;</code>](#Document) | 

<a name="CozyClient+hydrateDocument"></a>

### cozyClient.hydrateDocument(document, schema) ⇒ <code>HydratedDocument</code>
Resolves relationships on a document.

The original document is kept in the target attribute of
the relationship

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  

| Param | Type | Description |
| --- | --- | --- |
| document | [<code>Document</code>](#Document) | for which relationships must be resolved |
| schema | [<code>Schema</code>](#Schema) | for the document doctype |

<a name="CozyClient+makeNewDocument"></a>

### cozyClient.makeNewDocument()
Creates (locally) a new document for the given doctype.
This document is hydrated : its relationships are there
and working.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
<a name="CozyClient+getAssociation"></a>

### cozyClient.getAssociation()
Creates an association that is linked to the store.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
<a name="CozyClient+getRelationshipStoreAccessors"></a>

### cozyClient.getRelationshipStoreAccessors()
Returns the accessors that are given to the relationships for them
to deal with the stores.

Relationships need to have access to the store to ping it when
a modification (addById/removeById etc...) has been done. This wakes
the store up, which in turn will update the `<Query>`s and re-render the data.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
<a name="CozyClient+getCollectionFromState"></a>

### cozyClient.getCollectionFromState(type) ⇒ [<code>Array.&lt;Document&gt;</code>](#Document)
Get a collection of documents from the internal store.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
**Returns**: [<code>Array.&lt;Document&gt;</code>](#Document) - Array of documents or null if the collection does not exist.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | Doctype of the collection |

<a name="CozyClient+getDocumentFromState"></a>

### cozyClient.getDocumentFromState(type, id) ⇒ [<code>Document</code>](#Document)
Get a document from the internal store.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
**Returns**: [<code>Document</code>](#Document) - Document or null if the object does not exist.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | Doctype of the document |
| id | <code>string</code> | Id of the document |

<a name="CozyClient+getQueryFromState"></a>

### cozyClient.getQueryFromState(id, options) ⇒ [<code>QueryState</code>](#QueryState)
Get a query from the internal store.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
**Returns**: [<code>QueryState</code>](#QueryState) - - Query state or null if it does not exist.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the query (set via Query.props.as) |
| options | <code>object</code> | Options |
| options.hydrated | <code>boolean</code> | Whether documents should be returned already hydrated (default: false) |

<a name="CozyClient+register"></a>

### cozyClient.register(cozyURL) ⇒ <code>object</code>
Performs a complete OAuth flow using a Cordova webview for auth.
The `register` method's name has been chosen for compat reasons with the Authentication compo.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
**Returns**: <code>object</code> - Contains the fetched token and the client information.  

| Param | Type | Description |
| --- | --- | --- |
| cozyURL | <code>string</code> | Receives the URL of the cozy instance. |

<a name="CozyClient+startOAuthFlow"></a>

### cozyClient.startOAuthFlow(openURLCallback) ⇒ <code>object</code>
Performs a complete OAuth flow, including updating the internal token at the end.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
**Returns**: <code>object</code> - Contains the fetched token and the client information. These should be stored and used to restore the client.  

| Param | Type | Description |
| --- | --- | --- |
| openURLCallback | <code>function</code> | Receives the URL to present to the user as a parameter, and should return a promise that resolves with the URL the user was redirected to after accepting the permissions. |

<a name="CozyClient+renewAuthorization"></a>

### cozyClient.renewAuthorization() ⇒ <code>object</code>
Renews the token if, for instance, new permissions are required or token
has expired.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
**Returns**: <code>object</code> - Contains the fetched token and the client information.  
<a name="CozyClient+setStore"></a>

### cozyClient.setStore(store, options)
Sets the internal store of the client. Use this when you want to have cozy-client's
internal store colocated with your existing Redux store.

Typically, you would need to do this only once in your application, this is why
setStore throws if you do it twice. If you really need to set the store again,
use options.force = true.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  

| Param | Type | Description |
| --- | --- | --- |
| store | <code>ReduxStore</code> | A redux store |
| options | <code>object</code> | Options |
| options.force | <code>boolean</code> | Will deactivate throwing when client's store already exists |

**Example**  
```
const client = new CozyClient()
const store = createStore(combineReducers({
  todos: todoReducer,
  cozy: client.reducer()
})
client.setStore(store)
```
<a name="CozyClient+checkForRevocation"></a>

### cozyClient.checkForRevocation()
Returns whether the client has been revoked on the server

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
<a name="CozyClient+handleRevocationChange"></a>

### cozyClient.handleRevocationChange()
Sets public attribute and emits event related to revocation

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
<a name="CozyClient+handleTokenRefresh"></a>

### cozyClient.handleTokenRefresh()
Emits event when token is refreshed

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
<a name="CozyClient+createClient"></a>

### cozyClient.createClient()
If no stack client has been passed in options, creates a default stack
client and attaches handlers for revocation and token refresh.
If a stackClient has been passed in options, ensure it has handlers for
revocation and token refresh.

If `oauth` options are passed, stackClient is an OAuthStackClient.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
<a name="CozyClient+getInstanceOptions"></a>

### cozyClient.getInstanceOptions() ⇒ <code>object</code>
getInstanceOptions - Returns current instance options, such as domain or app slug

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
<a name="CozyClient+loadInstanceOptionsFromDOM"></a>

### cozyClient.loadInstanceOptionsFromDOM([selector]) ⇒ <code>void</code>
loadInstanceOptionsFromDOM - Loads the dataset injected by the Stack in web pages and exposes it through getInstanceOptions

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [selector] | <code>string</code> | <code>&quot;[role&#x3D;application]&quot;</code> | A selector for the node that holds the dataset to load |

<a name="CozyClient+setData"></a>

### cozyClient.setData(data)
Directly set the data in the store, without using a query
This is useful for cases like Pouch replication, which wants to
set some data in the store.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | { doctype: [data] } |

<a name="CozyClient.fromOldClient"></a>

### CozyClient.fromOldClient()
To help with the transition from cozy-client-js to cozy-client, it is possible to instantiate
a client with a cookie-based instance of cozy-client-js.

**Kind**: static method of [<code>CozyClient</code>](#CozyClient)  
<a name="CozyClient.fromOldOAuthClient"></a>

### CozyClient.fromOldOAuthClient() ⇒ [<code>CozyClient</code>](#CozyClient)
To help with the transition from cozy-client-js to cozy-client, it is possible to instantiate
a client with an OAuth-based instance of cozy-client-js.

Warning: unlike other instantiators, this one needs to be awaited.

**Kind**: static method of [<code>CozyClient</code>](#CozyClient)  
**Returns**: [<code>CozyClient</code>](#CozyClient) - An instance of a client, configured from the old client  
<a name="CozyClient.fromEnv"></a>

### CozyClient.fromEnv()
In konnector/service context, CozyClient can be instantiated from environment variables

**Kind**: static method of [<code>CozyClient</code>](#CozyClient)  
<a name="CozyClient.registerHook"></a>

### CozyClient.registerHook(doctype, name, fn)
Hooks are an observable system for events on documents.
There are at the moment only 2 hooks available.

- before:destroy, called just before a document is destroyed via CozyClient::destroy
- after:destroy, called after a document is destroyed via CozyClient::destroy

**Kind**: static method of [<code>CozyClient</code>](#CozyClient)  

| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | Doctype on which the hook will be registered |
| name | <code>string</code> | Name of the hook |
| fn | <code>function</code> | Callback to be executed |

**Example**  
```
CozyClient.registerHook('io.cozy.bank.accounts', 'before:destroy', () => {
  console.log('A io.cozy.bank.accounts is being destroyed')
})
```
<a name="QueryDefinition"></a>

## QueryDefinition
Chainable API to create query definitions to retrieve documents
from a Cozy. `QueryDefinition`s are sent to links.

**Kind**: global class  

* [QueryDefinition](#QueryDefinition)
    * [new QueryDefinition(options)](#new_QueryDefinition_new)
    * [.getById(id)](#QueryDefinition+getById) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.getByIds(ids)](#QueryDefinition+getByIds) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.where(selector)](#QueryDefinition+where) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.select(fields)](#QueryDefinition+select) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.indexFields(indexedFields)](#QueryDefinition+indexFields) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.sortBy(sort)](#QueryDefinition+sortBy) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.include(includes)](#QueryDefinition+include) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.limitBy(limit)](#QueryDefinition+limitBy) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.offset(skip)](#QueryDefinition+offset) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.offsetCursor(cursor)](#QueryDefinition+offsetCursor) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.offsetBookmark(bookmark)](#QueryDefinition+offsetBookmark) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.referencedBy(document)](#QueryDefinition+referencedBy) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)

<a name="new_QueryDefinition_new"></a>

### new QueryDefinition(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Initial options for the query definition |
| options.doctype | <code>string</code> | The doctype of the doc. |
| options.id | <code>string</code> | The id of the doc. |
| options.ids | <code>Array</code> | The ids of the docs. |
| options.selector | <code>object</code> | The selector to query the docs. |
| options.fields | <code>Array</code> | The fields to return. |
| options.indexedFields | <code>Array</code> | The fields to index. |
| options.sort | <code>Array</code> | The sorting params. |
| options.includes | <code>string</code> | The docs to include. |
| options.referenced | <code>string</code> | The referenced document. |
| options.limit | <code>number</code> | The document's limit to return. |
| options.skip | <code>number</code> | The number of docs to skip. |
| options.cursor | <code>number</code> | The cursor to paginate views. |
| options.bookmark | <code>number</code> | The bookmark to paginate mango queries. |

<a name="QueryDefinition+getById"></a>

### queryDefinition.getById(id) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Query a single document on its id.

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The document id. |

<a name="QueryDefinition+getByIds"></a>

### queryDefinition.getByIds(ids) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Query several documents on their ids.

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| ids | <code>Array</code> | The documents ids. |

<a name="QueryDefinition+where"></a>

### queryDefinition.where(selector) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Query documents with a [mango selector](http://docs.couchdb.org/en/latest/api/database/find.html#find-selectors).
Each field passed in the selector will be indexed, except if the indexField option is used.

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>object</code> | The Mango selector. |

<a name="QueryDefinition+select"></a>

### queryDefinition.select(fields) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Specify which fields of each object should be returned. If it is omitted, the entire object is returned.

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| fields | <code>Array</code> | The fields to return. |

<a name="QueryDefinition+indexFields"></a>

### queryDefinition.indexFields(indexedFields) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Specify which fields should be indexed. This prevent the automatic indexing of the mango fields.

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| indexedFields | <code>Array</code> | The fields to index. |

<a name="QueryDefinition+sortBy"></a>

### queryDefinition.sortBy(sort) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Specify how to sort documents, following the [sort syntax](http://docs.couchdb.org/en/latest/api/database/find.html#find-sort)

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| sort | <code>Array</code> | The list of field name and direction pairs. |

<a name="QueryDefinition+include"></a>

### queryDefinition.include(includes) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Includes documents having a relationships with the ones queried.
For example, query albums including the photos.

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| includes | <code>Array</code> | The documents to include. |

<a name="QueryDefinition+limitBy"></a>

### queryDefinition.limitBy(limit) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Maximum number of documents returned, useful for pagination. Default is 100.

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| limit | <code>number</code> | The document's limit. |

<a name="QueryDefinition+offset"></a>

### queryDefinition.offset(skip) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Skip the first ‘n’ documents, where ‘n’ is the value specified.

Beware, this [performs badly](http://docs.couchdb.org/en/stable/ddocs/views/pagination.html#paging-alternate-method) on view's index.
 Prefer cursor-based pagination in such situation.

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| skip | <code>number</code> | The number of documents to skip. |

<a name="QueryDefinition+offsetCursor"></a>

### queryDefinition.offsetCursor(cursor) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Use [cursor-based](https://docs.cozy.io/en/cozy-stack/jsonapi/#pagination) pagination.
*Warning*: this is only useful for views.
The cursor is a [startkey, startkey_docid] array, where startkey is the view's key,
e.g. ["io.cozy.photos.albums", "album-id"] and startkey_docid is the id of
the starting document of the query, e.g. "file-id".
Use the last docid of each query as startkey_docid to paginate or leave blank for the first query.

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| cursor | <code>Array</code> | The cursor for pagination. |

<a name="QueryDefinition+offsetBookmark"></a>

### queryDefinition.offsetBookmark(bookmark) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Use [bookmark](https://docs.couchdb.org/en/2.2.0/api/database/find.html#pagination) pagination.
Note this only applies for mango-queries (not views) and is way more efficient than skip pagination.
The bookmark is a string returned by the _find response and can be seen as a pointer in
the index for the next query.

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| bookmark | <code>string</code> | The bookmark to continue a previous paginated query. |

<a name="QueryDefinition+referencedBy"></a>

### queryDefinition.referencedBy(document) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Use the [file reference system](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/)

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | The reference document |

<a name="Schema"></a>

## Schema
Stores information on a particular doctype.

- Attribute validation
- Relationship access

```js
const schema = new Schema({
  todos: {
    attributes: {
      label: {
        unique: true
      }
    },
    relationships: {
      author: 'has-one-in-place'
    }
  }
}, cozyStackClient)
```

**Kind**: global class  

* [Schema](#Schema)
    * [.getDoctypeSchema()](#Schema+getDoctypeSchema)
    * [.getRelationship()](#Schema+getRelationship)
    * [.validate()](#Schema+validate)

<a name="Schema+getDoctypeSchema"></a>

### schema.getDoctypeSchema()
Returns the schema for a doctype

Creates an empty schema implicitly if it does not exist

**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+getRelationship"></a>

### schema.getRelationship()
Returns the relationship for a given doctype/name

**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+validate"></a>

### schema.validate()
Validates a document considering the descriptions in schema.attributes.

**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="generateWebLink"></a>

## generateWebLink ⇒ <code>string</code>
generateWebLink - Construct a link to a web app

This function does not get its cozy url from a CozyClient instance so it can
be used to build urls that point to other Cozies than the user's own Cozy.
This is useful when pointing to the Cozy of the owner of a shared note for
example.

**Kind**: global constant  
**Returns**: <code>string</code> - Generated URL  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Object of options |
| options.cozyUrl | <code>string</code> | Base URL of the cozy, eg. cozy.tools or test.mycozy.cloud |
| options.searchParams | <code>Array</code> | Array of search parameters as [key, value] arrays, eg. ['username', 'bob'] |
| options.pathname | <code>string</code> | Path to a specific part of the app, eg. /public |
| options.hash | <code>string</code> | Path inside the app, eg. /files/test.jpg |
| options.slug | <code>string</code> | Slug of the app |
| options.subDomainType | <code>string</code> | Whether the cozy is using flat or nested subdomains. Defaults to flat. |

<a name="getMutedErrors"></a>

## getMutedErrors ⇒ <code>Array</code>
getMutedErrors - Returns the list of errors that have been muted for the given account

**Kind**: global constant  
**Returns**: <code>Array</code> - An array of errors with a `type` and `mutedAt` field  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>object</code> | io.cozy.accounts |

<a name="muteError"></a>

## muteError ⇒ <code>object</code>
muteError - Adds an error to the list of muted errors for the given account

**Kind**: global constant  
**Returns**: <code>object</code> - An updated io.cozy.accounts  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>object</code> | io.cozy.accounts |
| errorType | <code>string</code> | The type of the error to mute |

<a name="getStoreURL"></a>

## getStoreURL ⇒ <code>string</code>
Returns the store URL of an app/konnector

**Kind**: global constant  
**Returns**: <code>string</code> - URL as string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [appData] | <code>Array</code> | <code>[]</code> | Apps data, as returned by endpoint /apps/ or /konnectors |
| [app] | <code>object</code> | <code>{}</code> | AppObject |

<a name="getStoreInstallationURL"></a>

## getStoreInstallationURL ⇒ <code>string</code>
Returns the store URL to install/update an app/konnector

**Kind**: global constant  
**Returns**: <code>string</code> - URL as string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [appData] | <code>Array</code> | <code>[]</code> | Apps data, as returned by endpoint /apps/ or /konnectors/ |
| [app] | <code>object</code> | <code>{}</code> | AppObject |

<a name="isInstalled"></a>

## isInstalled ⇒ <code>object</code>
**Kind**: global constant  
**Returns**: <code>object</code> - The io.cozy.app is installed or undefined if not  

| Param | Type | Description |
| --- | --- | --- |
| apps | <code>Array</code> | Array of apps returned by /apps /konnectors |
| wantedApp | <code>object</code> | io.cozy.app with at least a slug |

<a name="getUrl"></a>

## getUrl ⇒ <code>string</code>
**Kind**: global constant  
**Returns**: <code>string</code> - url to the app  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>object</code> | io.cozy.apps document |

<a name="getAppDisplayName"></a>

## getAppDisplayName ⇒ <code>string</code>
getAppDisplayName - Combines the translated prefix and name of the app into a single string.

**Kind**: global constant  
**Returns**: <code>string</code> - Name of the app suitable for display  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>object</code> | io.cozy.apps or io.cozy.konnectors document |
| lang | <code>string</code> | Locale to use |

<a name="getInitials"></a>

## getInitials ⇒ <code>string</code>
Returns the initials of the contact.

**Kind**: global constant  
**Returns**: <code>string</code> - - the contact's initials  

| Param | Type | Description |
| --- | --- | --- |
| contact | <code>object</code> | A contact |

<a name="getPrimaryEmail"></a>

## getPrimaryEmail ⇒ <code>string</code>
Returns the contact's main email

**Kind**: global constant  
**Returns**: <code>string</code> - - The contact's main email  

| Param | Type | Description |
| --- | --- | --- |
| contact | <code>object</code> | A contact |

<a name="getPrimaryCozy"></a>

## getPrimaryCozy ⇒ <code>string</code>
Returns the contact's main cozy

**Kind**: global constant  
**Returns**: <code>string</code> - - The contact's main cozy  

| Param | Type | Description |
| --- | --- | --- |
| contact | <code>object</code> | A contact |

<a name="getPrimaryPhone"></a>

## getPrimaryPhone ⇒ <code>string</code>
Returns the contact's main phone number

**Kind**: global constant  
**Returns**: <code>string</code> - - The contact's main phone number  

| Param | Type | Description |
| --- | --- | --- |
| contact | <code>object</code> | A contact |

<a name="getPrimaryAddress"></a>

## getPrimaryAddress ⇒ <code>string</code>
Returns the contact's main address

**Kind**: global constant  
**Returns**: <code>string</code> - - The contact's main address  

| Param | Type | Description |
| --- | --- | --- |
| contact | <code>object</code> | A contact |

<a name="getFullname"></a>

## getFullname ⇒ <code>string</code>
Returns the contact's fullname

**Kind**: global constant  
**Returns**: <code>string</code> - - The contact's fullname  

| Param | Type | Description |
| --- | --- | --- |
| contact | <code>object</code> | A contact |

<a name="getDisplayName"></a>

## getDisplayName ⇒ <code>string</code>
Returns a display name for the contact

**Kind**: global constant  
**Returns**: <code>string</code> - - the contact's display name  

| Param | Type | Description |
| --- | --- | --- |
| contact | <code>object</code> | A contact |

<a name="getIndexByFamilyNameGivenNameEmailCozyUrl"></a>

## getIndexByFamilyNameGivenNameEmailCozyUrl ⇒ <code>string</code>
Returns 'byFamilyNameGivenNameEmailCozyUrl' index of a contact

**Kind**: global constant  
**Returns**: <code>string</code> - - the contact's 'byFamilyNameGivenNameEmailCozyUrl' index  

| Param | Type | Description |
| --- | --- | --- |
| contact | <code>object</code> | A contact |

<a name="splitFilename"></a>

## splitFilename ⇒ <code>object</code>
Returns base filename and extension

**Kind**: global constant  
**Returns**: <code>object</code> - {filename, extension}  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>object</code> | An io.cozy.files |

<a name="isFile"></a>

## isFile
**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | io.cozy.files |

<a name="isDirectory"></a>

## isDirectory
**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | io.cozy.files |

<a name="isNote"></a>

## isNote
**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | io.cozy.files |

<a name="isShortcut"></a>

## isShortcut ⇒ <code>boolean</code>
**Kind**: global constant  
**Returns**: <code>boolean</code> - true if the file is a shortcut  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | io.cozy.files |

<a name="ensureMagicFolder"></a>

## ensureMagicFolder ⇒ <code>object</code>
Returns a "Magic Folder", given its id. See https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.apps/#special-iocozyapps-doctypes

**Kind**: global constant  
**Returns**: <code>object</code> - Folder document  

| Param | Type | Description |
| --- | --- | --- |
| client | <code>object</code> | cozy-client instance |
| id | <code>string</code> | Magic Folder id. `CozyFolder.magicFolders` contains the ids of folders that can be magic folders. |
| path | <code>string</code> | Default path to use if magic folder does not exist |

<a name="createFolderWithReference"></a>

## createFolderWithReference ⇒ <code>object</code>
Create a folder with a reference to the given document

**Kind**: global constant  
**Returns**: <code>object</code> - Folder document  

| Param | Type | Description |
| --- | --- | --- |
| client | <code>object</code> | cozy-client instance |
| path | <code>string</code> | Folder path |
| document | <code>object</code> | Document to make reference to. Any doctype. |

<a name="getReferencedFolder"></a>

## getReferencedFolder ⇒ <code>Array</code>
Returns an array of folder referenced by the given document

**Kind**: global constant  
**Returns**: <code>Array</code> - Array of folders referenced with the given
document  

| Param | Type | Description |
| --- | --- | --- |
| client | <code>object</code> | cozy-client instance |
| document | <code>object</code> | Document to get references from |

<a name="shouldDisplayOffers"></a>

## shouldDisplayOffers
Returns whether an instance is concerned by our offers

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Object containing all the results from /settings/* |
| data.context | <code>object</code> | Object returned by /settings/context |
| data.instance | <code>object</code> | Object returned by /settings/instance |
| data.diskUsage | <code>object</code> | Object returned by /settings/disk-usage |

<a name="hasAnOffer"></a>

## hasAnOffer
Returns if an instance has subscribed to one of our offers

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Object containing all the results from /settings/* |
| data.context | <code>object</code> | Object returned by /settings/context |
| data.instance | <code>object</code> | Object returned by /settings/instance |
| data.diskUsage | <code>object</code> | Object returned by /settings/disk-usage |

<a name="buildPremiumLink"></a>

## buildPremiumLink
Returns the link to the Premium page on the Cozy's Manager

**Kind**: global constant  

| Param | Type |
| --- | --- |
| instanceInfo | <code>object</code> | 

<a name="generatePrivateUrl"></a>

## generatePrivateUrl
**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| notesAppUrl | <code>string</code> | URL to the Notes App (https://notes.foo.mycozy.cloud) |
| file | <code>object</code> | io.cozy.files object |

<a name="fetchURL"></a>

## fetchURL ⇒ <code>string</code>
Fetch and build an URL to open a note.

**Kind**: global constant  
**Returns**: <code>string</code> - url  

| Param | Type | Description |
| --- | --- | --- |
| client | <code>object</code> | CozyClient instance |
| file | <code>object</code> | io.cozy.file object |

<a name="triggerStates"></a>

## triggerStates
Trigger states come from /jobs/triggers

**Kind**: global constant  

* [triggerStates](#triggerStates)
    * [.getLastExecution()](#triggerStates.getLastExecution)
    * [.getLastsuccess()](#triggerStates.getLastsuccess)
    * [.isErrored()](#triggerStates.isErrored)
    * [.getLastErrorType()](#triggerStates.getLastErrorType)

<a name="triggerStates.getLastExecution"></a>

### triggerStates.getLastExecution()
Returns when the trigger was last executed. Need a trigger

**Kind**: static method of [<code>triggerStates</code>](#triggerStates)  
<a name="triggerStates.getLastsuccess"></a>

### triggerStates.getLastsuccess()
Returns when the trigger was last successfully executed.

**Kind**: static method of [<code>triggerStates</code>](#triggerStates)  
<a name="triggerStates.isErrored"></a>

### triggerStates.isErrored()
Returns whether last job failed

**Kind**: static method of [<code>triggerStates</code>](#triggerStates)  
<a name="triggerStates.getLastErrorType"></a>

### triggerStates.getLastErrorType()
Returns the type of the last error to occur

**Kind**: static method of [<code>triggerStates</code>](#triggerStates)  
<a name="fetchPolicies"></a>

## fetchPolicies
Use those fetch policies with `<Query />` to limit the number of re-fetch.

**Kind**: global constant  
**Example**  
```
import { fetchPolicies } from 'cozy-client'
const olderThan30s = fetchPolicies.olderThan(30 * 1000)
<Query fetchPolicy={olderThan30s} />
```

* [fetchPolicies](#fetchPolicies)
    * [.olderThan(delay)](#fetchPolicies.olderThan) ⇒ <code>function</code>
    * [.noFetch()](#fetchPolicies.noFetch)

<a name="fetchPolicies.olderThan"></a>

### fetchPolicies.olderThan(delay) ⇒ <code>function</code>
Returns a fetchPolicy that will only re-fetch queries that are older
than `<delay>` ms.

**Kind**: static method of [<code>fetchPolicies</code>](#fetchPolicies)  
**Returns**: <code>function</code> - Fetch policy to be used with `<Query />`  

| Param | Type | Description |
| --- | --- | --- |
| delay | <code>number</code> | Milliseconds since the query has been fetched |

<a name="fetchPolicies.noFetch"></a>

### fetchPolicies.noFetch()
Fetch policy that deactivates any fetching.

**Kind**: static method of [<code>fetchPolicies</code>](#fetchPolicies)  
<a name="Q"></a>

## Q
Helper to create a QueryDefinition. Recommended way to create
query definitions.

**Kind**: global constant  
**Example**  
```
import { Q } from 'cozy-client'

const qDef = Q('io.cozy.todos').where({ _id: '1234' })
```
<a name="isQueryLoading"></a>

## isQueryLoading
Returns whether the result of a query (given via queryConnect or Query)
is loading.

**Kind**: global constant  
<a name="hasQueryBeenLoaded"></a>

## hasQueryBeenLoaded
Returns whether a query has been loaded at least once

**Kind**: global constant  
<a name="createClientInteractive"></a>

## createClientInteractive(clientOptions)
Creates a client with interactive authentication.

- Will start an OAuth flow and open an authentication page
- Starts a local server to listen for the oauth callback
- Resolves with the client after user authentication

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| clientOptions | <code>object</code> | Same as CozyClient::constructor. |

**Example**  
```
import { createClientInteractive } from 'cozy-client/dist/cli'
await createClientInteractive({
  uri: 'http://cozy.tools:8080',
  scope: ['io.cozy.bills'],
  oauth: {
    softwareID: 'my-cli-application-using-bills'
  }
})
```
<a name="withClient"></a>

## withClient(Component) ⇒ <code>function</code>
HOC to provide client from context as prop

**Kind**: global function  
**Returns**: <code>function</code> - - Component that will receive client as prop  

| Param | Type | Description |
| --- | --- | --- |
| Component | <code>Component</code> | wrapped component |

<a name="queryConnect"></a>

## queryConnect(querySpecs) ⇒ <code>function</code>
HOC creator to connect component to several queries in a declarative manner

**Kind**: global function  
**Returns**: <code>function</code> - - HOC to apply to a component  

| Param | Type | Description |
| --- | --- | --- |
| querySpecs | <code>object</code> | Definition of the queries |

<a name="queryConnectFlat"></a>

## queryConnectFlat(querySpecs) ⇒ <code>function</code>
HOC creator to connect component to several queries in a declarative manner
The only difference with queryConnect is that it does not wrap the component in N component
if there are N queries, only 1 extra level of nesting is introduced.

**Kind**: global function  
**Returns**: <code>function</code> - - HOC to apply to a component  

| Param | Type | Description |
| --- | --- | --- |
| querySpecs | <code>object</code> | Definition of the queries |

<a name="getErrorComponent"></a>

## getErrorComponent(error) ⇒ <code>function</code> \| <code>null</code>
Returns the handler for an error

**Kind**: global function  
**Returns**: <code>function</code> \| <code>null</code> - React Component  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | - |

<a name="useFetchJSON"></a>

## useFetchJSON()
Hook to use the generic fetchJSON method

Takes the same arguments as fetchJSON

Returns an object with the same keys { data, fetchStatus, error } as useQuery

**Kind**: global function  
<a name="useQuery"></a>

## useQuery(queryDefinition, options) ⇒ <code>object</code>
Fetches a queryDefinition and returns the queryState

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| queryDefinition | <code>object</code> | Definition created with Q() |
| options | <code>object</code> | Options |
| options.as | <code>object</code> | Name for the query [required] |
| options.fetchPolicy | <code>object</code> | Fetch policy |

<a name="sanitizeCategories"></a>

## sanitizeCategories()
Filters unauthorized categories. Defaults to ['others'] if no suitable category.

**Kind**: global function  
<a name="sanitize"></a>

## sanitize(manifest) ⇒ <code>Manifest</code>
Normalize app manifest, retrocompatibility for old manifests

**Kind**: global function  

| Param | Type |
| --- | --- |
| manifest | <code>Manifest</code> | 

<a name="createMockClient"></a>

## createMockClient(options) ⇒ [<code>CozyClient</code>](#CozyClient)
Creates a client suitable for use in tests

- client.{query,save} are mocked
- client.stackClient.fetchJSON is mocked

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options |
| options.queries | <code>object</code> | Prefill queries inside the store |
| options.remote | <code>object</code> | Mock data from the server |
| options.clientOptions | <code>object</code> | Options passed to the client |

<a name="normalize"></a>

## normalize(file) ⇒ <code>object</code>
Normalizes an object representing a io.cozy.files object

Ensures existence of `_id` and `_type`

**Kind**: global function  
**Returns**: <code>object</code> - full normalized object  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>object</code> | object representing the file |

<a name="ensureFilePath"></a>

## ensureFilePath(file, parent) ⇒ <code>object</code>
Ensure the file has a `path` attribute, or build it

**Kind**: global function  
**Returns**: <code>object</code> - file object with path attribute  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>object</code> | object representing the file |
| parent | <code>object</code> | parent directory for the file |

<a name="getParentFolderId"></a>

## getParentFolderId(file) ⇒ <code>string</code> \| <code>null</code>
Get the id of the parent folder (`null` for the root folder)

**Kind**: global function  
**Returns**: <code>string</code> \| <code>null</code> - id of the parent folder, if any  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>object</code> | io.cozy.files document |

<a name="fetchOwn"></a>

## fetchOwn(client) ⇒ [<code>Array.&lt;PermissionItem&gt;</code>](#PermissionItem)
Fetches the list of permissions blocks

**Kind**: global function  
**Returns**: [<code>Array.&lt;PermissionItem&gt;</code>](#PermissionItem) - list of permissions  

| Param | Type | Description |
| --- | --- | --- |
| client | [<code>CozyClient</code>](#CozyClient) | - |

<a name="isForType"></a>

## isForType(permission, type)
Checks if the permission item is about a specific doctype

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| permission | [<code>PermissionItem</code>](#PermissionItem) | - |
| type | <code>string</code> | doctype |

<a name="currentResult"></a>

## currentResult() ⇒ <code>HydratedQueryState</code>
Returns the query from the store with hydrated documents.

**Kind**: global function  
<a name="fetchMore"></a>

## fetchMore()
Generates and executes a query that is offsetted by the number of documents
we have in the store.

**Kind**: global function  
<a name="getQueryAttributes"></a>

## getQueryAttributes()
Get attributes that will be assigned to the instance of a Query

**Kind**: global function  
<a name="cancelable"></a>

## cancelable(promise) ⇒ <code>AugmentedPromise</code>
Wraps a promise so that it can be canceled

Rejects with canceled: true as soon as cancel is called

**Kind**: global function  
**Returns**: <code>AugmentedPromise</code> - - Promise with .cancel method  

| Param | Type |
| --- | --- |
| promise | <code>Promise</code> | 

<a name="withMutations"></a>

## ~~withMutations(...mutations) ⇒ <code>function</code>~~
***Deprecated***

HOC to provide mutations to components. Needs client in context or as prop.

**Kind**: global function  
**Returns**: <code>function</code> - - Component that will receive mutations as props  

| Param | Type | Description |
| --- | --- | --- |
| ...mutations | <code>function</code> | One ore more mutations, which are function taking CozyClient as parameter and returning an object containing one or more mutations as attributes. |

<a name="QueryState"></a>

## QueryState : <code>object</code>
**Kind**: global typedef  
<a name="Document"></a>

## Document : <code>object</code>
Couchdb document like an io.cozy.files

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| _id | <code>string</code> | 
| _type | <code>string</code> | 

<a name="PermissionVerb"></a>

## PermissionVerb : <code>&#x27;ALL&#x27;</code> \| <code>&#x27;GET&#x27;</code> \| <code>&#x27;PATCH&#x27;</code> \| <code>&#x27;POST&#x27;</code> \| <code>&#x27;PUT&#x27;</code> \| <code>&#x27;DELETE&#x27;</code>
**Kind**: global typedef  
<a name="PermissionItem"></a>

## PermissionItem : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| verbs | [<code>Array.&lt;PermissionVerb&gt;</code>](#PermissionVerb) | ALL, GET, PUT, PATCH, DELETE, POST… |
| selector | <code>string</code> | defaults to `id` |
| values | <code>Array.&lt;string&gt;</code> |  |
| type | <code>string</code> | a couch db database like 'io.cozy.files' |

<a name="Registry"></a>

## Registry : <code>RegistryApp</code>
**Kind**: global typedef  

* [Registry](#Registry) : <code>RegistryApp</code>
    * [.installApp(app, source)](#Registry+installApp) ⇒ <code>Promise</code>
    * [.uninstallApp()](#Registry+uninstallApp)
    * [.fetchApps(params)](#Registry+fetchApps) ⇒ <code>Array.&lt;RegistryApp&gt;</code>
    * [.fetchAppsInMaintenance()](#Registry+fetchAppsInMaintenance) ⇒ <code>Array.&lt;RegistryApp&gt;</code>
    * [.fetchApp(slug)](#Registry+fetchApp) ⇒ <code>RegistryApp</code>

<a name="Registry+installApp"></a>

### registry.installApp(app, source) ⇒ <code>Promise</code>
Installs or updates an app from a source.

Accepts the terms if the app has them.

**Kind**: instance method of [<code>Registry</code>](#Registry)  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>RegistryApp</code> | App to be installed |
| source | <code>string</code> | String (ex: registry://drive/stable) |

<a name="Registry+uninstallApp"></a>

### registry.uninstallApp()
Uninstalls an app.

**Kind**: instance method of [<code>Registry</code>](#Registry)  
<a name="Registry+fetchApps"></a>

### registry.fetchApps(params) ⇒ <code>Array.&lt;RegistryApp&gt;</code>
Fetch at most 200 apps from the channel

**Kind**: instance method of [<code>Registry</code>](#Registry)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>string</code> | Fetching parameters |
| params.type | <code>string</code> | "webapp" or "konnector" |
| params.channel | <code>string</code> | "dev"/"beta"/"stable" |

<a name="Registry+fetchAppsInMaintenance"></a>

### registry.fetchAppsInMaintenance() ⇒ <code>Array.&lt;RegistryApp&gt;</code>
Fetch the list of apps that are in maintenance mode

**Kind**: instance method of [<code>Registry</code>](#Registry)  
<a name="Registry+fetchApp"></a>

### registry.fetchApp(slug) ⇒ <code>RegistryApp</code>
Fetch the status of a single app on the registry

**Kind**: instance method of [<code>Registry</code>](#Registry)  

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>string</code> | The slug of the app to fetch |

