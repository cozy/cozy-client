import { getCreatedByApp, hasBeenUpdatedByApp } from './utils'

test('getCreatedByApp', () => {
  expect(getCreatedByApp({ cozyMetadata: { createdByApp: 'banks' } })).toBe(
    'banks'
  )
  expect(getCreatedByApp({})).toBe(undefined)
})

test('hasBeenUpdatedByApp', () => {
  expect(
    hasBeenUpdatedByApp(
      { cozyMetadata: { updatedByApps: [{ slug: 'banks' }] } },
      'banks'
    )
  ).toBe(true)
  expect(
    hasBeenUpdatedByApp(
      { cozyMetadata: { updatedByApps: [{ slug: 'banks' }] } },
      'drive'
    )
  ).toBe(false)
  expect(hasBeenUpdatedByApp({}, 'drive')).toBe(false)
})
