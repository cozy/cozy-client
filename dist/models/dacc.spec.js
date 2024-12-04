import { checkMeasureParams, buildAggregateParams } from './dacc'

describe('checkMeasureParams', () => {
  const measure = {
    value: 42,
    measureName: 'theanswer',
    startDate: '2022-01-01',
    createdBy: 'DeepThought'
  }

  it('should not throw when all params are corrects', () => {
    expect(() => checkMeasureParams(measure)).not.toThrow()
  })

  it('should not throw when all params are corrects with groups', () => {
    const measureWithGroups = {
      ...measure,
      group1: { a: 1 },
      group2: { b: 1 },
      group3: { c: 1 }
    }
    expect(() => checkMeasureParams(measureWithGroups)).not.toThrow()
  })

  it('should throw an error when createdBy is missing or malformed', () => {
    expect(() => checkMeasureParams({ ...measure, createdBy: null })).toThrow()
    expect(() => checkMeasureParams({ ...measure, createdBy: 123 })).toThrow()
  })

  it('should throw an error when value is missing or malformed', () => {
    const measureNoValue = { ...measure }
    delete measureNoValue.value
    expect(() => checkMeasureParams(measureNoValue)).toThrow()
    expect(() => checkMeasureParams({ ...measure, value: null })).toThrow()
    expect(() =>
      checkMeasureParams({ ...measure, value: 'notacorrectvalue' })
    ).toThrow()
  })

  it('should not throw an error when value is 0', () => {
    expect(() => checkMeasureParams({ ...measure, value: 0 })).not.toThrow()
  })

  it('should throw an error when measureName is missing or malformed', () => {
    expect(() =>
      checkMeasureParams({ ...measure, measureName: null })
    ).toThrow()
    expect(() => checkMeasureParams({ ...measure, measureName: 10 })).toThrow()
  })

  it('should throw an error when startDate is missing or malformed', () => {
    expect(() => checkMeasureParams({ ...measure, startDate: null })).toThrow()
    expect(() => checkMeasureParams({ ...measure, startDate: 123 })).toThrow()
    expect(() =>
      checkMeasureParams({ ...measure, startDate: '01 January 2012' })
    ).toThrow()
    expect(() =>
      checkMeasureParams({ ...measure, startDate: '2022:01:01' })
    ).toThrow()
  })

  it('should throw an error when groups are not objects', () => {
    expect(() => checkMeasureParams({ ...measure, group1: '123' })).toThrow()
    expect(() =>
      checkMeasureParams({ ...measure, group1: { a: 1 }, group2: '456' })
    ).toThrow()
    expect(() =>
      checkMeasureParams({
        ...measure,
        group1: { a: 1 },
        group2: { b: 1 },
        group3: '789'
      })
    ).toThrow()
  })

  it('should throw an error when groups are empty objects', () => {
    expect(() => checkMeasureParams({ ...measure, group1: {} })).toThrow()
    expect(() =>
      checkMeasureParams({ ...measure, group1: { a: 1 }, group2: {} })
    ).toThrow()
    expect(() =>
      checkMeasureParams({
        ...measure,
        group1: { a: 1 },
        group2: { b: 1 },
        group3: {}
      })
    ).toThrow()
  })

  it('should throw an error when groups order is not respected', () => {
    expect(() => checkMeasureParams({ ...measure, group2: { b: 1 } })).toThrow()
    expect(() => checkMeasureParams({ ...measure, group3: { c: 1 } })).toThrow()
    expect(() =>
      checkMeasureParams({
        ...measure,
        group1: { a: 1 },
        group3: { c: 1 }
      })
    ).toThrow()
    expect(() =>
      checkMeasureParams({ ...measure, group2: { b: 1 }, group3: { c: 1 } })
    ).toThrow()
  })
})

describe('buildAggregateParams', () => {
  beforeAll(() => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date(2022, 5, 1).valueOf())
  })
  it('should throw if measure name is not correct', () => {
    expect(() => buildAggregateParams({})).toThrow()
    expect(() => buildAggregateParams({ measurName: 42 })).toThrow()
  })

  it('should throw if dates are not correct', () => {
    expect(() =>
      buildAggregateParams({
        measureName: 'test',
        startDate: 'Lundi 10 août 2021'
      })
    ).toThrow()
    expect(() =>
      buildAggregateParams({
        measureName: 'test',
        endDate: 'Lundi 10 août 2021'
      })
    ).toThrow()
  })
  it('should build dates if none provided', () => {
    expect(buildAggregateParams({ measureName: 'test' })).toEqual({
      measureName: 'test',
      startDate: '1970-01-01T00:00:00.000Z',
      endDate: new Date(2022, 5, 1).toISOString()
    })
  })
  it('should build dates if startDate provided', () => {
    expect(
      buildAggregateParams({ measureName: 'test', startDate: '2021-08-10' })
    ).toEqual({
      measureName: 'test',
      startDate: '2021-08-10',
      endDate: new Date(2022, 5, 1).toISOString()
    })
  })
  it('should build dates if endDate provided', () => {
    expect(
      buildAggregateParams({ measureName: 'test', endDate: '2022-05-02' })
    ).toEqual({
      measureName: 'test',
      startDate: '1970-01-01T00:00:00.000Z',
      endDate: '2022-05-02'
    })
  })
})
