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
| stackClient | <code>object</code> |  |
| endpoint | <code>string</code> | Stack endpoint |
| options | <code>object</code> |  |
| options.normalize | <code>Func</code> | Callback to normalize response data (default `data => data`) |
| options.method | <code>string</code> | HTTP method (default `GET`) |

<a name="CozyStackClient"></a>

## CozyStackClient
Main API against the `cozy-stack` server.

**Kind**: global class  

* [CozyStackClient](#CozyStackClient)
    * [.collection(doctype)](#CozyStackClient+collection) ⇒ [<code>DocumentCollection</code>](#DocumentCollection)
    * [.fetch(method, path, body, options)](#CozyStackClient+fetch) ⇒ <code>object</code>
    * [.checkForRevocation()](#CozyStackClient+checkForRevocation)
    * [.refreshToken()](#CozyStackClient+refreshToken) ⇒ <code>Promise</code>
    * [.fetchJSON(method, path, body, options)](#CozyStackClient+fetchJSON) ⇒ <code>object</code>
    * [.getAccessToken()](#CozyStackClient+getAccessToken) ⇒ <code>string</code>

<a name="CozyStackClient+collection"></a>

### cozyStackClient.collection(doctype) ⇒ [<code>DocumentCollection</code>](#DocumentCollection)
Creates a [DocumentCollection](#DocumentCollection) instance.

**Kind**: instance method of [<code>CozyStackClient</code>](#CozyStackClient)  

| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | The collection doctype. |

<a name="CozyStackClient+fetch"></a>

### cozyStackClient.fetch(method, path, body, options) ⇒ <code>object</code>
Fetches an endpoint in an authorized way.

**Kind**: instance method of [<code>CozyStackClient</code>](#CozyStackClient)  
**Throws**:

- <code>FetchError</code> 


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | The HTTP method. |
| path | <code>string</code> | The URI. |
| body | <code>object</code> | The payload. |
| options | <code>object</code> |  |

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
| options | <code>object</code> |  |

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
    * [.get()](#DocumentCollection+get)
    * [.getAll()](#DocumentCollection+getAll)
    * [.update()](#DocumentCollection+update)
    * [.destroy()](#DocumentCollection+destroy)
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

### documentCollection.get()
Get a document by id

**Kind**: instance method of [<code>DocumentCollection</code>](#DocumentCollection)  
<a name="DocumentCollection+getAll"></a>

### documentCollection.getAll()
Get many documents by id

**Kind**: instance method of [<code>DocumentCollection</code>](#DocumentCollection)  
<a name="DocumentCollection+update"></a>

### documentCollection.update()
Updates a document

**Kind**: instance method of [<code>DocumentCollection</code>](#DocumentCollection)  
<a name="DocumentCollection+destroy"></a>

### documentCollection.destroy()
Destroys a document

**Kind**: instance method of [<code>DocumentCollection</code>](#DocumentCollection)  
<a name="DocumentCollection+updateAll"></a>

### documentCollection.updateAll(docs)
Updates several documents in one batch

**Kind**: instance method of [<code>DocumentCollection</code>](#DocumentCollection)  

| Param | Type |
| --- | --- |
| docs | <code>Array.&lt;Document&gt;</code> | 

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
    * [.restore(id)](#FileCollection+restore) ⇒ <code>Promise</code>
    * [.deleteFilePermanently(id)](#FileCollection+deleteFilePermanently) ⇒ <code>object</code>
    * [.upload(data, dirPath)](#FileCollection+upload) ⇒ <code>object</code>
    * [.createFile(data, params)](#FileCollection+createFile)
    * [.updateFile(data, params)](#FileCollection+updateFile) ⇒ <code>object</code>
    * [.download(file, versionId, filename)](#FileCollection+download)
    * [.fetchFileContent(id)](#FileCollection+fetchFileContent)
    * [.getBeautifulSize(file, decimal)](#FileCollection+getBeautifulSize)
    * [.isChildOf(child, parent)](#FileCollection+isChildOf) ⇒ <code>boolean</code>
    * [.createDirectoryByPath(path)](#FileCollection+createDirectoryByPath) ⇒ <code>object</code>
    * [.updateAttributes(id, attributes)](#FileCollection+updateAttributes) ⇒ <code>object</code>
    * [.createFileMetadata(attributes)](#FileCollection+createFileMetadata) ⇒ <code>object</code>
    * [.updateMetadataAttribute(id, metadata)](#FileCollection+updateMetadataAttribute) ⇒ <code>object</code>
    * [.doUpload(data, path, options, method)](#FileCollection+doUpload)

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
| document | <code>object</code> | A JSON representing the file |
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
| data | <code>File</code> \| <code>Blob</code> \| <code>Stream</code> \| <code>string</code> \| <code>ArrayBuffer</code> | file to be uploaded |
| dirPath | <code>string</code> | Path to upload the file to. ie : /Administative/XXX/ |

<a name="FileCollection+createFile"></a>

### fileCollection.createFile(data, params)
**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>File</code> \| <code>Blob</code> \| <code>Stream</code> \| <code>string</code> \| <code>ArrayBuffer</code> | file to be uploaded |
| params | <code>object</code> | Additionnal parameters |
| params.name | <code>string</code> | Name of the file |
| params.dirId | <code>string</code> | Id of the directory you want to upload the file to |
| params.executable | <code>boolean</code> | If the file is an executable or not |
| params.metadata | <code>object</code> | io.cozy.files.metadata to attach to the file |
| params.options | <code>object</code> | Options to pass to doUpload method (additional headers) |

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

<a name="FileCollection+fetchFileContent"></a>

### fileCollection.fetchFileContent(id)
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
| decimal | <code>int</code> | number of decimal |

<a name="FileCollection+isChildOf"></a>

### fileCollection.isChildOf(child, parent) ⇒ <code>boolean</code>
Checks if the file belongs to the parent's hierarchy.

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>boolean</code> - Whether the file is a parent's child  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>string</code> \| <code>object</code> | The file which can either be an id or an object |
| parent | <code>string</code> \| <code>object</code> | The parent target which can either be an id or an object |

<a name="FileCollection+createDirectoryByPath"></a>

### fileCollection.createDirectoryByPath(path) ⇒ <code>object</code>
async createDirectoryByPath - Creates one or more folders until the given path exists

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>object</code> - The document corresponding to the last segment of the path  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 

<a name="FileCollection+updateAttributes"></a>

### fileCollection.updateAttributes(id, attributes) ⇒ <code>object</code>
async updateAttributes - Updates a file / folder's attributes except
the metadata attribute. If you want to update its metadata attribute,
then use `updateFileMetadataAttribute` since `metadata` is a specific
doctype.

For instance, if you want to update the name of a file, you can pass
attributes = { name: 'newName'}

You can see the attributes for both Folder and File (as they share the
same doctype they have a few in common) here :
https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.files/#iocozyfiles

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  
**Returns**: <code>object</code> - Updated document  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | File id |
| attributes | <code>object</code> | New file attributes |

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

### fileCollection.doUpload(data, path, options, method)
This method should not be called directly to upload a file.
You should use `createFile`

**Kind**: instance method of [<code>FileCollection</code>](#FileCollection)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>File</code> \| <code>Blob</code> \| <code>Stream</code> \| <code>string</code> \| <code>ArrayBuffer</code> |  | file to be uploaded |
| path | <code>string</code> |  | Uri to call the stack from. Something like `/files/${dirId}?Name=${name}&Type=file&Executable=${executable}&MetadataID=${metadataId}` |
| options | <code>object</code> |  | Additional headers |
| method | <code>string</code> | <code>&quot;POST&quot;</code> | POST / PUT / PATCH |

<a name="OAuthClient"></a>

## OAuthClient
Specialized `CozyStackClient` for mobile, implementing stack registration
through OAuth.

**Kind**: global class  

* [OAuthClient](#OAuthClient)
    * [.register()](#OAuthClient+register) ⇒ <code>promise</code>
    * [.unregister()](#OAuthClient+unregister) ⇒ <code>promise</code>
    * [.fetchInformation()](#OAuthClient+fetchInformation) ⇒ <code>promise</code>
    * [.updateInformation(information, resetSecret)](#OAuthClient+updateInformation) ⇒ <code>promise</code>
    * [.generateStateCode()](#OAuthClient+generateStateCode) ⇒ <code>string</code>
    * [.getAuthCodeURL(stateCode, scopes)](#OAuthClient+getAuthCodeURL) ⇒ <code>string</code>
    * [.getAccessCodeFromURL(pageURL, stateCode)](#OAuthClient+getAccessCodeFromURL) ⇒ <code>string</code>
    * [.fetchAccessToken(accessCode, oauthOptions, uri)](#OAuthClient+fetchAccessToken) ⇒ <code>Promise</code>
    * [.refreshToken()](#OAuthClient+refreshToken) ⇒ <code>Promise</code>
    * [.setToken(token)](#OAuthClient+setToken)
    * [.setOAuthOptions(options)](#OAuthClient+setOAuthOptions)
    * [.resetClient()](#OAuthClient+resetClient)

<a name="OAuthClient+register"></a>

### oAuthClient.register() ⇒ <code>promise</code>
Registers the currenly configured client with the OAuth server.

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
**Returns**: <code>promise</code> - A promise that resolves with a complete list of client information, including client ID and client secret.  
**Throws**:

- <code>Error</code> When the client is already registered

<a name="OAuthClient+unregister"></a>

### oAuthClient.unregister() ⇒ <code>promise</code>
Unregisters the currenly configured client with the OAuth server.

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
**Throws**:

- <code>NotRegisteredException</code> When the client doesn't have it's registration information

<a name="OAuthClient+fetchInformation"></a>

### oAuthClient.fetchInformation() ⇒ <code>promise</code>
Fetches the complete set of client information from the server after it has been registered.

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
**Throws**:

- <code>NotRegisteredException</code> When the client doesn't have it's registration information

<a name="OAuthClient+updateInformation"></a>

### oAuthClient.updateInformation(information, resetSecret) ⇒ <code>promise</code>
Overwrites the client own information. This method will update both the local information and the remote information on the OAuth server.

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
**Returns**: <code>promise</code> - A promise that resolves to a complete, updated list of client information  
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

### oAuthClient.fetchAccessToken(accessCode, oauthOptions, uri) ⇒ <code>Promise</code>
Exchanges an access code for an access token. This function does **not** update the client's token.

**Kind**: instance method of [<code>OAuthClient</code>](#OAuthClient)  
**Returns**: <code>Promise</code> - A promise that resolves with an AccessToken object.  
**Throws**:

- <code>NotRegisteredException</code> When the client doesn't have it's registration information


| Param | Type | Description |
| --- | --- | --- |
| accessCode | <code>string</code> | The access code contained in the redirection URL — see `client.getAccessCodeFromURL()` |
| oauthOptions | <code>object</code> | — To use when OAuthClient is not yet registered (during login process) |
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
    * [.add(document, permission)](#PermissionCollection+add) ⇒ <code>Promise</code>
    * [.getOwnPermissions()](#PermissionCollection+getOwnPermissions) ⇒ <code>object</code>

<a name="PermissionCollection+add"></a>

### permissionCollection.add(document, permission) ⇒ <code>Promise</code>
Adds a permission to the given document. Document type must be
`io.cozy.apps`, `io.cozy.konnectors` or `io.cozy.permissions`

**Kind**: instance method of [<code>PermissionCollection</code>](#PermissionCollection)  

| Param | Type |
| --- | --- |
| document | <code>object</code> | 
| permission | <code>object</code> | 

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
<a name="PermissionCollection+getOwnPermissions"></a>

### permissionCollection.getOwnPermissions() ⇒ <code>object</code>
async getOwnPermissions - Gets the permission for the current token

**Kind**: instance method of [<code>PermissionCollection</code>](#PermissionCollection)  
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
    * [.share(document, recipients, sharingType, description, [previewPath])](#SharingCollection+share)
    * [.getDiscoveryLink(sharingId, sharecode)](#SharingCollection+getDiscoveryLink) ⇒ <code>string</code>

<a name="SharingCollection+share"></a>

### sharingCollection.share(document, recipients, sharingType, description, [previewPath])
share - Creates a new sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#post-sharings

**Kind**: instance method of [<code>SharingCollection</code>](#SharingCollection)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| document | <code>object</code> |  | The document to share. Should have and _id and a name. |
| recipients | <code>Array</code> |  | A list of io.cozy.contacts |
| sharingType | <code>string</code> |  |  |
| description | <code>string</code> |  |  |
| [previewPath] | <code>string</code> | <code>null</code> | Relative URL of the sharings preview page |

<a name="SharingCollection+getDiscoveryLink"></a>

### sharingCollection.getDiscoveryLink(sharingId, sharecode) ⇒ <code>string</code>
getDiscoveryLink - Returns the URL of the page that can be used to accept a sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#get-sharingssharing-iddiscovery

**Kind**: instance method of [<code>SharingCollection</code>](#SharingCollection)  

| Param | Type |
| --- | --- |
| sharingId | <code>string</code> | 
| sharecode | <code>string</code> | 

<a name="TriggerCollection"></a>

## TriggerCollection
Implements `DocumentCollection` API along with specific methods for `io.cozy.triggers`.

**Kind**: global class  

* [TriggerCollection](#TriggerCollection)
    * [.all(options)](#TriggerCollection+all) ⇒ <code>Object</code>
    * [.create(attributes)](#TriggerCollection+create) ⇒ <code>object</code>
    * [.destroy(document)](#TriggerCollection+destroy) ⇒ <code>object</code>
    * [.find(selector, options)](#TriggerCollection+find) ⇒ <code>Object</code>
    * [.launch(Trigger)](#TriggerCollection+launch) ⇒ <code>object</code>

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


| Param | Type |
| --- | --- |
| selector | <code>object</code> | 
| options | <code>object</code> | 

<a name="TriggerCollection+launch"></a>

### triggerCollection.launch(Trigger) ⇒ <code>object</code>
Force given trigger execution.

**Kind**: instance method of [<code>TriggerCollection</code>](#TriggerCollection)  
**Returns**: <code>object</code> - Stack response, containing job launched by trigger, under `data` attribute.  
**See**: https://docs.cozy.io/en/cozy-stack/jobs/#post-jobstriggerstrigger-idlaunch  

| Param | Type | Description |
| --- | --- | --- |
| Trigger | <code>object</code> | to launch |

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
