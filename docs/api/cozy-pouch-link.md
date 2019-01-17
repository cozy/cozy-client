## Classes

<dl>
<dt><a href="#PouchLink">PouchLink</a></dt>
<dd><p>Link to be passed to a <code>CozyClient</code> instance to support CouchDB. It instantiates
PouchDB collections for each doctype that it supports and knows how
to respond to queries and mutations.</p>
</dd>
<dt><a href="#PouchManager">PouchManager</a></dt>
<dd><p>Handles the lifecycle of several pouches</p>
<ul>
<li>Creates/Destroys the pouches</li>
<li>Replicates periodically</li>
</ul>
</dd>
</dl>

<a name="PouchLink"></a>

## PouchLink
Link to be passed to a `CozyClient` instance to support CouchDB. It instantiates
PouchDB collections for each doctype that it supports and knows how
to respond to queries and mutations.

**Kind**: global class  

* [PouchLink](#PouchLink)
    * [.handleOnSync()](#PouchLink+handleOnSync)
    * [.startReplication()](#PouchLink+startReplication) ⇒ <code>void</code>
    * [.stopReplication()](#PouchLink+stopReplication) ⇒ <code>void</code>

<a name="PouchLink+handleOnSync"></a>

### pouchLink.handleOnSync()
Receives PouchDB updates (documents grouped by doctype).
Normalizes the data (.id -> ._id, .rev -> _rev).
Passes the data to the client and to the onSync handler.

**Kind**: instance method of [<code>PouchLink</code>](#PouchLink)  
<a name="PouchLink+startReplication"></a>

### pouchLink.startReplication() ⇒ <code>void</code>
User of the link can call this to start ongoing replications.
Typically, it can be used when the application regains focus.

**Kind**: instance method of [<code>PouchLink</code>](#PouchLink)  
**Access**: public  
<a name="PouchLink+stopReplication"></a>

### pouchLink.stopReplication() ⇒ <code>void</code>
User of the link can call this to stop ongoing replications.
Typically, it can be used when the applications loses focus.

**Kind**: instance method of [<code>PouchLink</code>](#PouchLink)  
**Access**: public  
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
<a name="PouchManager+replicateOnce"></a>

### pouchManager.replicateOnce()
Starts replication

**Kind**: instance method of [<code>PouchManager</code>](#PouchManager)  
