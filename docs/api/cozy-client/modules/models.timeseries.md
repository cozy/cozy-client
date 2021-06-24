[cozy-client](../README.md) / [Exports](../modules.md) / [models](models.md) / timeseries

# Namespace: timeseries

[models](models.md).timeseries

## Interfaces

*   [TimeSeries](../interfaces/models.timeseries.timeseries.md)
*   [TimeSeriesJSONAPI](../interfaces/models.timeseries.timeseriesjsonapi.md)

## Functions

### fetchTimeSeriesByIntervalAndSource

▸ `Const` **fetchTimeSeriesByIntervalAndSource**(`client`, `__namedParameters`): `Promise`<[`TimeSeriesJSONAPI`](../interfaces/models.timeseries.timeseriesjsonapi.md)>

Helper to retrieve time series by their date interval and source.

**`property`** data {Array<TimeSeries>} - The JSON-API data response

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `any` | The CozyClient instance |
| `__namedParameters` | `Object` | - |
| `__namedParameters.dataType` | `string` | - |
| `__namedParameters.endDate` | `Date` | - |
| `__namedParameters.limit` | `number` | - |
| `__namedParameters.source` | `string` | - |
| `__namedParameters.startDate` | `Date` | - |

*Returns*

`Promise`<[`TimeSeriesJSONAPI`](../interfaces/models.timeseries.timeseriesjsonapi.md)>

The TimeSeries found by the query in JSON-API format

*Defined in*

[packages/cozy-client/src/models/timeseries.js:78](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/timeseries.js#L78)

***

### saveTimeSeries

▸ `Const` **saveTimeSeries**(`client`, `timeseriesOption`): `Promise`<`any`>

Helper to save a time series document.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `any` | The CozyClient instance |
| `timeseriesOption` | [`TimeSeries`](../interfaces/models.timeseries.timeseries.md) | The time series to save |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/models/timeseries.js:40](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/timeseries.js#L40)
