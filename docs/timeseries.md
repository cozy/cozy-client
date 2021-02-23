# How-to manipulate time series

## Save time series

This example shows how to save a time series of an electrical consumption:

```js
const electricalConsumption = {
  dataType: 'electricity',
  startDate: "2021-02-14T00:30:00+01:00",
  endDate: "2021-02-14T02:30:00+01:00",
  source: "enedis.fr",
  theme: "energy"
  series: [
    {
      date: "2021-02-14T00:30:00+01:00",
      consumption: 474
    },
    {
      date: "2021-02-14T01:30:00+01:00",
      consumption: 184
    },
    {
      date: "2021-02-14T02:30:00+01:00",
      consumption: 152
    }
  ]
}
await saveTimeSerie(client, electricalConsumption) 
```

## Retrieve time series

This example shows how to fetch time series of an electrical consumption,
for a specific time interval and data source:

```js
const params = {
  dataType: 'electricity',
  startDate: "2021-02-14",
  endDate: "2021-02-15",
  source: "enedis.fr",
  limit: 100
}
const electricalConsumption = await fetchTimeSerieByIntervalAndSource(client, params) 
```