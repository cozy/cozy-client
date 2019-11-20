import { instance } from './'

const noSelfHostedInstance = {
  context: {
    data: {
      attributes: {
        manager_url: 'https://manager.cozy.cc',
        enable_premium_links: true
      }
    }
  },
  instance: {
    data: {
      attributes: {
        uuid: '1234'
      }
    }
  }
}

const selftHostedInstance = {
  context: {
    data: {
      attributes: {}
    }
  }
}
describe('instance', () => {
  it('should test if self hosted or not', () => {
    expect(instance.isSelfHosted(noSelfHostedInstance)).toBe(false)
    expect(instance.isSelfHosted(selftHostedInstance)).toBe(true)
  })

  it('should test if premium links are on', () => {
    expect(instance.arePremiumLinksEnabled(noSelfHostedInstance)).toBe(true)
    expect(instance.arePremiumLinksEnabled(selftHostedInstance)).toBe(false)
  })

  it('should get uuid of the instance', () => {
    expect(instance.getUuid(noSelfHostedInstance)).toBe('1234')
    expect(instance.getUuid(selftHostedInstance)).toBe(undefined)
  })
})
