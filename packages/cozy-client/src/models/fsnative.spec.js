import { isMobileApp } from 'cozy-device-helper'

import { createMockClient } from '../mock'

import fsnative, { getRootPath, openFileWith } from './fsnative'

jest.spyOn(fsnative, 'saveAndOpenWithCordova').mockReturnValue()

jest.mock('cozy-device-helper', () => ({
  ...jest.requireActual('cozy-device-helper'),
  isMobileApp: jest.fn()
}))

const ANDROID_ROOT_DIRECTORY = 'externalDataDirectory'
const IOS_ROOT_DIRECTORY = 'dataDirectory'
const EXTERNAL_CACHE_DIRECTORY = 'externalCacheDirectory'
const CACHE_DIRECTORY = 'cacheDirectory'
const ANDROID = 'android'
const IOS = 'ios'

describe('getRootPath', () => {
  beforeEach(() => {
    window.cordova = {
      file: {
        externalDataDirectory: ANDROID_ROOT_DIRECTORY,
        dataDirectory: IOS_ROOT_DIRECTORY
      },
      platformId: ANDROID
    }
  })

  it('should get root path', () => {
    window.cordova.platformId = ANDROID
    expect(getRootPath()).toEqual(ANDROID_ROOT_DIRECTORY)
    window.cordova.platformId = IOS
    expect(getRootPath()).toEqual(IOS_ROOT_DIRECTORY)
  })
})

describe('openFileWith', () => {
  const mockClient = createMockClient({})
  const blobMock = jest.fn()
  const file = { id: 'fileId' }

  beforeEach(() => {
    jest.resetAllMocks()
    isMobileApp.mockReturnValue(true)

    mockClient.collection = jest.fn().mockReturnValue(mockClient)
    mockClient.fetchFileContent = jest.fn().mockReturnValue({
      blob: blobMock
    })

    window.cordova = {
      file: {
        externalCacheDirectory: EXTERNAL_CACHE_DIRECTORY,
        cacheDirectory: CACHE_DIRECTORY
      },
      plugins: { fileOpener2: {} }
    }
  })

  it('opens the file with cordova', async () => {
    blobMock.mockReturnValue('fake file blob')
    await openFileWith(mockClient, file)
    expect(mockClient.fetchFileContent).toHaveBeenCalledWith(file.id)
    expect(fsnative.saveAndOpenWithCordova).toHaveBeenCalledWith(
      'fake file blob',
      file
    )
  })

  it('errors when it fails to download the file without 404', async () => {
    expect.assertions(1)
    mockClient.fetchFileContent = jest.fn().mockRejectedValue(new Error())

    try {
      await openFileWith(mockClient, file)
    } catch (e) {
      expect(e).toMatch('offline')
    }
  })

  it('errors when it fails to download the file with 404', async () => {
    expect.assertions(1)
    const error = new Error('Not Found')
    error.status = 404
    mockClient.fetchFileContent = jest.fn().mockRejectedValue(error)

    try {
      await openFileWith(mockClient, file)
    } catch (e) {
      expect(e).toMatch('missing')
    }
  })

  it('errors when opening the filewith cordova fails', async () => {
    expect.assertions(1)
    fsnative.saveAndOpenWithCordova.mockRejectedValue(new Error())

    try {
      await openFileWith(mockClient, file)
    } catch (e) {
      expect(e).toMatch('noapp')
    }
  })

  it('errors when the plugin is not present', async () => {
    expect.assertions(1)
    window.cordova.plugins.fileOpener2 = null

    try {
      await openFileWith(mockClient, file)
    } catch (e) {
      expect(e).toMatch('noapp')
    }
  })
})
