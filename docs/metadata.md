Cozy documents have a [`cozyMetadata`](https://github.com/cozy/cozy-doctypes/tree/master/docs#document-metadata) block with metadata about the document, like its schema version, its creation date, its source, etc.

```json
{
  "_id": "xxxx",
  "cozyMetadata": {
    "doctypeVersion": 4,
    "metadataVersion": 1,
    "createdAt": "xxxxx",
    "createdByApp": "xxxx",
    "createdByAppVersion": "xxxx",
    "updatedAt": "xxxxx",
    "updatedByApps": [
      {
        "slug": "xxxxx",
        "date": "xxxxx",
        "version": 3
      }
    ],
    "sourceAccount": "xxxxx"
  }
}
```

## Options for cozy-client

This cozyMetadata block is managed by the apps themselves. Cozy-Client is able to manage some parts of cozyMetadata automatically. For this it needs an `appMetadata` parameter with a few informations:

* `slug`: the slug of the app or connector (will be used in `createdByApp` and `updatedByApps`)
* `version`: version of the app (will be used in `createdByAppVersion` and `updatedByApps`)
* when in a connector, `sourceAccount`: the id of the io.cozy.accounts document that triggered the current execution (it will help to know which documents belong or are created by which account)

```
const client = new CozyClient({
  appMetadata: {
    slug: 'banks',
    version: '1.27.1'
  }
})
```

When you provide this information, cozy-client will automatically update metadata when it saves a document.

### For new documents

Cozy-Client will set:

* `metadataVersion` <string>: to the last version known to Cozy-Client. It's the version of the schema for the metadata block itself.
* `doctypeVersion` <string>: if it's provided in the `schema` at Cozy-Client initialization
* `slug` <string>: Slug of the app
* `sourceAccount`: <string>: if it's provided in the `appMetadata` at initialization. Note it won't work for files (see below).
* creation date, app and version
* updated date, app and version

```
const client = new CozyClient({
  appMetadata: {
    slug: 'banks',
    version: '1.27.1'
  },
  schema: {
    bankAccounts: {
      doctypeVersion: '1.0.0'
    }
  }
})
```

If any of these fields already exists in the document you try to save, these values will override the defaults. This allows you to import a document with an existing history.

### For existing documents

Cozy-Client will:

* Set the updated date
* Add your app and version in the `updatedByApps` list

⚠️ These values will override any values that your document may already have.

### Specific case of io.cozy.files

The io.cozy.files doctype is protected by cozy-stack, that restricts the attributes that can be saved by the client, including the cozyMetadata.

This is the case for :
* `cozyMetadata.sourceAccount`
* `cozyMetadata.sourceAccountIdentifier`

To save those attributes, you can pass them directly to the save method, like this:

```
const client = new client()
client.save({
  _type: 'io.cozy.files',
  sourceAccount: '12ab3c',
  sourceAccountIdentifier: 'john@example.org',
  ...
})
```


