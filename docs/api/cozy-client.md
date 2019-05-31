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

## Functions

<dl>
<dt><a href="#withClient">withClient(Component)</a> ⇒ <code>function</code></dt>
<dd><p>HOC to provide client from context as prop</p>
</dd>
<dt><a href="#queryConnect">queryConnect(querySpecs)</a> ⇒ <code>function</code></dt>
<dd><p>HOC creator to connect component to several queries in a declarative manner</p>
</dd>
<dt><a href="#sanitizeCategories">sanitizeCategories()</a></dt>
<dd><p>Filters unauthorized categories. Defaults to [&#39;others&#39;] if no suitable category.</p>
</dd>
<dt><a href="#sanitize">sanitize(manifest)</a> ⇒ <code>Manifest</code></dt>
<dd><p>Normalize app manifest, retrocompatibility for old manifests</p>
</dd>
<dt><a href="#cancelable">cancelable(promise)</a> ⇒ <code>AugmentedPromise</code></dt>
<dd><p>Wraps a promise so that it can be canceled</p>
<p>Rejects with canceled: true as soon as cancel is called</p>
</dd>
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
| options.dispatch | <code>function</code> | Store's dispatch, comes from the client |
| options | <code>string</code> |  |

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
        * [.addById()](#HasMany+addById)
    * _static_
        * [.query()](#HasManyTriggers.query)

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
        * [.login()](#CozyClient+login) ⇒ <code>Promise</code>
        * [.logout()](#CozyClient+logout) ⇒ <code>Promise</code>
        * [.collection(doctype)](#CozyClient+collection) ⇒ <code>DocumentCollection</code>
        * [.getDocumentSavePlan(document, relationships)](#CozyClient+getDocumentSavePlan) ⇒ <code>Array.&lt;Mutation&gt;</code>
        * [.fetchRelationships()](#CozyClient+fetchRelationships)
        * [.hydrateDocument()](#CozyClient+hydrateDocument)
        * [.makeNewDocument()](#CozyClient+makeNewDocument)
        * [.getAssociation()](#CozyClient+getAssociation)
        * [.getRelationshipStoreAccessors()](#CozyClient+getRelationshipStoreAccessors)
        * [.register(cozyURL)](#CozyClient+register) ⇒ <code>object</code>
        * [.startOAuthFlow(openURLCallback)](#CozyClient+startOAuthFlow) ⇒ <code>object</code>
        * [.renewAuthorization()](#CozyClient+renewAuthorization) ⇒ <code>object</code>
        * [.handleRevocationChange()](#CozyClient+handleRevocationChange)
        * [.handleTokenRefresh()](#CozyClient+handleTokenRefresh)
        * [.createClient()](#CozyClient+createClient)
        * [.setData(data)](#CozyClient+setData)
    * _static_
        * [.fromEnv()](#CozyClient.fromEnv)

<a name="new_CozyClient_new"></a>

### new CozyClient(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.link | <code>Link</code> | Backward compatibility |
| options.links | <code>Array.Link</code> | List of links |
| options.schema | <code>Object</code> | Schema description for each doctypes |
| options.appMetadata | <code>Object</code> | Metadata about the application that will be used in ensureCozyMetadata Cozy-Client will automatically call `this.login()` if provided with a token and an uri |

<a name="CozyClient+login"></a>

### cozyClient.login() ⇒ <code>Promise</code>
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
| options.token | <code>options.token</code> | If passed, the token is set on the client |
| options.uri | <code>options.uri</code> | If passed, the uri is set on the client |

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

| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>String</code> | The collection doctype. |

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

<a name="CozyClient+fetchRelationships"></a>

### cozyClient.fetchRelationships()
Fetch relationships for a response (can be several docs).
Fills the `relationships` attribute of each documents.

Can potentially result in several fetch requests.
Queries are optimized before being sent.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
<a name="CozyClient+hydrateDocument"></a>

### cozyClient.hydrateDocument()
Instantiate relationships on a document

The original document is kept in the target attribute of
the relationship

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  
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
<a name="CozyClient+setData"></a>

### cozyClient.setData(data)
Directly set the data in the store, without using a query
This is useful for cases like Pouch replication, which wants to
set some data in the store.

**Kind**: instance method of [<code>CozyClient</code>](#CozyClient)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | { doctype: [data] } |

<a name="CozyClient.fromEnv"></a>

### CozyClient.fromEnv()
In konnector/service context, CozyClient can be instantiated from environment variables

**Kind**: static method of [<code>CozyClient</code>](#CozyClient)  
<a name="QueryDefinition"></a>

## QueryDefinition
Chainable API to create query definitions to retrieve documents
from a Cozy. `QueryDefinition`s are sent to links.

**Kind**: global class  

* [QueryDefinition](#QueryDefinition)
    * [new QueryDefinition(doctype, id, ids, selector, fields, indexedFields, sort, includes, referenced, limit, skip)](#new_QueryDefinition_new)
    * [.where(selector)](#QueryDefinition+where) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.select(fields)](#QueryDefinition+select) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.indexFields(fields)](#QueryDefinition+indexFields) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.sortBy(sort)](#QueryDefinition+sortBy) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.include(includes)](#QueryDefinition+include) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.limitBy(limit)](#QueryDefinition+limitBy) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.offset(skip)](#QueryDefinition+offset) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
    * [.referencedBy(document)](#QueryDefinition+referencedBy) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)

<a name="new_QueryDefinition_new"></a>

### new QueryDefinition(doctype, id, ids, selector, fields, indexedFields, sort, includes, referenced, limit, skip)

| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | The doctype of the doc. |
| id | <code>string</code> | The id of the doc. |
| ids | <code>Array</code> | The ids of the docs. |
| selector | <code>Object</code> | The selector to query the docs. |
| fields | <code>Array</code> | The fields to return. |
| indexedFields | <code>Array</code> | The fields to index. |
| sort | <code>Array</code> | The sorting params. |
| includes | <code>string</code> | The docs to include. |
| referenced | <code>string</code> | The referenced document. |
| limit | <code>number</code> | The document's limit to return. |
| skip | <code>number</code> | The number of docs to skip. |

<a name="QueryDefinition+where"></a>

### queryDefinition.where(selector) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Query documents with a [mango selector](http://docs.couchdb.org/en/latest/api/database/find.html#find-selectors).
Each field passed in the selector will be indexed, except if the indexField option is used.

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The Mango selector. |

<a name="QueryDefinition+select"></a>

### queryDefinition.select(fields) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Specify which fields of each object should be returned. If it is omitted, the entire object is returned.

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| fields | <code>Array</code> | The fields to return. |

<a name="QueryDefinition+indexFields"></a>

### queryDefinition.indexFields(fields) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Specify which fields should be indexed. This prevent the automatic indexing of the mango fields.

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| fields | <code>Array</code> | The fields to index. |

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

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| skip | <code>number</code> | The number of documents to skip. |

<a name="QueryDefinition+referencedBy"></a>

### queryDefinition.referencedBy(document) ⇒ [<code>QueryDefinition</code>](#QueryDefinition)
Use the [file reference system](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/)

**Kind**: instance method of [<code>QueryDefinition</code>](#QueryDefinition)  
**Returns**: [<code>QueryDefinition</code>](#QueryDefinition) - The QueryDefinition object.  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>Object</code> | The reference document |

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

<a name="cancelable"></a>

## cancelable(promise) ⇒ <code>AugmentedPromise</code>
Wraps a promise so that it can be canceled

Rejects with canceled: true as soon as cancel is called

**Kind**: global function  
**Returns**: <code>AugmentedPromise</code> - - Promise with .cancel method  

| Param | Type |
| --- | --- |
| promise | <code>Promise</code> | 

