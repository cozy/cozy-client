## Classes

<dl>
<dt><a href="#PouchLink">PouchLink</a></dt>
<dd><p>Link to be passed to a <code>CozyClient</code> instance to support CouchDB. It instantiates
PouchDB collections for each doctype that it supports and knows how
to respond to queries and mutations.</p>
</dd>
<dt><a href="#Loop">Loop</a></dt>
<dd><p>Utility to call a function (task) periodically
and on demand immediately.</p>
<p>Public API</p>
<ul>
<li>start</li>
<li>stop</li>
<li>scheduleImmediateTask</li>
<li>waitForCurrentTask</li>
</ul>
</dd>
<dt><a href="#PouchManager">PouchManager</a></dt>
<dd><p>Handles the lifecycle of several pouches</p>
<ul>
<li>Creates/Destroys the pouches</li>
<li>Replicates periodically</li>
</ul>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#persistLastReplicatedDocID">persistLastReplicatedDocID</a></dt>
<dd><p>Persist the last replicated doc id for a doctype</p>
</dd>
<dt><a href="#getLastReplicatedDocID">getLastReplicatedDocID</a> ⇒ <code>string</code></dt>
<dd><p>Get the last replicated doc id for a doctype</p>
</dd>
<dt><a href="#destroyAllLastReplicatedDocID">destroyAllLastReplicatedDocID</a></dt>
<dd><p>Destroy all the replicated doc id</p>
</dd>
<dt><a href="#getPersistedSyncedDoctypes">getPersistedSyncedDoctypes</a> ⇒ <code>object</code></dt>
<dd><p>Get the persisted doctypes</p>
</dd>
<dt><a href="#destroySyncedDoctypes">destroySyncedDoctypes</a></dt>
<dd><p>Destroy the synced doctypes</p>
</dd>
<dt><a href="#persistDoctypeLastSequence">persistDoctypeLastSequence</a></dt>
<dd><p>Persist the last CouchDB sequence for a synced doctype</p>
</dd>
<dt><a href="#getDoctypeLastSequence">getDoctypeLastSequence</a> ⇒ <code>string</code></dt>
<dd><p>Get the last CouchDB sequence for a doctype</p>
</dd>
<dt><a href="#destroyAllDoctypeLastSequence">destroyAllDoctypeLastSequence</a></dt>
<dd><p>Destroy all the last sequence</p>
</dd>
<dt><a href="#destroyDoctypeLastSequence">destroyDoctypeLastSequence</a></dt>
<dd><p>Destroy the last sequence for a doctype</p>
</dd>
<dt><a href="#persistWarmedUpQueries">persistWarmedUpQueries</a></dt>
<dd><p>Persist the warmed up queries</p>
</dd>
<dt><a href="#getPersistedWarmedUpQueries">getPersistedWarmedUpQueries</a> ⇒ <code>object</code></dt>
<dd><p>Get the warmed up queries</p>
</dd>
<dt><a href="#destroyWarmedUpQueries">destroyWarmedUpQueries</a></dt>
<dd><p>Destroy the warmed queries</p>
</dd>
<dt><a href="#getAdapterName">getAdapterName</a> ⇒ <code>string</code></dt>
<dd><p>Get the adapter name</p>
</dd>
<dt><a href="#persistAdapterName">persistAdapterName</a></dt>
<dd><p>Persist the adapter name</p>
</dd>
<dt><a href="#fetchRemoteInstance">fetchRemoteInstance</a> ⇒ <code>object</code></dt>
<dd><p>Fetch remote instance</p>
</dd>
<dt><a href="#fetchRemoteLastSequence">fetchRemoteLastSequence</a> ⇒ <code>string</code></dt>
<dd><p>Fetch last sequence from remote instance</p>
</dd>
<dt><a href="#replicateAllDocs">replicateAllDocs</a> ⇒ <code>Array</code></dt>
<dd><p>Replicate all docs locally from a remote URL.</p>
<p>It uses the _all_docs view, and bulk insert the docs.
Note it saves the last replicated _id for each run and
starts from there in case the process stops before the end.</p>
</dd>
<dt><a href="#getDatabaseName">getDatabaseName</a> ⇒ <code>string</code></dt>
<dd><p>Get the database name based on prefix and doctype</p>
</dd>
<dt><a href="#getPrefix">getPrefix</a> ⇒ <code>string</code></dt>
<dd><p>Get the URI prefix</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getQueryAlias">getQueryAlias(query)</a> ⇒ <code>string</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SyncStatus">SyncStatus</a> : <code>&quot;idle&quot;</code> | <code>&quot;replicating&quot;</code></dt>
<dd></dd>
<dt><a href="#MigrationParams">MigrationParams</a> : <code>object</code></dt>
<dd><p>Migrate the current adapter</p>
</dd>
<dt><a href="#SyncInfo">SyncInfo</a> : <code>object</code></dt>
<dd><p>Persist the synchronized doctypes</p>
</dd>
<dt><a href="#MigrationParams">MigrationParams</a> ⇒ <code>object</code></dt>
<dd><p>Migrate a PouchDB database to a new adapter.</p>
</dd>
</dl>

