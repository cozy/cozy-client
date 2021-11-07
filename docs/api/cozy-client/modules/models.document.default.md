[cozy-client](../README.md) / [models](models.md) / [document](models.document.md) / default

# Namespace: default

[models](models.md).[document](models.document.md).default

## Classes

*   [Qualification](../classes/models.document.default.qualification.md)

## Interfaces

*   [QualificationAttributes](../interfaces/models.document.default.qualificationattributes.md)

## Functions

### getQualification

▸ `Const` **getQualification**(`document`): [`Qualification`](../classes/models.document.default.qualification.md)

Helper to get the qualification from a document

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `any` | The document |

*Returns*

[`Qualification`](../classes/models.document.default.qualification.md)

*   The document qualification

*Defined in*

[packages/cozy-client/src/models/document/qualification.js:239](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document/qualification.js#L239)

***

### setQualification

▸ `Const` **setQualification**(`document`, `qualification`): `any`

Set the qualification to the document metadata

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `any` | The document to set the qualification |
| `qualification` | [`Qualification`](../classes/models.document.default.qualification.md) | The qualification to set |

*Returns*

`any`

*   The qualified document

*Defined in*

[packages/cozy-client/src/models/document/qualification.js:222](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document/qualification.js#L222)
