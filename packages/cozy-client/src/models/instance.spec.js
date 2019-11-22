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
  },
  diskUsage: {
    data: {
      attributes: {
        quota: '400000000'
      }
    }
  }
}

const selftHostedInstance = {
  context: {
    data: {
      attributes: {}
    }
  },
  diskUsage: {
    data: {
      attributes: {
        quota: '6000000000000'
      }
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

  it('should return if the instance is a freemium one', () => {
    expect(instance.isFreemiumUser(noSelfHostedInstance)).toBe(true)
    expect(instance.isFreemiumUser(selftHostedInstance)).toBe(false)
  })

  it('should tell us that this instance is concerned by our offers', () => {
    expect(instance.shouldDisplayOffers(noSelfHostedInstance)).toBe(true)
  })
  it('should tell us that a selfhosted instance is not concerned by our offres', () => {
    expect(instance.shouldDisplayOffers(selftHostedInstance)).toBe(false)
  })
})
