import * as fsnative from './fsnative'

const ANDROID_ROOT_DIRECTORY = 'externalRootDirectory'
const IOS_ROOT_DIRECTORY = 'dataDirectory'
const ANDROID = 'android'
const IOS = 'ios'

describe('fsnative', () => {
  beforeEach(() => {
    window.cordova = {
      file: {
        externalRootDirectory: ANDROID_ROOT_DIRECTORY,
        dataDirectory: IOS_ROOT_DIRECTORY
      },
      platformId: ANDROID
    }
  })

  it('should get root path', () => {
    window.cordova.platformId = ANDROID
    expect(fsnative.getRootPath()).toEqual(ANDROID_ROOT_DIRECTORY)
    window.cordova.platformId = IOS
    expect(fsnative.getRootPath()).toEqual(IOS_ROOT_DIRECTORY)
  })
})
