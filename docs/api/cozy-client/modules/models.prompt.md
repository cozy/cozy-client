[cozy-client](../README.md) / [models](models.md) / prompt

# Namespace: prompt

[models](models.md).prompt

## Functions

### buildPromptMessages

▸ **buildPromptMessages**(`promptId`, `variables?`): `any`\[]

Generates messages array with interpolated variables

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `promptId` | `string` | The prompt ID |
| `variables` | `any` | Key-value pairs for variable interpolation |

*Returns*

`any`\[]

Messages array with interpolated variables

*Defined in*

[packages/cozy-client/src/models/prompt.js:82](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/prompt.js#L82)

***

### getAllDirectives

▸ **getAllDirectives**(): `any`\[]

Gets all directives

*Returns*

`any`\[]

Array of all directive objects

*Defined in*

[packages/cozy-client/src/models/prompt.js:71](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/prompt.js#L71)

***

### getAllPrompts

▸ **getAllPrompts**(): `any`\[]

Gets all prompts

*Returns*

`any`\[]

Array of all prompt objects

*Defined in*

[packages/cozy-client/src/models/prompt.js:62](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/prompt.js#L62)

***

### getDirective

▸ **getDirective**(`directiveId`): `any`

Gets a directive by its ID

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `directiveId` | `string` | The ID of the directive to retrieve |

*Returns*

`any`

The directive object or undefined if not found

*Defined in*

[packages/cozy-client/src/models/prompt.js:53](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/prompt.js#L53)

***

### getPrompt

▸ **getPrompt**(`promptId`): `any`

Gets a prompt by its ID

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `promptId` | `string` | The ID of the prompt to retrieve |

*Returns*

`any`

The prompt object or undefined if not found

*Defined in*

[packages/cozy-client/src/models/prompt.js:43](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/prompt.js#L43)

***

### setupPrompts

▸ **setupPrompts**(`promptData`): `void`

Sets up prompts and directives from prompt data

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `promptData` | `Object` | The JSON object containing prompts and directives |
| `promptData.directives` | `any`\[] | - |
| `promptData.prompts` | `any`\[] | Array of prompt objects |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/models/prompt.js:30](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/prompt.js#L30)
