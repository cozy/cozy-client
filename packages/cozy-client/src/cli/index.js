import http from 'http'
import opn from 'opn'
import fs from 'fs'

import merge from 'lodash/merge'
import enableDestroy from 'server-destroy'

import CozyClient from '../CozyClient'
import logger from 'cozy-logger'

const log = logger.namespace('create-cli-client')

global.fetch = require('isomorphic-fetch')
global.btoa = require('btoa')

const createCallbackServer = serverOptions => {
  const server = http.createServer((request, response) => {
    if (request.url.indexOf(serverOptions.route) === 0) {
      serverOptions.onAuthentication(request.url)
      response.write('Authentication successful, you can close this page.')
      response.end()
      setTimeout(() => {
        server.destroy()
      }, 1000)
    }
  })
  server.listen(serverOptions.port, () => {
    serverOptions.onListen()
  })
  enableDestroy(server)
  return server
}

/**
 * Creates a function suitable for usage with CozyClient::startOAuthFlow
 *
 * Starts a local server. The stack upon user authentication will
 * redirect to this local server with a URL containing credentials.
 * The callback resolves with this authenticationURL which continues
 * the authentication flow inside startOAuthFlow.
 *
 * When the server is started, the authentication page is opened on the
 * desktop browser of the user.
 *
 * @private
 */
const mkServerFlowCallback = serverOptions => authenticationURL =>
  new Promise((resolve, reject) => {
    const server = createCallbackServer({
      ...serverOptions,
      onAuthentication: callbackURL => {
        log('debug', 'Authenticated, Shutting server down')
        resolve('http://localhost:8000/' + callbackURL)
        setTimeout(() => {
          // Is there a way to call destroy only after all requests have
          // been completely served ? Otherwise we close the server while
          // the successful oauth page is being served and the page does
          // not get loaded on the client side.
          server.destroy()
        }, 1000)
      },
      onListen: () => {
        log(
          'debug',
          'OAuth callback server started, waiting for authentication'
        )
        opn(authenticationURL, { wait: false })
      }
    })

    setTimeout(() => {
      reject('Timeout for authentication')
    }, 30 * 1000)
  })

const DEFAULT_SERVER_OPTIONS = {
  port: 3333,
  route: '/do_access',
  getSavedCredentials: clientOptions => {
    if (!clientOptions.oauth.softwareID) {
      throw new Error('Please provide oauth.softwareID in your clientOptions.')
    }
    const sluggedURI = clientOptions.uri
      .replace(/https?:\/\//, '')
      .replace(/\./g, '-')
    return `/tmp/cozy-client-oauth-${sluggedURI}-${clientOptions.oauth.softwareID}.json`
  }
}

/**
 * Parses a JSON from a file
 * Returns null in case of error
 *
 * @private
 */
const readJSON = filename => {
  try {
    if (!fs.existsSync(filename)) {
      return null
    }
    const res = JSON.parse(fs.readFileSync(filename).toString())
    return res
  } catch (e) {
    console.warn(`Could not load ${filename} (${e.message})`)
    return null
  }
}

/**
 * Creates a client with interactive authentication.
 *
 * - Will start an OAuth flow and open an authentication page
 * - Starts a local server to listen for the oauth callback
 * - Resolves with the client after user authentication
 *
 * @params {Object} clientOptions Same as CozyClient::constructor.
 *
 * @example
 * ```
 * import { createClientInteractive } from 'cozy-client/dist/cli'
 * await createClientInteractive({
 *   uri: 'http://cozy.tools:8080',
 *   scope: ['io.cozy.bills'],
 *   oauth: {
 *     softwareID: 'my-cli-application-using-bills'
 *   }
 * })
 * ```
 */
const createClientInteractive = (clientOptions, serverOpts) => {
  const serverOptions = merge(serverOpts, DEFAULT_SERVER_OPTIONS)

  const mergedClientOptions = merge(
    {
      oauth: {
        clientName: 'cli-client',
        redirectURI: `http://localhost:${serverOptions.port}${serverOptions.route}`
      }
    },
    clientOptions
  )
  const getSavedCredentials = serverOptions.getSavedCredentials
  const savedCredentialsFilename = getSavedCredentials(mergedClientOptions)
  const savedCredentials = readJSON(savedCredentialsFilename)

  const client = new CozyClient(mergedClientOptions)

  if (savedCredentials) {
    log('debug', `Using saved credentials in ${savedCredentialsFilename}`)
    client.stackClient.setToken(savedCredentials)
    return client
  }

  log('debug', `Starting OAuth flow`)
  return new Promise(async (resolve, reject) => {
    const resolveWithClient = () => {
      resolve(client)
      log('debug', `Saving credentials to ${savedCredentialsFilename}`)
      fs.writeFileSync(
        savedCredentialsFilename,
        JSON.stringify(client.stackClient.token)
      )
    }
    await client.startOAuthFlow(mkServerFlowCallback(serverOptions))
    resolveWithClient()
  })
}

export { createClientInteractive }
