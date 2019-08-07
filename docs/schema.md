## What is a Cozy-Client schema?

Schemas help Cozy-Client to know about the structure of your documents. With schemas, Cozy-Client may automatically fill the version attributes in `cozyMetadata`, it will allows traversal of links between documents, and it will help you validate your document before saving them in the CouchDB database.

## Structure of a schema

A schema for a doctype is an object with the following attributes: 

* `doctype`: the actual doctype name in cozy
* `doctypeVersion`: the version of the schema for this doctype ; it will help you to manage documents from different versions or migrate documents from a version to another
* `attributes`: the list of attributes with their constraints
* `relationships`: the description of the relations between documents

All attributes but the `doctype` one are entirely optional.

```json
{
  "doctype": "io.cozy.todos",
  "doctypeVersion": 45,
  "attributes": {
    "label": { "unique": true },
  },
  "relationships": {
    "tasks": {
      "doctype": "io.cozy.tasks",
      "type": "has-many"
    }
  }
}
```

Today, attributes have only a `unique` property which, when at `true` will validate the uniqueness of the value. Other properties will be added in the future. 

You do not need to list every attribute you use. You may only add those for which you have a constraint to list.

Relations are described in the ["Using relationship"](./relationships.md) document.

## Providing schemas

Schemas are provided with a keyed object in the `schema` parameter at CozyClient initialization:

```javascript
const schema = {
  todos: {
    doctype: 'io.cozy.books',
    attributes: {},
    relationships: {
      items: {
        doctype: 'io.cozy.contact',
        type: 'has-many'
      }
    }
  }
}

const client = new CozyClient({
  uri: 'http://cozy.tools:8080',
  token: '...',
  schema
})
```

## Adding a schema to an already initialized CozyClient instance

Provide your schemas to the `addSchema()` method, in the same form as for initialization:

```javascript
const client = new CozyClient({
  uri: 'http://cozy.tools:8080',
  token: '...',
  schema: { }
})

const additionalSchema = {
  todos: {
    doctype: 'io.cozy.books',
    attributes: {},
    relationships: {
      items: {
        doctype: 'io.cozy.contact',
        type: 'has-many'
      }
    }
  }
}

client.addSchema(additionalSchema)
```

### Validation

Today Cozy-Client only validates uniqueness of fields described as is in the schema.

If you provide a schema, Cozy-Client will automatically try to validate your documents when you save them. An exception will be thrown if the validation fails.

You can validate a document explicitly with `validate()`. Be sure the document has a `_type` attribute with the doctype name if it has never been saved to CouchDB.

```javascript
const book = {
  _type: 'io.cozy.books',
  name: 'La horde de contrevent'
}

if (!client.validate(book)) {
  throw new Error('Something is wrong with this book document')
}
```


