## What are relations in Cozy-Client?

CouchDB is a document store. It does not materialize relations between documents. We do, however, have a standardized way of describing relations between cozy documents. This allows Cozy-Client to give us some automation.

### In CouchDB

To materialize relations, we use a special key inside the document named `relationships`. Please see the cozy-doctypes [documentation](https://github.com/cozy/cozy-doctypes/#relationships) for the exact syntax.

```javascript
{
  "_id": "mobydick",
  "relationships": {
    "authors": {
      "data": [{ "_id": "hermanmelville", "_type": "io.cozy.contacts" }]
    }
  }
}
```

### In the Cozy-Client schema

Cozy-client knows about these relations with the schema you provide at initialization: 

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

With the help of the schema, Cozy-Client will be able to manage the `relationships` attribute of your documents for you.

### Relation types

Cozy-Client [predefines](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/helpers.js) four basic relation types: 

- `'has-one'`
- `'has-many'`
- `'has-one-in-place'`
- `'has-many-in-place'`

For new doctypes you should use `'has-one'` or `'has-many'`. They use your `relationships` attribute and link either a single document or an array of documents.

```javascript
const schema = {
  todos: {
    doctype: 'io.cozy.books',
    attributes: {},
    relationships: {
      authors: {
        doctype: 'io.cozy.contact',
        type: 'has-many'
      }
    }
  }
}
```

```javascript
const document = {
  "_id": "mobydick",
  "relationships": {
    "authors": {
      "data": [
        { "_id": "hermanmelville", "_type": "io.cozy.contacts" }
      ]
    }
  }
}
// there should be an io.cozy.contact document 
// for which the _id is "hermanmelville"
```

`'has-one-in-place'` or `'has-many-in-place'` are here for backward compatibility. Instead of using the `relationships` attribute, you reference directly the ids of linked documents at the root of your data:

```javascript
const schema = {
  todos: {
    doctype: 'io.cozy.books',
    attributes: {},
    relationships: {
      authors: {
        doctype: 'io.cozy.contact',
        type: 'has-many-in-place'
      }
    }
  }
}
````

```javascript
const document = {
  "_id": "mobydick",
  "authors": [ "hermanmelville" ]
}
// there should be an io.cozy.contact document 
// for which the _id is "hermanmelville" 
```

You may also see a special type named `'io.cozy.files:has-many'`. It's used for backward compatibility with the 'io.cozy.files' doctype. [Banks doctypes](https://github.com/cozy/cozy-banks/blob/master/src/doctypes.js) also have their own special relationship objects like `HasManyBills` or `HasManyReimbursements`. You are free to create your own if you need a special behaviour.


## Usage

### Include relations in your query

Relations are not loaded eagerly by default. If you want your query to load your relations for you by default, you will have to name them in a `include()` request.

```javascript
const query = client.find('io.cozy.books')
  .include(['authors'])
  .limitBy(20)
```

You will then find your relations under the `data` attribute: 
```javascript 
const response = await client.query(query)
const docs = response.data
const firstDoc = docs[0]
const firstAuthors = firstDoc.authors.data
```

### Add a relation to an existing document

When the relationship is a `has-many` type, you can call the `addById(documentId)` to create the relationship:

```javascript
const otherAuthorId = 'abc123'
const response = await client.query(query)
const docs = response.data
const firstDoc = docs[0]
firstDoc.authors.addById(otherAuthorId)
```

`addById` also accepts an array of document ids:

```javascript
firstDoc.authors.addById([mainAuthorId, coAuthorId])
```

When the relationship is a `has-one` type, use `set(document)` instead:

```javascript
const printer = {
  _id: 'abc123',
  _type: 'io.cozy.company',
  name: 'Harper & Brothers'
}
const response = await client.query(query)
const docs = response.data
const firstDoc = docs[0]
firstDoc.printingCompany.set(printer)
```

### Remove a relation to an existing document

For `has-many` relationships, use the `removeById` method:

```javascript
const otherAuthorId = 'abc123'
const response = await client.query(query)
const docs = response.data
const firstDoc = docs[0]
firstDoc.authors.removeById(otherAuthorId)
```

Just like `addById`, `removeById` accepts an array of ids as parameter.

For `has-one` relationships, use the `unset()` method:


```javascript
const response = await client.query(query)
const docs = response.data
const firstDoc = docs[0]
firstDoc.printingCompany.unset()
```

### Create a new document with existing relations

Simply pass your relations as a third parameter to `create()`:

```javascript
const mobydick = { _id: "mobydick" }
const hermanmelville = { _id: "hermanmelville" }
const relationships = { authors: [ hermanmelville ] }
await client.create('io.cozy.books', mobydick, relationships)
```
