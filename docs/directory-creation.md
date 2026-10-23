# Creating directories

Use `CozyClient.create` to create a directory and update the document and query
cache through the mutation pipeline:

```js
const { data: directory } = await client.create(
  'io.cozy.files',
  { type: 'directory', name: 'New folder', dirId: parentId },
  undefined,
  { forceLink: 'stack' }
)
```

For a shared-drive recipient, pass the shared drive ID as a mutation option,
not as a directory attribute:

```js
const { data: directory } = await client.create(
  'io.cozy.files',
  { type: 'directory', name: 'New folder', dirId: parentId },
  undefined,
  { driveId, forceLink: 'stack' }
)
```

`driveId` scopes `io.cozy.files` creation through StackLink to
`/sharings/drives/:driveId/:parentId`. Omitting it uses `/files/:parentId`.
It does not scope updates, deletes, references, or creation of other doctypes.
Creating a shared-drive file or directory with nonempty references is not supported
and rejects before any write. Omit references or pass an empty reference map.
Use `dirId` for the creation input; the returned directory has `dir_id`.

Directory creation is online-only: use the existing `forceLink: 'stack'` option
when PouchLink is configured, so it does not create an unscoped local document.
Failures reject the promise without inserting a directory into the cache.
The mutation and realtime creation notifications update the document cache and
compatible query caches in the same drive without a separate insertion or refetch.
Personal queries and queries for other drives are not updated. Shared files carry
`driveId` in the cache, as they already do when replicated offline. Scope shared
queries with `.sharingById(driveId)` (or the `driveId` query option).
They do not automatically rewrite a shared-drive `getById()` response's
`included` listing. Drive's existing shared-folder listing uses its drive-specific
realtime subscription to refresh that included state. This is distinct from
mutation-driven document-cache updates; no additional creation-time refetch is
needed alongside that existing realtime refresh.

For a drive-specific realtime subscription whose payload does not contain
`driveId`, pass the subscription's drive ID to the cache dispatcher:

```js
await dispatchCreate(client, 'io.cozy.files', document, { driveId })
```

The same option is supported by `dispatchUpdate` and `dispatchDelete`. If the
payload already contains `driveId`, its value takes precedence over this option.
