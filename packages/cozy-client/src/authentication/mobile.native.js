import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { Linking } from 'react-native'

/**
 * Opens a ReactNative InAppBrowser
 * and resolves with the URL containing
 * the token
 *
 * @param {string} url
 * @returns {Promise}
 */

export const authenticateWithReactNativeInAppBrowser = async url => {
  return new Promise((resolve, reject) => {
    InAppBrowser.open(url, {
      // iOS Properties
      readerMode: false,
      animated: true,
      modalPresentationStyle: 'fullScreen',
      modalTransitionStyle: 'coverVertical',
      modalEnabled: true,
      enableBarCollapsing: false,
      // Android Properties
      showTitle: true,
      toolbarColor: '#6200EE',
      secondaryToolbarColor: 'black',
      enableUrlBarHiding: true,
      enableDefaultShare: true,
      forceCloseOnRedirection: false,
      // Specify full animation resource identifier(package:anim/name)
      // or only resource name(in case of animation bundled with app).
      animations: {
        startEnter: 'slide_in_right',
        startExit: 'slide_out_left',
        endEnter: 'slide_in_left',
        endExit: 'slide_out_right'
      }
    })
    const removeListener = () => {
      Linking.removeEventListener('url', linkListener)
    }

    const linkListener = ({ url }) => {
      const accessCode = /\?access_code=(.+)$/.test(url)
      const state = /\?state=(.+)$/.test(url)

      if (accessCode || state) {
        resolve(url)
        removeListener()
        InAppBrowser.close()
      }
    }

    Linking.addEventListener('url', linkListener)
  })
}

export const authFunction = authenticateWithReactNativeInAppBrowser
