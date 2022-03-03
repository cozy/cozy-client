import { saveTimeSeries } from './timeseries'

let mockedClient

describe('save time series', () => {
  beforeEach(() => {
    mockedClient = {
      save: jest.fn()
    }
  })
  it('should throw an error for missing dates', async () => {
    const timeseries = {
      dataType: 'temp',
      series: []
    }
    await expect(
      saveTimeSeries(mockedClient, { ...timeseries, startDate: '2021-01-01' })
    ).rejects.toThrow()
    await expect(
      saveTimeSeries(mockedClient, { ...timeseries, endDate: '2021-01-01' })
    ).rejects.toThrow()
  })
  it('should throw an error for invalid dates', async () => {
    const timeseries = {
      dataType: 'temp',
      series: []
    }
    await expect(
      saveTimeSeries(mockedClient, { ...timeseries, startDate: 1234 })
    ).rejects.toThrow()
    await expect(
      saveTimeSeries(mockedClient, { ...timeseries, endDate: 1234 })
    ).rejects.toThrow()
  })
  it('should throw an error for missing datatype', async () => {
    const timeseries = {
      startDate: '2021-01-01',
      endDate: '2021-01-02',
      series: [{ temp: 23 }]
    }
    await expect(saveTimeSeries(mockedClient, timeseries)).rejects.toThrow()
  })
  it('should save the timeserie if the format is valid', async () => {
    const timeseries = {
      startDate: '2021-01-01',
      endDate: '2021-01-02',
      dataType: 'temp',
      series: [{ temp: 23 }],
      source: 'sensor',
      theme: 'weather'
    }
    await saveTimeSeries(mockedClient, timeseries)
    let savedTimeserie = { ...timeseries, _type: 'io.cozy.timeseries.temp' }
    delete savedTimeserie.dataType
    expect(mockedClient.save).toHaveBeenCalledWith(savedTimeserie)
  })
})
