[cozy-client](../README.md) / [Exports](../modules.md) / [models](../modules/models.md) / [document](../modules/models.document.md) / Qualification

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
| `attributes` | [`QualificationAttributes`](../interfaces/models.document.qualificationattributes.md) | Qualification's attributes |

*Defined in*

[packages/cozy-client/src/models/document.js:22](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document.js#L22)

## Properties

### label

• **label**: `string`

*Defined in*

[packages/cozy-client/src/models/document.js:31](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document.js#L31)

***

### purpose

• **purpose**: `string`

*Defined in*

[packages/cozy-client/src/models/document.js:35](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document.js#L35)

***

### sourceCategory

• **sourceCategory**: `string`

*Defined in*

[packages/cozy-client/src/models/document.js:39](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document.js#L39)

***

### sourceSubCategory

• **sourceSubCategory**: `string`

*Defined in*

[packages/cozy-client/src/models/document.js:41](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document.js#L41)

***

### subjects

• **subjects**: `string`\[]

*Defined in*

[packages/cozy-client/src/models/document.js:43](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document.js#L43)

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

[packages/cozy-client/src/models/document.js:63](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document.js#L63)

***

### setPurpose

▸ **setPurpose**(`purpose`): [`Qualification`](models.document.qualification.md)

Set purpose to the qualification.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `purpose` | `any`\[] | The purpose to set. |

*Returns*

[`Qualification`](models.document.qualification.md)

The Qualification object.

*Defined in*

[packages/cozy-client/src/models/document.js:146](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document.js#L146)

***

### setSourceCategory

▸ **setSourceCategory**(`sourceCategory`): [`Qualification`](models.document.qualification.md)

Set sourceCategory to the qualification.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `sourceCategory` | `any`\[] | The sourceCategory to set. |

*Returns*

[`Qualification`](models.document.qualification.md)

The Qualification object.

*Defined in*

[packages/cozy-client/src/models/document.js:156](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document.js#L156)

***

### setSourceSubCategory

▸ **setSourceSubCategory**(`sourceSubCategory`): [`Qualification`](models.document.qualification.md)

Set sourceSubCategory to the qualification.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `sourceSubCategory` | `any`\[] | The sourceSubCategory to set. |

*Returns*

[`Qualification`](models.document.qualification.md)

The Qualification object.

*Defined in*

[packages/cozy-client/src/models/document.js:169](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document.js#L169)

***

### setSubjects

▸ **setSubjects**(`subjects`): [`Qualification`](models.document.qualification.md)

Set subjects to the qualification.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `subjects` | `any`\[] | The subjects to set. |

*Returns*

[`Qualification`](models.document.qualification.md)

The Qualification object.

*Defined in*

[packages/cozy-client/src/models/document.js:182](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document.js#L182)

***

### toQualification

▸ **toQualification**(): `any`

Returns the qualification attributes

*Returns*

`any`

The qualification attributes

*Defined in*

[packages/cozy-client/src/models/document.js:194](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document.js#L194)

***

### getByLabel

▸ `Static` **getByLabel**(`label`): [`Qualification`](models.document.qualification.md)

Returns the qualification associated to a label.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | The label to qualify |

*Returns*

[`Qualification`](models.document.qualification.md)

*   The qualification

*Defined in*

[packages/cozy-client/src/models/document.js:203](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/document.js#L203)
