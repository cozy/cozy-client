## Classes

<dl>
<dt><a href="#AppCollection">AppCollection</a></dt>
<dd><p>Extends <code>DocumentCollection</code> API along with specific methods for <code>io.cozy.apps</code>.</p>
</dd>
<dt><a href="#Collection">Collection</a></dt>
<dd><p>Utility class to abstract an regroup identical methods and logics for
specific collections.</p>
</dd>
<dt><a href="#CozyStackClient">CozyStackClient</a></dt>
<dd><p>Main API against the <code>cozy-stack</code> server.</p>
</dd>
<dt><a href="#DocumentCollection">DocumentCollection</a></dt>
<dd><p>Abstracts a collection of documents of the same doctype, providing CRUD methods and other helpers.</p>
</dd>
<dt><a href="#FileCollection">FileCollection</a></dt>
<dd><p>Implements <code>DocumentCollection</code> API along with specific methods for
<code>io.cozy.files</code>.</p>
<p>Files are a special type of documents and are handled differently by the stack:
special routes are to be used, and there is a notion of referenced files, aka
files associated to a specific document</p>
</dd>
<dt><a href="#NotesCollection">NotesCollection</a></dt>
<dd><p>Implements <code>DocumentCollection</code> API to interact with the /notes endpoint of the stack</p>
</dd>
<dt><a href="#OAuthClient">OAuthClient</a></dt>
<dd><p>Specialized <code>CozyStackClient</code> for mobile, implementing stack registration
through OAuth.</p>
</dd>
<dt><a href="#PermissionCollection">PermissionCollection</a></dt>
<dd><p>Implements <code>DocumentCollection</code> API along with specific methods for <code>io.cozy.permissions</code>.</p>
</dd>
<dt><a href="#SettingsCollection">SettingsCollection</a></dt>
<dd><p>Implements <code>DocumentCollection</code> API to interact with the /settings endpoint of the stack</p>
</dd>
<dt><a href="#SharingCollection">SharingCollection</a></dt>
<dd><p>Implements the <code>DocumentCollection</code> API along with specific methods for
<code>io.cozy.sharings</code>.</p>
</dd>
<dt><a href="#TriggerCollection">TriggerCollection</a></dt>
<dd><p>Implements <code>DocumentCollection</code> API along with specific methods for <code>io.cozy.triggers</code>.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#dontThrowNotFoundError">dontThrowNotFoundError</a> ⇒ <code>object</code></dt>
<dd><p>Handler for error response which return a empty value for &quot;not found&quot; error</p>
</dd>
<dt><a href="#getPermissionsFor">getPermissionsFor</a> ⇒ <code>object</code></dt>
<dd><p>Build a permission set</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getAccessToken">getAccessToken()</a> ⇒ <code>string</code></dt>
<dd><p>Get the access token string</p>
</dd>
<dt><a href="#getAccessToken">getAccessToken()</a> ⇒ <code>string</code></dt>
<dd><p>Get the app token string</p>
</dd>
<dt><a href="#garbageCollect">garbageCollect()</a></dt>
<dd><p>Delete outdated results from cache</p>
</dd>
<dt><a href="#memoize">memoize()</a></dt>
<dd><p>Memoize with maxDuration and custom key</p>
</dd>
<dt><a href="#getCozyURL">getCozyURL()</a></dt>
<dd><p>Get a uniform formatted URL and SSL information according to a provided URL</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#DirectoryAttributes">DirectoryAttributes</a> : <code>object</code></dt>
<dd><p>Attributes used for directory creation</p>
</dd>
<dt><a href="#FileAttributes">FileAttributes</a> : <code>object</code></dt>
<dd><p>Attributes used for file creation</p>
</dd>
<dt><a href="#FileDocument">FileDocument</a> : <code>object</code></dt>
<dd><p>Document representing a io.cozy.files</p>
</dd>
<dt><a href="#Stream">Stream</a> : <code>object</code></dt>
<dd><p>Stream is not defined in a browser, but is on NodeJS environment</p>
</dd>
<dt><a href="#Permission">Permission</a> ⇒ <code><a href="#Permission">Permission</a></code></dt>
<dd><p>async getOwnPermissions - Gets the permission for the current token</p>
</dd>
<dt><a href="#Rule">Rule</a> : <code>object</code></dt>
<dd><p>A sharing rule</p>
</dd>
<dt><a href="#Recipient">Recipient</a> : <code>object</code></dt>
<dd><p>An io.cozy.contact</p>
</dd>
<dt><a href="#Sharing">Sharing</a> : <code>object</code></dt>
<dd><p>An io.cozy.sharings document</p>
</dd>
</dl>

<a name="AppCollection"></a>

## AppCollection
Extends `DocumentCollection` API along with specific methods for `io.cozy.apps`.

**Kind**: global class  
<a name="AppCollection+all"></a>

### appCollection.all() ⇒ <code>Object</code>
Lists all apps, without filters.

The returned documents are not paginated by the stack.

