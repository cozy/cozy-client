/* global prompt */
import { REGISTRATION_ABORT } from '../const'
import {
  hasInAppBrowserPlugin,
  hasSafariPlugin,
  isIOSApp
} from 'cozy-device-helper'
import { CordovaWindow } from '../types'
//@ts-ignore
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
//@ts-ignore
import { Linking } from 'react-native'

/**
 * @type {CordovaWindow}
 */
// @ts-ignore
const win = typeof window !== 'undefined' ? window : null

const authenticateWithSafari = url => {
  return new Promise((resolve, reject) => {
    win.SafariViewController.show(
      {
        url: url,
        transition: 'curl' // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
        // enterReaderModeIfAvailable: readerMode, // default false
        // tintColor: "#00ffff", // default is ios blue
        // barColor: "#0000ff", // on iOS 10+ you can change the background color as well
        // controlTintColor: "#ffffff" // on iOS 10+ you can override the default tintColor
      },
      // this success handler will be invoked for the lifecycle events 'opened', 'loaded' and 'closed'
      result => {
        if (result.event === 'closed') {
          reject(new Error(REGISTRATION_ABORT))
        }
      },
      error => {
        console.log('KO: ' + error)
        reject(new Error(REGISTRATION_ABORT))
      }
    )

    const handle = win.handleOpenURL
    win.handleOpenURL = url => {
      win.SafariViewController.hide()
      resolve(url)
      if (handle) {
        win.handleOpenURL = handle
      }
    }
  })
}

const authenticateWithInAppBrowser = url => {
  return new Promise((resolve, reject) => {
    const target = '_blank'
    const options = 'clearcache=yes,zoom=no'
    const inAppBrowser = win.cordova.InAppBrowser.open(url, target, options)

    const removeListener = () => {
      inAppBrowser.removeEventListener('loadstart', onLoadStart)
      inAppBrowser.removeEventListener('exit', onExit)
    }

    const onLoadStart = ({ url }) => {
      const accessCode = /\?access_code=(.+)$/.test(url)
      const state = /\?state=(.+)$/.test(url)

      if (accessCode || state) {
        resolve(url)
        removeListener()
        inAppBrowser.close()
      }
    }

    const onExit = () => {
      reject(new Error(REGISTRATION_ABORT))
      removeListener()
      inAppBrowser.close()
    }

    inAppBrowser.addEventListener('loadstart', onLoadStart)
    inAppBrowser.addEventListener('exit', onExit)
  })
}

export const authenticateWithReactNativeInAppBrowser = url => {
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

export const authenticateWithCordova = async url => {
  if (isIOSApp() && (await hasSafariPlugin())) {
    return authenticateWithSafari(url)
  } else if (hasInAppBrowserPlugin()) {
    return authenticateWithInAppBrowser(url)
  } else {
    /**
     * for dev purpose:
     * In oauth workflow, the server displays an authorization page
     * User must accept to give permission then the server gives an url
     * with query parameters used by cozy-client-js to initialize itself.
     *
     * This hack let developers open the authorization page in a new tab
     * then get the "access_code" url and paste it in the prompt to let the
     * application initialize and redirect to other pages.
     */
    console.log(url)
    return new Promise(resolve => {
      setTimeout(() => {
        const token = prompt('Paste the url here:')
        resolve(token)
      }, 5000)
    })
  }
}

const isReactNative = () => {
  return typeof navigator != 'undefined' && navigator.product == 'ReactNative'
}

export const authFunction = isReactNative()
  ? authenticateWithReactNativeInAppBrowser
  : authenticateWithCordova
