[cozy-client](../README.md) / [Exports](../modules.md) / [models](models.md) / trigger

# Namespace: trigger

[models](models.md).trigger

## Variables

### triggerStates

• `Const` **triggerStates**: `Object`

Trigger states come from /jobs/triggers

*Type declaration*

| Name | Type |
| :------ | :------ |
| `getLastErrorType` | (`triggerState`: `any`) => `any` |
| `getLastExecution` | (`triggerState`: `any`) => `any` |
| `getLastSuccess` | (`triggerState`: `any`) => `any` |
| `getLastsuccess` | (`triggerState`: `any`) => `any` |
| `isErrored` | (`triggerState`: `any`) => `boolean` |

*Defined in*

[packages/cozy-client/src/models/trigger.js:17](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/trigger.js#L17)

***

### triggers

• `Const` **triggers**: `Object`

*Type declaration*

| Name | Type |
| :------ | :------ |
| `getAccountId` | (`trigger`: `any`) => `string` |
| `getKonnector` | (`trigger`: `any`) => `string` | `void` |
| `hasActionableError` | (`trigger`: `any`) => `boolean` |
| `isKonnectorWorker` | (`trigger`: `any`) => `boolean` |
| `isLatestErrorMuted` | (`trigger`: `any`, `account`: `any`) => `boolean` |

*Defined in*

[packages/cozy-client/src/models/trigger.js:38](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/trigger.js#L38)
