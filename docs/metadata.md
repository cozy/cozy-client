## What is cozyMetadata?

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

## Cozy-Client helper

This cozyMetadata block is managed by the apps themselves. Cozy-Client is able to manage some parts of cozyMetadata automatically. For this it needs an `appMetadata` parameter with a few informations:

* `slug`: the slug of the app or connector (will be used in `createdByApp` and `updatedByApps`)
* `version`: version of the app (will be used in `createdByAppVersion` and `updatedByApps`)
* when in a connector, `sourceAccount`: the id of the io.cozy.accounts document that trigger tue current execution (it will help to know which documents belong or are created by which account)

## What is automated and what is not

If you provide an `appMetadata`(and only if you provide it):

### For new documents

Cozy-Client will set the default for: 

* `metadataVersion` to the last version known to Cozy-Client. It's the version of the schema for the metadata block itself.
* `doctypeVersion` if it's provided in the `schema` at the Cozy-Client initialization.
* `slug` of your app
* `sourceAccount`
* creation date, app and version
* updated date, app and version

If any of these fields already exists in the document you try to save, your values will override the defaults. This allows you to import a document with an existing history.

### For existing documents

Cozy-Client will:

* Set the updated date
* Add your app and version in the `updatedByApps` list

These values will override any values that your document may already have.

