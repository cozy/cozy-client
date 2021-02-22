import { saveTimeSerie } from './timeseries'

let mockedClient

describe('save time series', () => {
  beforeEach(() => {
    mockedClient = {
      save: jest.fn()
    }
  })
  it('should throw an error for missing dates', async () => {
    const timeserie = {
      dataType: 'temp',
      serie: []
    }
    await expect(
      saveTimeSerie(mockedClient, { ...timeserie, startDate: '2021-01-01' })
    ).rejects.toThrow()
    await expect(
      saveTimeSerie(mockedClient, { ...timeserie, endDate: '2021-01-01' })
    ).rejects.toThrow()
  })
  it('should throw an error for invalid dates', async () => {
    const timeserie = {
      dataType: 'temp',
      serie: []
    }
    await expect(
      saveTimeSerie(mockedClient, { ...timeserie, startDate: 1234 })
    ).rejects.toThrow()
    await expect(
      saveTimeSerie(mockedClient, { ...timeserie, endDate: 1234 })
    ).rejects.toThrow()
  })
  it('should throw an error for missing datatype', async () => {
    const timeserie = {
      startDate: '2021-01-01',
      endDate: '2021-01-02',
      serie: [{ temp: 23 }]
    }
    await expect(saveTimeSerie(mockedClient, timeserie)).rejects.toThrow()
  })
  it('should save the timeserie if the format is valid', async () => {
    const timeserie = {
      startDate: '2021-01-01',
      endDate: '2021-01-02',
      dataType: 'temp',
      serie: [{ temp: 23 }],
      source: 'sensor',
      theme: 'weather'
    }
    await saveTimeSerie(mockedClient, timeserie)
    let savedTimeserie = { ...timeserie, _type: 'io.cozy.timeseries.temp' }
    delete savedTimeserie.dataType
    expect(mockedClient.save).toHaveBeenCalledWith(savedTimeserie)
  })
})
