## What are relations in Cozy-Client?

CouchDB is a document store. It does not materialize relations between documents. We do, however, have a standardized way of describing relations between cozy documents. This allows Cozy-Client to give us some automation.

### In CouchDB

Relations between documents are materialized under a `relationships` object at the root of the document. Relations are referenced by their names, e.g. `authors`.

Each relation is an object with a `data` property, containing either **one reference**, or an **array of references**.

A reference is an object containing at least:
* `_type`:  the name of the referenced doctype, e.g. `io.cozy.contacts`
* `_id`:  the id of the referenced document.

For instance, a book -> authors relationship might be represented like this:
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

Please see the cozy-doctypes [documentation](https://github.com/cozy/cozy-doctypes/#relationships) for more insights about the syntax.


### In the Cozy-Client schema

Cozy-client knows how to handle these relations thanks to the schema you provide at initialization:

```javascript
const schema = {
  books: {
    doctype: 'io.cozy.books',
    attributes: {},
    relationships: {
      authors: {
        doctype: 'io.cozy.contacts',
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

We explain below what are the different types of relations.

### Relation types

Cozy-Client [predefines](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/helpers.js) two basic relation types that must be specified in the schema:

- `'has-one'`: the relation has a unique reference.
- `'has-many'`: the relation can have several references.


#### Files relations

The files implements a special type of relation: `'io.cozy.files:has-many'`. This relation name is `referenced_by`, which is an array of references, just like the `'has-many'` relation. 

The stack implements routes to handle this kind of relation on the `/files` endpoint. See the [stack documentation](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/).

Note specific [view index](https://docs.cozy.io/en/tutorials/data/queries/#usage-example-references) are defined on `referenced_by` relationships, allowing fast queries on it.


#### Customize relations

You are free to create your own relation type if you need a special behaviour.

For instance, [Banks doctypes](https://github.com/cozy/cozy-banks/blob/master/src/doctypes.js) implements `HasManyBills` or `HasManyReimbursements`.

#### Old relation types 

Note there are two others basic relations, that are here for backward compatibility:

- `'has-one-in-place'`
- `'has-many-in-place'`

⚠️ For new doctypes, you should not use those relations, prefer `'has-one'` or `'has-many'`.

With these relations, instead of using the `relationships` attribute, you reference directly the ids of linked documents at the root of your data:

```javascript
const schema = {
  books: {
    doctype: 'io.cozy.books',
    attributes: {},
    relationships: {
      authors: {
        doctype: 'io.cozy.contacts',
        type: 'has-many-in-place'
      }
    }
  }
}
```

```javascript
const book = {
  "_id": "mobydick",
  "authors": [ "hermanmelville" ]
}
```


## Usage

### Include relations in your query

Relations are not loaded eagerly by default. If you want your query to load your relations for you, you will have to name them in an `include()` request.

```javascript
const query = Q('io.cozy.books')
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

### Create a new file with existing relations

Simply pass the reference to your file as a third parameter to `create()`:

```javascript
const photo = { _id: "sunset.jpg" }
const reference = { _id: "1324", _type: "io.cozy.photos.albums" }
const albumReference = { albums: [ albumReference ] }
await client.create('io.cozy.files', photo, albumReference)
```
