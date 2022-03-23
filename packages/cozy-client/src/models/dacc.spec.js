import { checkMeasureParams } from './dacc'

describe('dacc', () => {
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
    expect(() => checkMeasureParams({ ...measure, value: null })).toThrow()
    expect(() =>
      checkMeasureParams({ ...measure, value: 'notacorrectvalue' })
    ).toThrow()
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