<a name="PouchLink"></a>

## PouchLink
Link to be passed to a `CozyClient` instance to support CouchDB. It instantiates
PouchDB collections for each doctype that it supports and knows how
to respond to queries and mutations.

**Kind**: global class  

* [PouchLink](#PouchLink)
    * [new PouchLink([opts])](#new_PouchLink_new)
    * [.replicationStatus](#PouchLink+replicationStatus) : <code>Record.&lt;string, SyncStatus&gt;</code>
    * [.getPouchAdapterName](#PouchLink+getPouchAdapterName) ⇒ <code>string</code>
    * [.handleOnSync()](#PouchLink+handleOnSync)
    * [.startReplication()](#PouchLink+startReplication) ⇒ <code>void</code>
    * [.stopReplication()](#PouchLink+stopReplication) ⇒ <code>void</code>
    * [.needsToWaitWarmup(doctype)](#PouchLink+needsToWaitWarmup) ⇒ <code>boolean</code>

<a name="new_PouchLink_new"></a>

### new PouchLink([opts])
constructor - Initializes a new PouchLink

**Returns**: <code>object</code> - The PouchLink instance  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [opts] | <code>object</code> | <code>{}</code> |  |
| [opts.replicationInterval] | <code>number</code> |  | Milliseconds between replications |
| opts.doctypes | <code>Array.&lt;string&gt;</code> |  | Doctypes to replicate |
| opts.doctypesReplicationOptions | <code>Array.&lt;object&gt;</code> |  | A mapping from doctypes to replication options. All pouch replication options can be used, as well as the "strategy" option that determines which way the replication is done (can be "sync", "fromRemote" or "toRemote") |

<a name="PouchLink+replicationStatus"></a>

### pouchLink.replicationStatus : <code>Record.&lt;string, SyncStatus&gt;</code>
- Stores replication states per doctype

**Kind**: instance property of [<code>PouchLink</code>](#PouchLink)  
<a name="PouchLink+getPouchAdapterName"></a>

### pouchLink.getPouchAdapterName ⇒ <code>string</code>
Return the PouchDB adapter name.
Should be IndexedDB for newest adapters.

**Kind**: instance property of [<code>PouchLink</code>](#PouchLink)  
**Returns**: <code>string</code> - The adapter name  
<a name="PouchLink+handleOnSync"></a>

### pouchLink.handleOnSync()
Receives PouchDB updates (documents grouped by doctype).
Normalizes the data (.id -> ._id, .rev -> _rev).
Passes the data to the client and to the onSync handler.

Emits an event (pouchlink:sync:end) when the sync (all doctypes) is done

**Kind**: instance method of [<code>PouchLink</code>](#PouchLink)  
<a name="PouchLink+startReplication"></a>

### pouchLink.startReplication() ⇒ <code>void</code>
User of the link can call this to start ongoing replications.
Typically, it can be used when the application regains focus.

Emits pouchlink:sync:start event when the replication begins

**Kind**: instance method of [<code>PouchLink</code>](#PouchLink)  
**Access**: public  
<a name="PouchLink+stopReplication"></a>

### pouchLink.stopReplication() ⇒ <code>void</code>
User of the link can call this to stop ongoing replications.
Typically, it can be used when the applications loses focus.

Emits pouchlink:sync:stop event

**Kind**: instance method of [<code>PouchLink</code>](#PouchLink)  
**Access**: public  
<a name="PouchLink+needsToWaitWarmup"></a>

### pouchLink.needsToWaitWarmup(doctype) ⇒ <code>boolean</code>
Check if there is warmup queries for this doctype
and return if those queries are already warmed up or not

**Kind**: instance method of [<code>PouchLink</code>](#PouchLink)  
**Returns**: <code>boolean</code> - the need to wait for the warmup  

| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | Doctype to check |

<a name="Loop"></a>

## Loop
Utility to call a function (task) periodically
and on demand immediately.

Public API

- start
- stop
- scheduleImmediateTask
- waitForCurrentTask

**Kind**: global class  

* [Loop](#Loop)
    * [.start()](#Loop+start)
    * [.stop()](#Loop+stop)
    * [.runImmediateTasks()](#Loop+runImmediateTasks)
    * [.scheduleImmediateTask(task)](#Loop+scheduleImmediateTask)
    * [.runTask()](#Loop+runTask)
    * [.round()](#Loop+round)

<a name="Loop+start"></a>

### loop.start()
Starts the loop. Will run the task periodically each `this.delay` ms.
Ignores multiple starts.

**Kind**: instance method of [<code>Loop</code>](#Loop)  
<a name="Loop+stop"></a>

### loop.stop()
Stops the loop, clears immediate tasks.
Cancels current task if possible

**Kind**: instance method of [<code>Loop</code>](#Loop)  
<a name="Loop+runImmediateTasks"></a>

### loop.runImmediateTasks()
Flushes the immediate tasks list and calls each task.
Each task is awaited before the next is started.

**Kind**: instance method of [<code>Loop</code>](#Loop)  
<a name="Loop+scheduleImmediateTask"></a>

### loop.scheduleImmediateTask(task)
Schedules a task to be run immediately at next round.
Ignored if loop is not started.
If not task is passed, the default task from the loop is used.

**Kind**: instance method of [<code>Loop</code>](#Loop)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| task | <code>function</code> | <code></code> | Optional custom function to be run immediately |

<a name="Loop+runTask"></a>

### loop.runTask()
Calls and saves current task.
Stops loop in case of error of the task.

**Kind**: instance method of [<code>Loop</code>](#Loop)  
<a name="Loop+round"></a>

### loop.round()
Runs immediate tasks and then schedule the next round.
Immediate tasks are called sequentially without delay
There is a delay between immediate tasks and normal periodic tasks.

**Kind**: instance method of [<code>Loop</code>](#Loop)  
<a name="PouchManager"></a>

## PouchManager
Handles the lifecycle of several pouches

- Creates/Destroys the pouches
- Replicates periodically

**Kind**: global class  

* [PouchManager](#PouchManager)
    * [.ensureDatabasesExist()](#PouchManager+ensureDatabasesExist)
    * [.startReplicationLoop()](#PouchManager+startReplicationLoop)
    * [.stopReplicationLoop()](#PouchManager+stopReplicationLoop)
    * [.syncImmediately()](#PouchManager+syncImmediately)
    * [.replicateOnce()](#PouchManager+replicateOnce)

<a name="PouchManager+ensureDatabasesExist"></a>

### pouchManager.ensureDatabasesExist()
Via a call to info() we ensure the database exist on the
remote side. This is done only once since after the first
call, we are sure that the databases have been created.

**Kind**: instance method of [<code>PouchManager</code>](#PouchManager)  
<a name="PouchManager+startReplicationLoop"></a>

### pouchManager.startReplicationLoop()
Starts periodic syncing of the pouches

**Kind**: instance method of [<code>PouchManager</code>](#PouchManager)  
<a name="PouchManager+stopReplicationLoop"></a>

### pouchManager.stopReplicationLoop()
Stop periodic syncing of the pouches

**Kind**: instance method of [<code>PouchManager</code>](#PouchManager)  
<a name="PouchManager+syncImmediately"></a>

### pouchManager.syncImmediately()
If a replication is currently ongoing, will start a replication
just after it has finished. Otherwise it will start a replication
immediately

**Kind**: instance method of [<code>PouchManager</code>](#PouchManager)  
<a name="PouchManager+replicateOnce"></a>

### pouchManager.replicateOnce()
Starts replication

**Kind**: instance method of [<code>PouchManager</code>](#PouchManager)  
<a name="persistLastReplicatedDocID"></a>

## persistLastReplicatedDocID
Persist the last replicated doc id for a doctype

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | The replicated doctype |
| id | <code>string</code> | The docid |

<a name="getLastReplicatedDocID"></a>

## getLastReplicatedDocID ⇒ <code>string</code>
Get the last replicated doc id for a doctype

**Kind**: global constant  
**Returns**: <code>string</code> - The last replicated docid  

| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | The doctype |

<a name="destroyAllLastReplicatedDocID"></a>

## destroyAllLastReplicatedDocID
Destroy all the replicated doc id

**Kind**: global constant  
<a name="getPersistedSyncedDoctypes"></a>

## getPersistedSyncedDoctypes ⇒ <code>object</code>
Get the persisted doctypes

**Kind**: global constant  
**Returns**: <code>object</code> - The synced doctypes  
<a name="destroySyncedDoctypes"></a>

## destroySyncedDoctypes
Destroy the synced doctypes

**Kind**: global constant  
<a name="persistDoctypeLastSequence"></a>

## persistDoctypeLastSequence
Persist the last CouchDB sequence for a synced doctype

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | The synced doctype |
| sequence | <code>string</code> | The sequence hash |

<a name="getDoctypeLastSequence"></a>

## getDoctypeLastSequence ⇒ <code>string</code>
Get the last CouchDB sequence for a doctype

**Kind**: global constant  
**Returns**: <code>string</code> - the last sequence  

| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | The doctype |

<a name="destroyAllDoctypeLastSequence"></a>

## destroyAllDoctypeLastSequence
Destroy all the last sequence

**Kind**: global constant  
<a name="destroyDoctypeLastSequence"></a>

## destroyDoctypeLastSequence
Destroy the last sequence for a doctype

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>string</code> | The doctype |

<a name="persistWarmedUpQueries"></a>

## persistWarmedUpQueries
Persist the warmed up queries

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| warmedUpQueries | <code>object</code> | The warmedup queries |

<a name="getPersistedWarmedUpQueries"></a>

## getPersistedWarmedUpQueries ⇒ <code>object</code>
Get the warmed up queries

**Kind**: global constant  
**Returns**: <code>object</code> - the warmed up queries  
<a name="destroyWarmedUpQueries"></a>

## destroyWarmedUpQueries
Destroy the warmed queries

**Kind**: global constant  
<a name="getAdapterName"></a>

## getAdapterName ⇒ <code>string</code>
Get the adapter name

**Kind**: global constant  
**Returns**: <code>string</code> - The adapter name  
<a name="persistAdapterName"></a>

## persistAdapterName
Persist the adapter name

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| adapter | <code>string</code> | The adapter name |

<a name="fetchRemoteInstance"></a>

## fetchRemoteInstance ⇒ <code>object</code>
Fetch remote instance

**Kind**: global constant  
**Returns**: <code>object</code> - The instance response  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>URL</code> | The remote instance URL, including the credentials |
| params | <code>object</code> | The params to query the remote instance |

<a name="fetchRemoteLastSequence"></a>

## fetchRemoteLastSequence ⇒ <code>string</code>
Fetch last sequence from remote instance

**Kind**: global constant  
**Returns**: <code>string</code> - The last sequence  

| Param | Type | Description |
| --- | --- | --- |
| baseUrl | <code>string</code> | The base URL of the remote instance |

<a name="replicateAllDocs"></a>

## replicateAllDocs ⇒ <code>Array</code>
Replicate all docs locally from a remote URL.

It uses the _all_docs view, and bulk insert the docs.
Note it saves the last replicated _id for each run and
starts from there in case the process stops before the end.

**Kind**: global constant  
**Returns**: <code>Array</code> - The retrieved documents  

| Param | Type | Description |
| --- | --- | --- |
| db | <code>object</code> | Pouch instance |
| baseUrl | <code>string</code> | The remote instance |
| doctype | <code>string</code> | The doctype to replicate |

<a name="getDatabaseName"></a>

## getDatabaseName ⇒ <code>string</code>
Get the database name based on prefix and doctype

**Kind**: global constant  
**Returns**: <code>string</code> - The database name  

| Param | Type | Description |
| --- | --- | --- |
| prefix | <code>string</code> | The URL prefix |
| doctype | <code>string</code> | The database doctype |

<a name="getPrefix"></a>

## getPrefix ⇒ <code>string</code>
Get the URI prefix

**Kind**: global constant  
**Returns**: <code>string</code> - The URI prefix  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | The Cozy URI |

<a name="getQueryAlias"></a>

## getQueryAlias(query) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - alias  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>QueryDefinition</code> | The query definition whose name we're getting |

<a name="SyncStatus"></a>

## SyncStatus : <code>&quot;idle&quot;</code> \| <code>&quot;replicating&quot;</code>
**Kind**: global typedef  
<a name="MigrationParams"></a>

## MigrationParams : <code>object</code>
Migrate the current adapter

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>MigrationParams</code>](#MigrationParams) | Migration params |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [fromAdapter] | <code>string</code> | The current adapter type, e.g. 'idb' |
| [toAdapter] | <code>string</code> | The new adapter type, e.g. 'indexeddb' |
| [url] | <code>string</code> | The Cozy URL |
| [plugins] | <code>Array.&lt;object&gt;</code> | The PouchDB plugins |

<a name="SyncInfo"></a>

## SyncInfo : <code>object</code>
Persist the synchronized doctypes

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| syncedDoctypes | <code>Record.&lt;string, SyncInfo&gt;</code> | The sync doctypes |

**Properties**

| Name | Type |
| --- | --- |
| Date | <code>string</code> | 

<a name="MigrationParams"></a>

## MigrationParams ⇒ <code>object</code>
Migrate a PouchDB database to a new adapter.

**Kind**: global typedef  
**Returns**: <code>object</code> - - The migrated pouch  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>MigrationParams</code>](#MigrationParams) | The migration params |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [dbName] | <code>string</code> | The database name |
| [fromAdapter] | <code>string</code> | The current adapter type, e.g. 'idb' |
| [toAdapter] | <code>string</code> | The new adapter type, e.g. 'indexeddb' |