**Kind**: instance method of [<code>AppCollection</code>](#AppCollection)  
**Returns**: <code>Object</code> - The JSON API conformant response.  
**Throws**:

- <code>FetchError</code> 

<a name="Collection"></a>

## Collection
Utility class to abstract an regroup identical methods and logics for
specific collections.

**Kind**: global class  
<a name="Collection.get"></a>

### Collection.get(stackClient, endpoint, options) ⇒ <code>object</code>
Utility method aimed to return only one document.

**Kind**: static method of [<code>Collection</code>](#Collection)  
**Returns**: <code>object</code> - JsonAPI response containing normalized
document as data attribute  

| Param | Type | Description |
| --- | --- | --- |
| stackClient | [<code>CozyStackClient</code>](#CozyStackClient) | CozyStackClient |
| endpoint | <code>string</code> | Stack endpoint |
| options | <code>object</code> | Options of the collection |
| options.normalize | <code>Func</code> | Callback to normalize response data (default `data => data`) |
| options.method | <code>string</code> | HTTP method (default `GET`) |

<a name="CozyStackClient"></a>

## CozyStackClient
Main API against the `cozy-stack` server.

**Kind**: global class  

* [CozyStackClient](#CozyStackClient)
    * [.collection(doctype)](#CozyStackClient+collection) ⇒ [<code>DocumentCollection</code>](#DocumentCollection)
    * [.fetch(method, path, body, opts)](#CozyStackClient+fetch) ⇒ <code>object</code>
    * [.checkForRevocation()](#CozyStackClient+checkForRevocation)
    * [.refreshToken()](#CozyStackClient+refreshToken) ⇒ <code>Promise</code>
    * [.fetchJSON(method, path, body, options)](#CozyStackClient+fetchJSON) ⇒ <code>object</code>
    * [.setToken(token)](#CozyStackClient+setToken)
    * [.getAccessToken()](#CozyStackClient+getAccessToken) ⇒ <code>string</code>

<a name="CozyStackClient+collection"></a>

### cozyStackClient.collection(doctype) ⇒ [<code>DocumentCollection</code>](#DocumentCollection)
Creates a [DocumentCollection](#DocumentCollection) instance.

**Kind**: instance method of [<code>CozyStackClient</code>](#CozyStackClient)  

| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | The collection doctype. |

<a name="CozyStackClient+fetch"></a>

### cozyStackClient.fetch(method, path, body, opts) ⇒ <code>object</code>
Fetches an endpoint in an authorized way.

**Kind**: instance method of [<code>CozyStackClient</code>](#CozyStackClient)  
**Throws**:

- <code>FetchError</code> 


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | The HTTP method. |
| path | <code>string</code> | The URI. |
| body | <code>object</code> | The payload. |
| opts | <code>object</code> | Options for fetch |

<a name="CozyStackClient+checkForRevocation"></a>

### cozyStackClient.checkForRevocation()
Returns whether the client has been revoked on the server

**Kind**: instance method of [<code>CozyStackClient</code>](#CozyStackClient)  
<a name="CozyStackClient+refreshToken"></a>

### cozyStackClient.refreshToken() ⇒ <code>Promise</code>
Retrieves a new app token by refreshing the currently used token.

**Kind**: instance method of [<code>CozyStackClient</code>](#CozyStackClient)  
**Returns**: <code>Promise</code> - A promise that resolves with a new AccessToken object  
**Throws**:

- <code>Error</code> The client should already have an access token to use this function
- <code>Error</code> The client couldn't fetch a new token

<a name="CozyStackClient+fetchJSON"></a>

### cozyStackClient.fetchJSON(method, path, body, options) ⇒ <code>object</code>
Fetches JSON in an authorized way.

**Kind**: instance method of [<code>CozyStackClient</code>](#CozyStackClient)  
**Throws**:

- <code>FetchError</code> 


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | The HTTP method. |
| path | <code>string</code> | The URI. |
| body | <code>object</code> | The payload. |
| options | <code>object</code> | Options |

<a name="CozyStackClient+setToken"></a>

### cozyStackClient.setToken(token)
Change or set the API token

**Kind**: instance method of [<code>CozyStackClient</code>](#CozyStackClient)  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> \| <code>AppToken</code> \| <code>AccessToken</code> | Stack API token |

<a name="CozyStackClient+getAccessToken"></a>

### cozyStackClient.getAccessToken() ⇒ <code>string</code>
Get the access token string, being an oauth token or an app token

**Kind**: instance method of [<code>CozyStackClient</code>](#CozyStackClient)  
**Returns**: <code>string</code> - token  
<a name="DocumentCollection"></a>

## DocumentCollection
Abstracts a collection of documents of the same doctype, providing CRUD methods and other helpers.

**Kind**: global class  

* [DocumentCollection](#DocumentCollection)
    * [.all(options)](#DocumentCollection+all) ⇒ <code>Object</code>
    * [.find(selector, options)](#DocumentCollection+find) ⇒ <code>Object</code>
    * [.get(id)](#DocumentCollection+get) ⇒ <code>object</code>
    * [.getAll()](#DocumentCollection+getAll)
    * [.create(doc)](#DocumentCollection+create)
    * [.update(document)](#DocumentCollection+update)
    * [.destroy(doc)](#DocumentCollection+destroy)
    * [.updateAll(docs)](#DocumentCollection+updateAll)
    * [.destroyAll(docs)](#DocumentCollection+destroyAll)
    * [.fetchChanges(couchOptions, options)](#DocumentCollection+fetchChanges)

<a name="DocumentCollection+all"></a>

### documentCollection.all(options) ⇒ <code>Object</code>
Lists all documents of the collection, without filters.

The returned documents are paginated by the stack.

**Kind**: instance method of [<code>DocumentCollection</code>](#DocumentCollection)  
**Returns**: <code>Object</code> - The JSON API conformant response.  
**Throws**:

- <code>FetchError</code> 


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The fetch options: pagination & fetch of specific docs. |

<a name="DocumentCollection+find"></a>

### documentCollection.find(selector, options) ⇒ <code>Object</code>
Returns a filtered list of documents using a Mango selector.

The returned documents are paginated by the stack.

**Kind**: instance method of [<code>DocumentCollection</code>](#DocumentCollection)  
**Returns**: <code>Object</code> - The JSON API conformant response.  
**Throws**:

- <code>FetchError</code> 


| Param | Type | Description |
| --- | --- | --- |
| selector | <code>object</code> | The Mango selector. |
| options | <code>Object</code> | The query options. |

<a name="DocumentCollection+get"></a>

### documentCollection.get(id) ⇒ <code>object</code>
Get a document by id

**Kind**: instance method of [<code>DocumentCollection</code>](#DocumentCollection)  
**Returns**: <code>object</code> - JsonAPI response containing normalized document as data attribute  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The document id. |

<a name="DocumentCollection+getAll"></a>

### documentCollection.getAll()
Get many documents by id

**Kind**: instance method of [<code>DocumentCollection</code>](#DocumentCollection)  
<a name="DocumentCollection+create"></a>

### documentCollection.create(doc)
Creates a document

**Kind**: instance method of [<code>DocumentCollection</code>](#DocumentCollection)  

| Param | Type | Description |
| --- | --- | --- |
| doc | <code>object</code> | Document to create. Optional: you can force the id with the _id attribute |

<a name="DocumentCollection+update"></a>

### documentCollection.update(document)
Updates a document

**Kind**: instance method of [<code>DocumentCollection</code>](#DocumentCollection)  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | Document to update. Do not forget the _id attribute |

<a name="DocumentCollection+destroy"></a>

### documentCollection.destroy(doc)
Destroys a document

**Kind**: instance method of [<code>DocumentCollection</code>](#DocumentCollection)  

| Param | Type | Description |
| --- | --- | --- |
| doc | <code>object</code> | Document to destroy. Do not forget _id and _rev attributes |

<a name="DocumentCollection+updateAll"></a>

### documentCollection.updateAll(docs)
Updates several documents in one batch

**Kind**: instance method of [<code>DocumentCollection</code>](#DocumentCollection)  

| Param | Type | Description |
| --- | --- | --- |
| docs | <code>Array.&lt;Document&gt;</code> | Documents to be updated |

<a name="DocumentCollection+destroyAll"></a>

### documentCollection.destroyAll(docs)
Deletes several documents in one batch

**Kind**: instance method of [<code>DocumentCollection</code>](#DocumentCollection)  

| Param | Type | Description |
| --- | --- | --- |
| docs | <code>Array.&lt;Document&gt;</code> | Documents to delete |

<a name="DocumentCollection+fetchChanges"></a>

### documentCollection.fetchChanges(couchOptions, options)
Use Couch _changes API

**Kind**: instance method of [<code>DocumentCollection</code>](#DocumentCollection)  

| Param | Type | Description |
| --- | --- | --- |
| couchOptions | <code>object</code> | Couch options for changes https://kutt.it/5r7MNQ |
| options | <code>object</code> | { includeDesign: false, includeDeleted: false } |

<a name="FileCollection"></a>

## FileCollection
Implements `DocumentCollection` API along with specific methods for
`io.cozy.files`.

Files are a special type of documents and are handled differently by the stack:
special routes are to be used, and there is a notion of referenced files, aka
files associated to a specific document

**Kind**: global class  

* [FileCollection](#FileCollection)
    * [.get(id)](#FileCollection+get) ⇒ <code>Object</code>
    * [.find(selector, options)](#FileCollection+find) ⇒ <code>Object</code>
    * [.findReferencedBy(document, options)](#FileCollection+findReferencedBy) ⇒ <code>object</code>
    * [.addReferencedBy(document, documents)](#FileCollection+addReferencedBy) ⇒ <code>object</code>
    * [.removeReferencedBy(document, documents)](#FileCollection+removeReferencedBy) ⇒ <code>object</code>
    * [.addReferencesTo(document, documents)](#FileCollection+addReferencesTo) ⇒ <code>object</code>
    * [.removeReferencesTo(document, documents)](#FileCollection+removeReferencesTo) ⇒ <code>object</code>
    * [.destroy(file)](#FileCollection+destroy) ⇒ <code>Promise</code>
    * [.emptyTrash()](#FileCollection+emptyTrash)
    * [.restore(id)](#FileCollection+restore) ⇒ <code>Promise</code>
    * [.deleteFilePermanently(id)](#FileCollection+deleteFilePermanently) ⇒ <code>object</code>
    * [.upload(data, dirPath)](#FileCollection+upload) ⇒ <code>object</code>
    * [.create(attributes)](#FileCollection+create)
    * [.updateFile(data, params)](#FileCollection+updateFile) ⇒ <code>object</code>
    * [.download(file, versionId, filename)](#FileCollection+download)
    * [.fetchFileContentById(id)](#FileCollection+fetchFileContentById)
    * [.getBeautifulSize(file, decimal)](#FileCollection+getBeautifulSize)
    * [.isChildOf(child, parent)](#FileCollection+isChildOf) ⇒ <code>boolean</code>
    * [.statById(id, [options])](#FileCollection+statById) ⇒ <code>object</code>
    * [.createDirectoryByPath(path)](#FileCollection+createDirectoryByPath) ⇒ <code>object</code>
    * [.createFileMetadata(attributes)](#FileCollection+createFileMetadata) ⇒ <code>object</code>
    * [.updateMetadataAttribute(id, metadata)](#FileCollection+updateMetadataAttribute) ⇒ <code>object</code>
    * [.doUpload(dataArg, path, options, method)](#FileCollection+doUpload)

<a name="FileCollection+get"></a>

### fileCollection.get(id) ⇒ <code>Object</code>
Fetches the file's data

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>Object</code> - Information about the file or folder and it's descendents  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | File id |

<a name="FileCollection+find"></a>

### fileCollection.find(selector, options) ⇒ <code>Object</code>
Returns a filtered list of documents using a Mango selector.

The returned documents are paginated by the stack.

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>Object</code> - The JSON API conformant response.  
**Throws**:

- <code>FetchError</code> 


| Param | Type | Description |
| --- | --- | --- |
| selector | <code>object</code> | The Mango selector. |
| options | <code>Object</code> | The query options. |

<a name="FileCollection+findReferencedBy"></a>

### fileCollection.findReferencedBy(document, options) ⇒ <code>object</code>
async findReferencedBy - Returns the list of files referenced by a document — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>object</code> - The JSON API conformant response.  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | A JSON representing a document, with at least a `_type` and `_id` field. |
| options | <code>object</code> | Additional options |
| options.skip | <code>number</code> | For skip-based pagination, the number of referenced files to skip. |
| options.limit | <code>number</code> | For pagination, the number of results to return. |
| options.cursor | <code>object</code> | For cursor-based pagination, the index cursor. |

<a name="FileCollection+addReferencedBy"></a>

### fileCollection.addReferencedBy(document, documents) ⇒ <code>object</code>
Add referenced_by documents to a file — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/#post-filesfile-idrelationshipsreferenced_by

 For example, to have an album referenced by a file:
```
addReferencedBy({_id: 123, _type: "io.cozy.files", name: "cozy.jpg"}, [{_id: 456, _type: "io.cozy.photos.albums", name: "Happy Cloud"}])
```

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>object</code> - The JSON API conformant response.  

| Param | Type | Description |
| --- | --- | --- |
| document | [<code>FileDocument</code>](#FileDocument) | A JSON representing the file |
| documents | <code>Array</code> | An array of JSON documents having a `_type` and `_id` field. |

<a name="FileCollection+removeReferencedBy"></a>

### fileCollection.removeReferencedBy(document, documents) ⇒ <code>object</code>
Remove referenced_by documents from a file — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/#delete-filesfile-idrelationshipsreferenced_by

 For example, to remove an album reference from a file:
```
 removeReferencedBy({_id: 123, _type: "io.cozy.files", name: "cozy.jpg"}, [{_id: 456, _type: "io.cozy.photos.albums", name: "Happy Cloud"}])
```

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>object</code> - The JSON API conformant response.  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | A JSON representing the file |
| documents | <code>Array</code> | An array of JSON documents having a `_type` and `_id` field. |

<a name="FileCollection+addReferencesTo"></a>

### fileCollection.addReferencesTo(document, documents) ⇒ <code>object</code>
Add files references to a document — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/#post-datatypedoc-idrelationshipsreferences

 For example, to add a photo to an album:
```
 addReferencesTo({_id: 456, _type: "io.cozy.photos.albums", name: "Happy Cloud"}, [{_id: 123, _type: "io.cozy.files", name: "cozy.jpg"}])
```

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>object</code> - The JSON API conformant response.  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | A JSON representing a document, with at least a `_type` and `_id` field. |
| documents | <code>Array</code> | An array of JSON files having an `_id` field. |

<a name="FileCollection+removeReferencesTo"></a>

### fileCollection.removeReferencesTo(document, documents) ⇒ <code>object</code>
Remove files references to a document — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/#delete-datatypedoc-idrelationshipsreferences

 For example, to remove a photo from an album:
```
 removeReferencesTo({_id: 456, _type: "io.cozy.photos.albums", name: "Happy Cloud"}, [{_id: 123, _type: "io.cozy.files", name: "cozy.jpg"}])
```

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>object</code> - The JSON API conformant response.  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | A JSON representing a document, with at least a `_type` and `_id` field. |
| documents | <code>Array</code> | An array of JSON files having an `_id` field. |

<a name="FileCollection+destroy"></a>

### fileCollection.destroy(file) ⇒ <code>Promise</code>
Sends file to trash and removes references to it

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>Promise</code> - - Resolves when references have been removed
and file has been sent to trash  

| Param | Type | Description |
| --- | --- | --- |
| file | [<code>FileDocument</code>](#FileDocument) | File that will be sent to trash |

<a name="FileCollection+emptyTrash"></a>

### fileCollection.emptyTrash()
Empty the Trash

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
<a name="FileCollection+restore"></a>

### fileCollection.restore(id) ⇒ <code>Promise</code>
Restores a trashed file.

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>Promise</code> - - A promise that returns the restored file if resolved.  
**Throws**:

- <code>FetchError</code> 


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The file's id |

<a name="FileCollection+deleteFilePermanently"></a>

### fileCollection.deleteFilePermanently(id) ⇒ <code>object</code>
async deleteFilePermanently - Definitely delete a file

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>object</code> - The deleted file object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The id of the file to delete |

<a name="FileCollection+upload"></a>

### fileCollection.upload(data, dirPath) ⇒ <code>object</code>
**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>object</code> - Created io.cozy.files  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>File</code> \| <code>Blob</code> \| [<code>Stream</code>](#Stream) \| <code>string</code> \| <code>ArrayBuffer</code> | file to be uploaded |
| dirPath | <code>string</code> | Path to upload the file to. ie : /Administative/XXX/ |

<a name="FileCollection+create"></a>

### fileCollection.create(attributes)
Creates directory or file.
- Used by StackLink to support CozyClient.create('io.cozy.files', options)

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  

| Param | Type | Description |
| --- | --- | --- |
| attributes | [<code>FileAttributes</code>](#FileAttributes) \| [<code>DirectoryAttributes</code>](#DirectoryAttributes) | Attributes of the created file/directory |
| attributes.data | <code>File</code> \| <code>Blob</code> \| <code>string</code> \| <code>ArrayBuffer</code> | Will be used as content of the created file |

<a name="FileCollection+updateFile"></a>

### fileCollection.updateFile(data, params) ⇒ <code>object</code>
updateFile - Updates a file's data

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>object</code> - Updated document  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Javascript File object |
| params | <code>object</code> | Additional parameters |
| params.fileId | <code>string</code> | The id of the file to update (required) |
| params.executable | <code>boolean</code> | Whether the file is executable or not |
| params.metadata | <code>object</code> | Metadata to be attached to the File io.cozy.file |
| params.options | <code>object</code> | Options to pass to doUpload method (additional headers) |

<a name="FileCollection+download"></a>

### fileCollection.download(file, versionId, filename)
Download a file or a specific version of the file

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| file | <code>object</code> |  | io.cozy.files object |
| versionId | <code>string</code> | <code>null</code> | Id of the io.cozy.files.version |
| filename | <code>string</code> |  | The name you want for the downloaded file                            (by default the same as the file) |

<a name="FileCollection+fetchFileContentById"></a>

### fileCollection.fetchFileContentById(id)
Fetch the binary of a file or a specific version of a file
Useful for instance when you can't download the file directly
(via a content-disposition attachement header) and need to store
it before doing an operation.

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the io.cozy.files or io.cozy.files.version |

<a name="FileCollection+getBeautifulSize"></a>

### fileCollection.getBeautifulSize(file, decimal)
Get a beautified size for a given file
1024B => 1KB
102404500404B => 95.37 GB

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>object</code> | io.cozy.files object |
| decimal | <code>number</code> | number of decimal |

<a name="FileCollection+isChildOf"></a>

### fileCollection.isChildOf(child, parent) ⇒ <code>boolean</code>
Checks if the file belongs to the parent's hierarchy.

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>boolean</code> - Whether the file is a parent's child  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>string</code> \| <code>object</code> | The file which can either be an id or an object |
| parent | <code>string</code> \| <code>object</code> | The parent target which can either be an id or an object |

<a name="FileCollection+statById"></a>

### fileCollection.statById(id, [options]) ⇒ <code>object</code>
statById - Fetches the metadata about a document. For folders, the results include the list of child files and folders.

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>object</code> - A promise resolving to an object containing "data" (the document metadata), "included" (the child documents) and "links" (pagination informations)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | ID of the document |
| [options] | <code>object</code> | <code>{}</code> | Description |
| [options.page[limit]] | <code>number</code> |  | Max number of children documents to return |
| [options.page[skip]] | <code>number</code> |  | Number of children documents to skip from the start |
| [options.page[cursor]] | <code>string</code> |  | A cursor id for pagination |

<a name="FileCollection+createDirectoryByPath"></a>

### fileCollection.createDirectoryByPath(path) ⇒ <code>object</code>
async createDirectoryByPath - Creates one or more folders until the given path exists

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>object</code> - The document corresponding to the last segment of the path  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path of the created directory |

<a name="FileCollection+createFileMetadata"></a>

### fileCollection.createFileMetadata(attributes) ⇒ <code>object</code>
Send a metadata object that can be associated to a file uploaded after that,
via the MetadataID query parameter.
See https://github.com/cozy/cozy-stack/blob/master/docs/files.md#post-filesuploadmetadata

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>object</code> - The Metadata object  

| Param | Type | Description |
| --- | --- | --- |
| attributes | <code>object</code> | The file's metadata |

<a name="FileCollection+updateMetadataAttribute"></a>

### fileCollection.updateMetadataAttribute(id, metadata) ⇒ <code>object</code>
Updates the metadata attribute of a io.cozy.files
Creates a new version of the file without having
to upload again the file's content

To see available content of the metadata attribute
see : https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.files_metadata/

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>object</code> - io.cozy.files updated  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | File id |
| metadata | <code>object</code> | io.cozy.files.metadata attributes |

<a name="FileCollection+doUpload"></a>

### fileCollection.doUpload(dataArg, path, options, method)
This method should not be called directly to upload a file.
You should use `createFile`

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataArg | <code>File</code> \| <code>Blob</code> \| [<code>Stream</code>](#Stream) \| <code>string</code> \| <code>ArrayBuffer</code> |  | file to be uploaded |
| path | <code>string</code> |  | Uri to call the stack from. Something like `/files/${dirId}?Name=${name}&Type=file&Executable=${executable}&MetadataID=${metadataId}` |
| options | <code>object</code> |  | Additional headers |
| method | <code>string</code> | <code>&quot;POST&quot;</code> | POST / PUT / PATCH |

<a name="NotesCollection"></a>

## NotesCollection
Implements `DocumentCollection` API to interact with the /notes endpoint of the stack

**Kind**: global class  

* [NotesCollection](#NotesCollection)
    * [.all()](#NotesCollection+all) ⇒ <code>Object</code>
    * [.destroy(note)](#NotesCollection+destroy) ⇒ <code>Object</code>
    * [.create(option)](#NotesCollection+create) ⇒ <code>Object</code>
    * [.fetchURL(note)](#NotesCollection+fetchURL) ⇒ <code>Object</code>
    * [.getDefaultSchema()](#NotesCollection+getDefaultSchema) ⇒ <code>object</code>

<a name="NotesCollection+all"></a>

### notesCollection.all() ⇒ <code>Object</code>
Fetches all notes

**Kind**: instance method of [<code>NotesCollection</code>](#NotesCollection)  
**Returns**: <code>Object</code> - The JSON API conformant response.  
<a name="NotesCollection+destroy"></a>

### notesCollection.destroy(note) ⇒ <code>Object</code>
Destroys the note on the server

**Kind**: instance method of [<code>NotesCollection</code>](#NotesCollection)  
**Returns**: <code>Object</code> - The deleted note  

| Param | Type | Description |
| --- | --- | --- |
| note | <code>io.cozy.notes</code> | The note document to destroy |
| note._id | <code>string</code> | The note's id |

<a name="NotesCollection+create"></a>

### notesCollection.create(option) ⇒ <code>Object</code>
Create a note

**Kind**: instance method of [<code>NotesCollection</code>](#NotesCollection)  
**Returns**: <code>Object</code> - The JSON API conformant response.  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>object</code> |  |
| option.dir_id | <code>string</code> | dir_id where to create the note |

<a name="NotesCollection+fetchURL"></a>

### notesCollection.fetchURL(note) ⇒ <code>Object</code>
Returns the details to build the note's url

**Kind**: instance method of [<code>NotesCollection</code>](#NotesCollection)  
**Returns**: <code>Object</code> - The note's url details  
**See**: https://github.com/cozy/cozy-stack/blob/master/docs/notes.md#get-notesidopen  

| Param | Type | Description |
| --- | --- | --- |
| note | <code>io.cozy.notes</code> | The note document to open |
| note._id | <code>string</code> | The note's id |

<a name="NotesCollection+getDefaultSchema"></a>

### notesCollection.getDefaultSchema() ⇒ <code>object</code>
Returns promise mirror schema for a note

**Kind**: instance method of [<code>NotesCollection</code>](#NotesCollection)  
**Returns**: <code>object</code> - schema  
<a name="OAuthClient"></a>

## OAuthClient
Specialized `CozyStackClient` for mobile, implementing stack registration
through OAuth.

**Kind**: global class  

* [OAuthClient](#OAuthClient)
    * [.doRegistration()](#OAuthClient+doRegistration)
    * [.register()](#OAuthClient+register) ⇒ <code>Promise</code>
    * [.unregister()](#OAuthClient+unregister) ⇒ <code>Promise</code>
    * [.fetchInformation()](#OAuthClient+fetchInformation) ⇒ <code>Promise</code>
    * [.updateInformation(information, resetSecret)](#OAuthClient+updateInformation) ⇒ <code>Promise</code>
    * [.generateStateCode()](#OAuthClient+generateStateCode) ⇒ <code>string</code>
    * [.getAuthCodeURL(stateCode, scopes)](#OAuthClient+getAuthCodeURL) ⇒ <code>string</code>
    * [.getAccessCodeFromURL(pageURL, stateCode)](#OAuthClient+getAccessCodeFromURL) ⇒ <code>string</code>
    * [.fetchAccessToken(accessCode, oauthOptionsArg, uri)](#OAuthClient+fetchAccessToken) ⇒ <code>Promise</code>
    * [.refreshToken()](#OAuthClient+refreshToken) ⇒ <code>Promise</code>
    * [.setToken(token)](#OAuthClient+setToken)
    * [.setOAuthOptions(options)](#OAuthClient+setOAuthOptions)
    * [.resetClient()](#OAuthClient+resetClient)

<a name="OAuthClient+doRegistration"></a>

### oAuthClient.doRegistration()
Performs the HTTP call to register the client to the server

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
<a name="OAuthClient+register"></a>

### oAuthClient.register() ⇒ <code>Promise</code>
Registers the currenly configured client with the OAuth server and
sets internal information from the server response

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
**Returns**: <code>Promise</code> - A promise that resolves with a complete list of client information, including client ID and client secret.  
**Throws**:

- <code>Error</code> When the client is already registered

<a name="OAuthClient+unregister"></a>

### oAuthClient.unregister() ⇒ <code>Promise</code>
Unregisters the currenly configured client with the OAuth server.

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
**Throws**:

- <code>NotRegisteredException</code> When the client doesn't have it's registration information

<a name="OAuthClient+fetchInformation"></a>

### oAuthClient.fetchInformation() ⇒ <code>Promise</code>
Fetches the complete set of client information from the server after it has been registered.

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
**Throws**:

- <code>NotRegisteredException</code> When the client doesn't have it's registration information

<a name="OAuthClient+updateInformation"></a>

### oAuthClient.updateInformation(information, resetSecret) ⇒ <code>Promise</code>
Overwrites the client own information. This method will update both the local information and the remote information on the OAuth server.

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
**Returns**: <code>Promise</code> - Resolves to a complete, updated list of client information  
**Throws**:

- <code>NotRegisteredException</code> When the client doesn't have it's registration information


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| information | <code>object</code> |  | Set of information to update. Note that some fields such as `clientID` can't be updated. |
| resetSecret | <code>boolean</code> | <code>false</code> | = false Optionnal, whether to reset the client secret or not |

<a name="OAuthClient+generateStateCode"></a>

### oAuthClient.generateStateCode() ⇒ <code>string</code>
Generates a random state code to be used during the OAuth process

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
<a name="OAuthClient+getAuthCodeURL"></a>

### oAuthClient.getAuthCodeURL(stateCode, scopes) ⇒ <code>string</code>
Generates the URL that the user should be sent to in order to accept the app's permissions.

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
**Returns**: <code>string</code> - The URL  
**Throws**:

- <code>NotRegisteredException</code> When the client doesn't have it's registration information


| Param | Type | Description |
| --- | --- | --- |
| stateCode | <code>string</code> | A random code to be included in the URl for security. Can be generated with `client.generateStateCode()` |
| scopes | <code>Array</code> | = [] An array of permission scopes for the token. |

<a name="OAuthClient+getAccessCodeFromURL"></a>

### oAuthClient.getAccessCodeFromURL(pageURL, stateCode) ⇒ <code>string</code>
Retrieves the access code contained in the URL to which the user is redirected after accepting the app's permissions (the `redirectURI`).

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
**Returns**: <code>string</code> - The access code  
**Throws**:

- <code>Error</code> The URL should contain the same state code as the one generated with `client.getAuthCodeURL()`. If not, it will throw an error


| Param | Type | Description |
| --- | --- | --- |
| pageURL | <code>string</code> | The redirected page URL, containing the state code and the access code |
| stateCode | <code>string</code> | The state code that was contained in the original URL the user was sent to (see `client.getAuthCodeURL()`) |

<a name="OAuthClient+fetchAccessToken"></a>

### oAuthClient.fetchAccessToken(accessCode, oauthOptionsArg, uri) ⇒ <code>Promise</code>
Exchanges an access code for an access token. This function does **not** update the client's token.

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
**Returns**: <code>Promise</code> - A promise that resolves with an AccessToken object.  
**Throws**:

- <code>NotRegisteredException</code> When the client doesn't have it's registration information


| Param | Type | Description |
| --- | --- | --- |
| accessCode | <code>string</code> | The access code contained in the redirection URL — see `client.getAccessCodeFromURL()` |
| oauthOptionsArg | <code>object</code> | — To use when OAuthClient is not yet registered (during login process) |
| uri | <code>string</code> | — To use when OAuthClient is not yet registered (during login process) |

<a name="OAuthClient+refreshToken"></a>

### oAuthClient.refreshToken() ⇒ <code>Promise</code>
Retrieves a new access token by refreshing the currently used token.

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
**Returns**: <code>Promise</code> - A promise that resolves with a new AccessToken object  
**Throws**:

- <code>NotRegisteredException</code> When the client doesn't have it's registration information
- <code>Error</code> The client should already have an access token to use this function

<a name="OAuthClient+setToken"></a>

### oAuthClient.setToken(token)
Updates the client's stored token

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | = null The new token to use — can be a string, a json object or an AccessToken instance. |

<a name="OAuthClient+setOAuthOptions"></a>

### oAuthClient.setOAuthOptions(options)
Updates the OAuth informations

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Map of OAuth options |

<a name="OAuthClient+resetClient"></a>

### oAuthClient.resetClient()
Reset the current OAuth client

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
<a name="PermissionCollection"></a>

## PermissionCollection
Implements `DocumentCollection` API along with specific methods for `io.cozy.permissions`.

**Kind**: global class  

* [PermissionCollection](#PermissionCollection)
    * [.create(permission)](#PermissionCollection+create)
    * [.add(document, permission)](#PermissionCollection+add) ⇒ <code>Promise</code>
    * [.createSharingLink(document, options)](#PermissionCollection+createSharingLink)
    * [.fetchPermissionsByLink(permissions)](#PermissionCollection+fetchPermissionsByLink)
    * [.fetchAllLinks(document)](#PermissionCollection+fetchAllLinks) ⇒ <code>object</code>
    * [.revokeSharingLink(document)](#PermissionCollection+revokeSharingLink)

<a name="PermissionCollection+create"></a>

### permissionCollection.create(permission)
Create a new set of permissions
It can also associates one or more codes to it, via the codes parameter

**Kind**: instance method of [<code>PermissionCollection</code>](#PermissionCollection)  
**See**: https://docs.cozy.io/en/cozy-stack/permissions/#post-permissions  

| Param | Type | Description |
| --- | --- | --- |
| permission | <code>object</code> |  |
| permission.codes | <code>string</code> | A comma separed list of values (defaulted to code) |
| permission.ttl | <code>string</code> | Make the codes expire after a delay (bigduration format) bigduration format: https://github.com/justincampbell/bigduration/blob/master/README.md |

<a name="PermissionCollection+add"></a>

### permissionCollection.add(document, permission) ⇒ <code>Promise</code>
Adds a permission to the given document. Document type must be
`io.cozy.apps`, `io.cozy.konnectors` or `io.cozy.permissions`

**Kind**: instance method of [<code>PermissionCollection</code>](#PermissionCollection)  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | Document which receives the permission |
| permission | <code>object</code> | Describes the permission |

**Example**  
```
const permissions = await client
  .collection('io.cozy.permissions')
  .add(konnector, {
    folder: {
      type: 'io.cozy.files',
      verbs: ['GET', 'PUT'],
      values: [`io.cozy.files.bc57b60eb2954537b0dcdc6ebd8e9d23`]
    }
 })
```
<a name="PermissionCollection+createSharingLink"></a>

### permissionCollection.createSharingLink(document, options)
Create a share link

**Kind**: instance method of [<code>PermissionCollection</code>](#PermissionCollection)  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>Object</code> | cozy document |
| options | <code>object</code> | options |
| options.verbs | <code>Array.&lt;string&gt;</code> | explicit permissions to use |

<a name="PermissionCollection+fetchPermissionsByLink"></a>

### permissionCollection.fetchPermissionsByLink(permissions)
Follow the next link to fetch the next permissions

**Kind**: instance method of [<code>PermissionCollection</code>](#PermissionCollection)  

| Param | Type | Description |
| --- | --- | --- |
| permissions | <code>object</code> | JSON-API based permissions document |

<a name="PermissionCollection+fetchAllLinks"></a>

### permissionCollection.fetchAllLinks(document) ⇒ <code>object</code>
**Kind**: instance method of [<code>PermissionCollection</code>](#PermissionCollection)  
**Returns**: <code>object</code> - with all the permissions  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | Cozy doc |

<a name="PermissionCollection+revokeSharingLink"></a>

### permissionCollection.revokeSharingLink(document)
Destroy a sharing link and the related permissions

**Kind**: instance method of [<code>PermissionCollection</code>](#PermissionCollection)  

| Param | Type |
| --- | --- |
| document | <code>object</code> | 

<a name="SettingsCollection"></a>

## SettingsCollection
Implements `DocumentCollection` API to interact with the /settings endpoint of the stack

**Kind**: global class  
<a name="SettingsCollection+get"></a>

### settingsCollection.get(path) ⇒ <code>object</code>
async get - Calls a route on the /settings API

**Kind**: instance method of [<code>SettingsCollection</code>](#SettingsCollection)  
**Returns**: <code>object</code> - The response from the route  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | The setting route to call, eg `instance` or `context` |

<a name="SharingCollection"></a>

## SharingCollection
Implements the `DocumentCollection` API along with specific methods for
`io.cozy.sharings`.

**Kind**: global class  

* [SharingCollection](#SharingCollection)
    * [.get(id)](#SharingCollection+get) ⇒ [<code>Sharing</code>](#Sharing)
    * [.create(params)](#SharingCollection+create)
    * ~~[.share(document, recipients, sharingType, description, [previewPath])](#SharingCollection+share)~~
    * [.getDiscoveryLink(sharingId, sharecode)](#SharingCollection+getDiscoveryLink) ⇒ <code>string</code>
    * [.addRecipients(options)](#SharingCollection+addRecipients)
    * [.revokeRecipient(sharing, recipientIndex)](#SharingCollection+revokeRecipient)
    * [.revokeSelf(sharing)](#SharingCollection+revokeSelf)
    * [.revokeAllRecipients(sharing)](#SharingCollection+revokeAllRecipients)

<a name="SharingCollection+get"></a>

### sharingCollection.get(id) ⇒ [<code>Sharing</code>](#Sharing)
**Kind**: instance method of [<code>SharingCollection</code>](#SharingCollection)  
**Returns**: [<code>Sharing</code>](#Sharing) - sharing  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Sharing's id |

<a name="SharingCollection+create"></a>

### sharingCollection.create(params)
Creates a new Sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#post-sharings

**Kind**: instance method of [<code>SharingCollection</code>](#SharingCollection)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Sharing  params |
| params.document | [<code>Sharing</code>](#Sharing) | The document to share |
| params.description | <code>string</code> | Description of the sharing |
| [params.previewPath] | <code>string</code> | The preview path |
| [params.rules] | [<code>Array.&lt;Rule&gt;</code>](#Rule) | The rules defined to the sharing. See https://docs.cozy.io/en/cozy-stack/sharing-design/#description-of-a-sharing |
| [params.recipients] | [<code>Array.&lt;Recipient&gt;</code>](#Recipient) | Recipients to add to the sharings (will have the same permissions given by the rules defined by the sharing ) |
| [params.readOnlyRecipients] | [<code>Array.&lt;Recipient&gt;</code>](#Recipient) | Recipients to add to the sharings with only read only access |
| [params.openSharing] | <code>boolean</code> | If someone else than the owner can add a recipient to the sharing |

<a name="SharingCollection+share"></a>

### ~~sharingCollection.share(document, recipients, sharingType, description, [previewPath])~~
***Deprecated***

**Kind**: instance method of [<code>SharingCollection</code>](#SharingCollection)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| document | [<code>Sharing</code>](#Sharing) |  | The document to share. Should have and _id and a name. |
| recipients | <code>Array</code> |  | A list of io.cozy.contacts |
| sharingType | <code>string</code> |  | If "two-way", will set the open_sharing attribute to true |
| description | <code>string</code> |  | Describes the sharing |
| [previewPath] | <code>string</code> | <code>null</code> | Relative URL of the sharings preview page |

<a name="SharingCollection+getDiscoveryLink"></a>

### sharingCollection.getDiscoveryLink(sharingId, sharecode) ⇒ <code>string</code>
getDiscoveryLink - Returns the URL of the page that can be used to accept a sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#get-sharingssharing-iddiscovery

**Kind**: instance method of [<code>SharingCollection</code>](#SharingCollection)  

| Param | Type | Description |
| --- | --- | --- |
| sharingId | <code>string</code> | Id of the sharing |
| sharecode | <code>string</code> | Code of the sharing |

<a name="SharingCollection+addRecipients"></a>

### sharingCollection.addRecipients(options)
Add an array of contacts to the Sharing

**Kind**: instance method of [<code>SharingCollection</code>](#SharingCollection)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Object |
| options.document | [<code>Sharing</code>](#Sharing) | Sharing Object |
| [options.recipients] | [<code>Array.&lt;Recipient&gt;</code>](#Recipient) | Recipients to add to the sharing |
| [options.readOnlyRecipients] | [<code>Array.&lt;Recipient&gt;</code>](#Recipient) | Recipients to add to the sharings with only read only access |

<a name="SharingCollection+revokeRecipient"></a>

### sharingCollection.revokeRecipient(sharing, recipientIndex)
Revoke only one recipient of the sharing.

**Kind**: instance method of [<code>SharingCollection</code>](#SharingCollection)  

| Param | Type | Description |
| --- | --- | --- |
| sharing | <code>object</code> | Sharing Object |
| recipientIndex | <code>number</code> | Index of this recipient in the members array of the sharing |

<a name="SharingCollection+revokeSelf"></a>

### sharingCollection.revokeSelf(sharing)
Remove self from the sharing.

**Kind**: instance method of [<code>SharingCollection</code>](#SharingCollection)  

| Param | Type | Description |
| --- | --- | --- |
| sharing | <code>object</code> | Sharing Object |

<a name="SharingCollection+revokeAllRecipients"></a>

### sharingCollection.revokeAllRecipients(sharing)
Revoke the sharing for all the members. Must be called
from the owner's cozy

**Kind**: instance method of [<code>SharingCollection</code>](#SharingCollection)  

| Param | Type | Description |
| --- | --- | --- |
| sharing | <code>object</code> | Sharing Objects |

<a name="TriggerCollection"></a>

## TriggerCollection
Implements `DocumentCollection` API along with specific methods for `io.cozy.triggers`.

**Kind**: global class  

* [TriggerCollection](#TriggerCollection)
    * [.all(options)](#TriggerCollection+all) ⇒ <code>Object</code>
    * [.create(attributes)](#TriggerCollection+create) ⇒ <code>object</code>
    * [.destroy(document)](#TriggerCollection+destroy) ⇒ <code>object</code>
    * [.find(selector, options)](#TriggerCollection+find) ⇒ <code>Object</code>
    * [.launch(trigger)](#TriggerCollection+launch) ⇒ <code>object</code>

<a name="TriggerCollection+all"></a>

### triggerCollection.all(options) ⇒ <code>Object</code>
Get the list of triggers.

**Kind**: instance method of [<code>TriggerCollection</code>](#TriggerCollection)  
**Returns**: <code>Object</code> - The JSON API conformant response.  
**Throws**:

- <code>FetchError</code> 

**See**: https://docs.cozy.io/en/cozy-stack/jobs/#get-jobstriggers  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The fetch options: Worker allow to filter only triggers associated with a specific worker. |

<a name="TriggerCollection+create"></a>

### triggerCollection.create(attributes) ⇒ <code>object</code>
Creates a Trigger document

**Kind**: instance method of [<code>TriggerCollection</code>](#TriggerCollection)  
**Returns**: <code>object</code> - Stack response, containing trigger document under `data` attribute.  
**See**: https://docs.cozy.io/en/cozy-stack/jobs/#post-jobstriggers  

| Param | Type | Description |
| --- | --- | --- |
| attributes | <code>object</code> | Trigger's attributes |

<a name="TriggerCollection+destroy"></a>

### triggerCollection.destroy(document) ⇒ <code>object</code>
Deletes a trigger

**Kind**: instance method of [<code>TriggerCollection</code>](#TriggerCollection)  
**Returns**: <code>object</code> - The deleted document  
**See**: https://docs.cozy.io/en/cozy-stack/jobs/#delete-jobstriggerstrigger-id  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | The trigger to delete — must have an _id field |

<a name="TriggerCollection+find"></a>

### triggerCollection.find(selector, options) ⇒ <code>Object</code>
Be warned, ATM /jobs/triggers does not return the same informations
than /data/io.cozy.triggers (used by the super.find method).

See https://github.com/cozy/cozy-stack/pull/2010

**Kind**: instance method of [<code>TriggerCollection</code>](#TriggerCollection)  
**Returns**: <code>Object</code> - The JSON API conformant response.  
**Throws**:

- <code>FetchError</code> 


| Param | Type | Description |
| --- | --- | --- |
| selector | <code>object</code> | Which kind of worker {konnector,service} |
| options | <code>object</code> | Options |

<a name="TriggerCollection+launch"></a>

### triggerCollection.launch(trigger) ⇒ <code>object</code>
Force given trigger execution.

**Kind**: instance method of [<code>TriggerCollection</code>](#TriggerCollection)  
**Returns**: <code>object</code> - Stack response, containing job launched by trigger, under `data` attribute.  
**See**: https://docs.cozy.io/en/cozy-stack/jobs/#post-jobstriggerstrigger-idlaunch  

| Param | Type | Description |
| --- | --- | --- |
| trigger | <code>object</code> | Trigger to launch |

<a name="dontThrowNotFoundError"></a>

## dontThrowNotFoundError ⇒ <code>object</code>
Handler for error response which return a empty value for "not found" error

**Kind**: global constant  
**Returns**: <code>object</code> - JsonAPI response with empty data in case of "not
found" error.  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> |  |
| data | <code>Array</code> \| <code>object</code> | Data to return in case of "not found" error |

<a name="getPermissionsFor"></a>

## getPermissionsFor ⇒ <code>object</code>
Build a permission set

**Kind**: global constant  
**Returns**: <code>object</code> - permissions object that can be sent through /permissions/*  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>Object</code> | cozy document |
| publicLink | <code>boolean</code> | are the permissions for a public link ? |
| options | <code>object</code> | options |
| options.verbs | <code>Array.&lt;string&gt;</code> | explicit permissions to use |

<a name="getAccessToken"></a>

## getAccessToken() ⇒ <code>string</code>
Get the access token string

**Kind**: global function  
**Returns**: <code>string</code> - token  
**See**: CozyStackClient.getAccessToken  
<a name="getAccessToken"></a>

## getAccessToken() ⇒ <code>string</code>
Get the app token string

**Kind**: global function  
**Returns**: <code>string</code> - token  
**See**: CozyStackClient.getAccessToken  
<a name="garbageCollect"></a>

## garbageCollect()
Delete outdated results from cache

**Kind**: global function  
<a name="memoize"></a>

## memoize()
Memoize with maxDuration and custom key

**Kind**: global function  
<a name="getCozyURL"></a>

## getCozyURL()
Get a uniform formatted URL and SSL information according to a provided URL

**Kind**: global function  
<a name="DirectoryAttributes"></a>

## DirectoryAttributes : <code>object</code>
Attributes used for directory creation

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dirId | <code>string</code> | Id of the parent directory. |
| name | <code>boolean</code> | Name of the created directory. |
| executable | <code>boolean</code> | Indicates whether the file will be executable. |

<a name="FileAttributes"></a>

## FileAttributes : <code>object</code>
Attributes used for file creation

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dirId | <code>string</code> | Id of the parent directory. |
| name | <code>string</code> | Name of the created file. |
| lastModifiedDate | <code>Date</code> | Can be used to set the last modified date of a file. |
| metadata | <code>object</code> | io.cozy.files.metadata to attach to the file |

<a name="FileDocument"></a>

## FileDocument : <code>object</code>
Document representing a io.cozy.files

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _id | <code>string</code> | Id of the file |

<a name="Stream"></a>

## Stream : <code>object</code>
Stream is not defined in a browser, but is on NodeJS environment

**Kind**: global typedef  
<a name="Permission"></a>

## Permission ⇒ [<code>Permission</code>](#Permission)
async getOwnPermissions - Gets the permission for the current token

**Kind**: global typedef  
**Returns**: [<code>Permission</code>](#Permission) - permission  
<a name="Rule"></a>

## Rule : <code>object</code>
A sharing rule

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| title | <code>string</code> | 
| doctype | <code>string</code> | 
| values | <code>Array</code> | 
| [add] | <code>string</code> | 
| [update] | <code>string</code> | 
| [remove] | <code>string</code> | 

<a name="Recipient"></a>

## Recipient : <code>object</code>
An io.cozy.contact

**Kind**: global typedef  
<a name="Sharing"></a>

## Sharing : <code>object</code>
An io.cozy.sharings document

**Kind**: global typedef  
