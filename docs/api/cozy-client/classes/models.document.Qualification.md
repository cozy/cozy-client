[cozy-client](../README.md) / [models](../modules/models.md) / [document](../modules/models.document.md) / Qualification

# Class: Qualification

[models](../modules/models.md).[document](../modules/models.document.md).Qualification

This class is used to create document Qualification, i.e. metadata
attributes used to describe the document.
The qualifications model is stored in the assets, associating
labels to attributes, namely: purpose, sourceCategory, sourceSubCategory
and subjects.
A qualification can be customized accordingly to rules detailed in
the checkValueAttributes method.

## Constructors

### constructor

• **new Qualification**(`label`, `attributes?`)

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | The qualification label |
| `attributes` | `QualificationAttributes` | Qualification's attributes |

*Defined in*

[packages/cozy-client/src/models/document/qualification.js:28](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document/qualification.js#L28)

## Properties

### label

• **label**: `string`

*Defined in*

[packages/cozy-client/src/models/document/qualification.js:36](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document/qualification.js#L36)

***

### purpose

• **purpose**: `string`

*Defined in*

[packages/cozy-client/src/models/document/qualification.js:42](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document/qualification.js#L42)

***

### sourceCategory

• **sourceCategory**: `string`

*Defined in*

[packages/cozy-client/src/models/document/qualification.js:50](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document/qualification.js#L50)

***

### sourceSubCategory

• **sourceSubCategory**: `string`

*Defined in*

[packages/cozy-client/src/models/document/qualification.js:58](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document/qualification.js#L58)

***

### subjects

• **subjects**: `string`\[]

*Defined in*

[packages/cozy-client/src/models/document/qualification.js:65](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document/qualification.js#L65)

## Methods

### checkAttributes

▸ **checkAttributes**(`attributes`): `void`

Check the given qualification attributes respects the following rules:

*   For the given label, if a purpose, sourceCategory or sourceSubCategory
    attribute is defined in the model, it must match the given qualification.
*   If not defined in the model for the label, a custom purpose, sourceCategory or
    sourceSubCategory value can be defined, if it exist in their respective
    known values list.
*   For the given label, if subjects are defined in the model, they must be included
    in the given qualification.
*   If extra subjects are set, they should exist in the known values.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `attributes` | `any` | The qualification attributes to check |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/models/document/qualification.js:85](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document/qualification.js#L85)

***

### setPurpose

▸ **setPurpose**(`purpose`): [`Qualification`](models.document.Qualification.md)

Set purpose to the qualification.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `purpose` | `any`\[] | The purpose to set. |

*Returns*

[`Qualification`](models.document.Qualification.md)

The Qualification object.

*Defined in*

[packages/cozy-client/src/models/document/qualification.js:168](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document/qualification.js#L168)

***

### setSourceCategory

▸ **setSourceCategory**(`sourceCategory`): [`Qualification`](models.document.Qualification.md)

Set sourceCategory to the qualification.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `sourceCategory` | `any`\[] | The sourceCategory to set. |

*Returns*

[`Qualification`](models.document.Qualification.md)

The Qualification object.

*Defined in*

[packages/cozy-client/src/models/document/qualification.js:178](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document/qualification.js#L178)

***

### setSourceSubCategory

▸ **setSourceSubCategory**(`sourceSubCategory`): [`Qualification`](models.document.Qualification.md)

Set sourceSubCategory to the qualification.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `sourceSubCategory` | `any`\[] | The sourceSubCategory to set. |

*Returns*

[`Qualification`](models.document.Qualification.md)

The Qualification object.

*Defined in*

[packages/cozy-client/src/models/document/qualification.js:191](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document/qualification.js#L191)

***

### setSubjects

▸ **setSubjects**(`subjects`): [`Qualification`](models.document.Qualification.md)

Set subjects to the qualification.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `subjects` | `any`\[] | The subjects to set. |

*Returns*

[`Qualification`](models.document.Qualification.md)

The Qualification object.

*Defined in*

[packages/cozy-client/src/models/document/qualification.js:204](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document/qualification.js#L204)

***

### toQualification

▸ **toQualification**(): `any`

Returns the qualification attributes

*Returns*

`any`

The qualification attributes

*Defined in*

[packages/cozy-client/src/models/document/qualification.js:216](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document/qualification.js#L216)

***

### getByLabel

▸ `Static` **getByLabel**(`label`): [`Qualification`](models.document.Qualification.md)

Returns the qualification associated to a label.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | The label to qualify |

*Returns*

[`Qualification`](models.document.Qualification.md)

*   The qualification

*Defined in*

[packages/cozy-client/src/models/document/qualification.js:233](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document/qualification.js#L233)
