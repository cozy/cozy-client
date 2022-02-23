import { certifyFlagship } from './flagship-certification'
import { createMockClient } from '../mock'

import { getAppAttestationFromStore } from './store-attestation'

jest.mock('./store-attestation', () => ({
  getAppAttestationFromStore: jest.fn()
}))

const getClientMock = () => {
  const client = createMockClient({
    clientOptions: {
      oauth: {}
    }
  })

  client.stackClient.oauthOptions = {
    clientID: 'SOME_CLIENT_ID',
    registrationAccessToken: 'SOME_REGISTRATION_ACCESS_TOKEN'
  }

  return client
}

const mockCorrectChallengeRequest = client => {
  client.stackClient.fetchJSON.mockResolvedValueOnce({
    nonce: 'SOME_NONCE'
  })
}

const mockCorrectStoreApiRequest = () => {
  getAppAttestationFromStore.mockResolvedValueOnce({
    platform: 'android',
    attestation: 'SOME_STORE_ATTESTATION',
    keyId: 'SOME_KEY_ID'
  })
}

const mockCorrectCertificationConfig = () => {
  return {
    androidSafetyNetApiKey: 'SOME_ANDROID_SAFETY_NET_API_KEY'
  }
}

const getFetchJsonPostParams = (url, body = null) => {
  return [
    'POST',
    url,
    body,
    {
      headers: {
        Authorization: 'Bearer SOME_REGISTRATION_ACCESS_TOKEN'
      }
    }
  ]
}

describe('certifyFlagship', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    getAppAttestationFromStore.mockReset()
  })

  it('should ask challenge to cozy-stack, call the store API and then send the result to the stack', async () => {
    const client = getClientMock()

    const certificationConfig = mockCorrectCertificationConfig()

    mockCorrectChallengeRequest(client)

    mockCorrectStoreApiRequest()

    await certifyFlagship(certificationConfig, client)

    expect(client.stackClient.fetchJSON).toHaveBeenCalledWith(
      ...getFetchJsonPostParams(`/auth/clients/SOME_CLIENT_ID/challenge`)
    )

    expect(getAppAttestationFromStore).toHaveBeenCalledWith('SOME_NONCE', {
      androidSafetyNetApiKey: 'SOME_ANDROID_SAFETY_NET_API_KEY'
    })

    expect(client.stackClient.fetchJSON).toHaveBeenCalledWith(
      ...getFetchJsonPostParams(`/auth/clients/SOME_CLIENT_ID/attestation`, {
        platform: 'android',
        attestation: 'SOME_STORE_ATTESTATION',
        challenge: 'SOME_NONCE',
        keyId: 'SOME_KEY_ID'
      })
    )
  })

  it('should throw if no certification config is provided', async () => {
    const client = getClientMock()

    const certificationConfig = undefined

    mockCorrectChallengeRequest(client)

    client.stackClient.fetchJSON.mockImplementationOnce(() => {
      throw Error('SOME_STACK_CERTIFICATION_ERROR')
    })

    mockCorrectStoreApiRequest()

    await expect(certifyFlagship(certificationConfig, client)).rejects.toEqual(
      new Error(
        '[FLAGSHIP_CERTIFICATION] Certification configuration is not set'
      )
    )

    expect(client.stackClient.fetchJSON).not.toHaveBeenCalled()
    expect(getAppAttestationFromStore).not.toHaveBeenCalled()
  })
})
