import { isMobileApp, isAndroidApp, isIOS } from 'cozy-device-helper'

import CozyClient from '../CozyClient'
import { CordovaWindow } from '../types'
import logger from '../logger'
import { DOCTYPE_FILES } from '../const'

const ERROR_GET_DIRECTORY = 'Error to get directory'
const ERROR_WRITE_FILE = 'Error to write file'
const ERROR_GET_FILE = 'Error to get file'
const COZY_PATH = 'Cozy'
const COZY_FILES_PATH = isIOS() ? 'CozyDrive' : 'Cozy Drive'

/**
 * @typedef {object} FilesystemEntry
 */

/**
 * @type {CordovaWindow}
 */
// @ts-ignore
const win = window

/**
 * Get root path according the OS
 *
 * @returns {string}
 */
export const getRootPath = () => {
  return isAndroidApp()
    ? win.cordova.file.externalDataDirectory
    : win.cordova.file.dataDirectory
}

/**
 * Get the temporary root path according to the OS
 */
export const getTemporaryRootPath = () =>
  isAndroidApp()
    ? win.cordova.file.externalCacheDirectory
    : win.cordova.file.cacheDirectory

/**
 * Get Cozy path according to the OS
 *
 * @returns {string}
 */
export const getCozyPath = () => COZY_PATH + '/' + COZY_FILES_PATH + '/'

/**
 * Get entry of a path in the cordova.file location
 *
 * @param {string} path - Path wanting to be getted
 * @returns {Promise<FilesystemEntry>}
 */
export const getEntry = path =>
  new Promise((resolve, reject) => {
    win.resolveLocalFileSystemURL(path, resolve, err => {
      logger.error(`${path} could not be resolved: ${err.message}`)
      reject(err)
    })
  })

/**
 * Get Cozy location on the device
 */
export const getCozyEntry = () =>
  getEntry(getRootPath() + getCozyPath()).catch(() => createCozyPath())

/**
 * Create Cozy path on the device
 */
export const createCozyPath = () =>
  getEntry(getRootPath()).then(entry =>
    getDirectory(entry, COZY_PATH).then(entry =>
      getDirectory(entry, COZY_FILES_PATH)
    )
  )

/**
 * Get the directory according to its name
 *
 * @param {object} rootDirEntry - The root directory entry
 * @param {string} folderName - The folder's name
 */
export const getDirectory = (rootDirEntry, folderName) =>
  new Promise((resolve, reject) => {
    rootDirEntry.getDirectory(folderName, { create: true }, resolve, error => {
      logger.warn(ERROR_GET_DIRECTORY, folderName)
      logger.warn(error)
      reject(ERROR_GET_DIRECTORY)
    })
  })

/**
 * @param {object} fileEntry - The file entry
 * @param {object} dataObj - The data to be written
 */
export const writeFile = (fileEntry, dataObj) =>
  new Promise((resolve, reject) => {
    fileEntry.createWriter(fileWriter => {
      fileWriter.onwriteend = () => {
        resolve(fileEntry)
      }
      fileWriter.onerror = error => {
        logger.warn(ERROR_WRITE_FILE)
        logger.warn(error)
        reject(ERROR_WRITE_FILE)
      }
      fileWriter.write(dataObj)
    })
  })

/**
 * @param {object} dirEntry - The directory entry
 * @param {object} fileData - The file data
 * @param {string} fileName - The file name
 */
const saveFile = (dirEntry, fileData, fileName) =>
  new Promise((resolve, reject) => {
    dirEntry.getFile(
      fileName,
      { create: true, exclusive: false },
      fileEntry => {
        writeFile(fileEntry, fileData)
          .then(() => {
            resolve(fileEntry)
          })
          .catch(reject)
      },
      error => {
        logger.warn(ERROR_GET_FILE)
        logger.warn(error)
        reject(ERROR_GET_FILE)
      }
    )
  })

/**
 * Open a file in an other app
 *
 * @param {*} URI - URI to be opened
 * @param {*} mimetype - Mimetype of the opened file
 */
export const openFileWithCordova = (URI, mimetype) =>
  new Promise((resolve, reject) => {
    const callbacks = {
      error: reject,
      success: resolve
    }
    win.cordova.plugins.fileOpener2.open(URI, mimetype, callbacks)
  })

/**
 * @param {string} fileName - The file name
 */
export const deleteOfflineFile = async fileName => {
  const entry = await getCozyEntry()
  const fileEntry = await getEntry(`${entry.nativeURL}${fileName}`)
  return fileEntry.remove()
}

/**
 * @param {object} fileData - The file data
 * @param {string} fileName - The file name
 */
export const saveFileWithCordova = (fileData, fileName) =>
  getCozyEntry().then(entry => saveFile(entry, fileData, fileName))

/**
 * Save the document in the temporary folder
 *
 * @param {object} file - io.cozy.files document
 * @param {string} fileName - The file name
 */
export const temporarySave = (file, fileName) =>
  getEntry(getTemporaryRootPath()).then(entry =>
    saveFile(entry, file, fileName)
  )

/**
 * Save the document in the temporary folder and open it in an other app
 *
 * @param {Blob} blob - Binary of the file
 * @param {object} file - io.cozy.files document
 */
export const saveAndOpenWithCordova = (blob, file) => {
  return temporarySave(blob, file.name).then(entry =>
    openFileWithCordova(entry.nativeURL, file.mime)
  )
}

/**
 * @param {object} file - io.cozy.files document
 */
export const getNativeFile = async file => {
  const entry = await getCozyEntry()
  return getEntry(`${entry.nativeURL}${file.id}`)
}

/**
 * @param {object} file - io.cozy.files document
 */
export const openOfflineFile = async file => {
  const fileEntry = await getNativeFile(file)
  return openFileWithCordova(fileEntry.nativeURL, file.mime)
}

/**
 * openFileWith - Opens a file on a mobile device
 *
 * @param {CozyClient} client - The CozyClient instance
 * @param {object} file - io.cozy.files document
 */
export const openFileWith = async (client, file) => {
  if (isMobileApp() && win.cordova.plugins.fileOpener2) {
    let fileData
    try {
      fileData = await client
        .collection(DOCTYPE_FILES)
        .fetchFileContent(file.id)
    } catch (e) {
      throw e.status === 404 ? 'missing' : 'offline'
    }
    const blob = await fileData.blob()
    try {
      await fsnative.saveAndOpenWithCordova(blob, file)
    } catch (e) {
      throw 'noapp'
    }
  } else {
    throw 'noapp'
  }
}

const fsnative = {
  saveAndOpenWithCordova
}

export default fsnative
