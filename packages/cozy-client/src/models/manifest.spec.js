import {
  sanitizeCategories,
  sanitize as sanitizeManifest,
  getIdentifier,
  getCronFromFrequency,
  getCronFromKonnector,
  randomDayTime
} from './manifest'

describe('sanitizeCategories', () => {
  it('should return the list of the provided expected categories correctly', () => {
    // all of these categories is authorized by config/categories.json
    // so it won't be filtered
    const categories = [
      'cozy',
      'isp',
      'partners',
      'press',
      'shopping',
      'telecom'
    ]
    expect(sanitizeCategories(categories)).toEqual(categories)
  })
  it('should filter unwanted categories', () => {
    // pressingggg is not allowed as category
    const categories = [
      'cozy',
      'isp',
      'partners',
      'pressingggg',
      'shopping',
      'telecom'
    ]
    expect(sanitizeCategories(categories)).toEqual(
      categories.filter(c => c !== 'pressingggg')
    )
  })
  it('should return "others" as category if no categories provided', () => {
    expect(sanitizeCategories([])).toEqual(['others'])
    expect(sanitizeCategories(null)).toEqual(['others'])
  })
  it('should return "others" as category if categories after filtering is empty', () => {
    // pressingggg is not allowed as category
    expect(sanitizeCategories(['pressingggg'])).toEqual(['others'])
  })
})

describe('sanitizeManifest', () => {
  const baseMan = { slug: 'mock' }

  it('should handle legacy category property', () => {
    const testCategory = 'cozy'
    expect(
      sanitizeManifest({ slug: 'mock', category: testCategory })
    ).toStrictEqual({
      slug: 'mock',
      categories: [testCategory]
    })
  })
  it('should handle legacy name property locales ("en" only)', () => {
    const testName = 'Mock'
    expect(
      sanitizeManifest({
        slug: 'mock',
        name: {
          en: testName
        }
      })
    ).toEqual(
      expect.objectContaining({
        slug: 'mock',
        name: testName
      })
    )
  })

  it('should transform available_version property to availableVersion', () => {
    const testVersion = '3.0.0'
    const man = sanitizeManifest({
      slug: 'mock',
      available_version: testVersion
    })
    expect(man.availableVersion).toBe('3.0.0')
    expect(man).not.toHaveProperty('available_version')
  })

  it('should remove "fields" if fields is null', () => {
    const current = {
      fields: null
    }
    const result = sanitizeManifest(current)
    expect(result.fields).toBe(null)
  })

  it("shouldn't modify if fields is undefined", () => {
    const current = {}
    const result = sanitizeManifest(current)
    expect(result.fields).toBe(undefined)
  })

  it('should not mutate source manifest', () => {
    const current = {
      fields: {
        username: {
          type: 'text',
          required: {
            value: 'true'
          }
        },
        passphrase: {
          type: 'password'
        },
        birthdate: {
          type: 'date'
        }
      }
    }

    sanitizeManifest(current)
    expect(current).toEqual({
      fields: {
        username: {
          type: 'text',
          required: {
            value: 'true'
          }
        },
        passphrase: {
          type: 'password'
        },
        birthdate: {
          type: 'date'
        }
      }
    })
  })

  it('should remove old property advancedFields in fields', () => {
    const oldManifest = {
      fields: {
        login: {
          type: 'text'
        },
        password: {
          type: 'password'
        },
        advancedFields: {
          folderPath: {
            advanced: true,
            isRequired: false
          }
        }
      }
    }

    const result = sanitizeManifest(oldManifest)
    expect(result.fields.advancedFields).toBeUndefined()
  })

  it('should not add any identifier', () => {
    const current = {
      fields: {
        passphrase: {
          required: true,
          type: 'password'
        }
      }
    }

    const result = sanitizeManifest(current)
    expect(result.fields.passphrase.role).not.toBe('identifier')
    expect(Object.keys(result.fields).length).toBe(1)
  })

  it('should set role=identifier for login', () => {
    const current = {
      fields: {
        login: { type: 'text' },
        password: { type: 'password' }
      }
    }
    const result = sanitizeManifest(current)
    expect(result.fields.login.role).toBe('identifier')
  })

  it('should set first non-password field as role=identifier', () => {
    const current = {
      fields: {
        password: { type: 'password' },
        plop: { type: 'text' },
        foo: { type: 'date' }
      }
    }
    const result = sanitizeManifest(current)
    expect(result.fields.plop.role).toBe('identifier')
    expect(result.fields.foo.role).not.toBe('identifier')
  })

  const legacyLoginFieldsTest = [
    'login',
    'identifier',
    'new_identifier',
    'email'
  ]
  for (let name of legacyLoginFieldsTest) {
    let inputLegacy = {
      fields: {
        password: { type: 'password' },
        plop: { type: 'text' }
      }
    }
    inputLegacy.fields[name] = { type: 'text' }
    it('should set role=identifier to ' + name, () => {
      const result = sanitizeManifest(inputLegacy)
      expect(result.fields[name].role).toBe('identifier')
      expect(result.fields.plop.role).not.toBe('identifier')
    })
  }

  it('should set only one identifier', () => {
    const current = {
      fields: {
        identifier: { type: 'text' },
        mail: { type: 'email' },
        login: { type: 'text' },
        new_identifier: { type: 'text' }
      }
    }
    const result = sanitizeManifest(current)
    const identifiers = Object.keys(result.fields).filter(
      name => result.fields[name].role === 'identifier'
    )
    expect(identifiers.length).toBe(1)
  })

  it('should set only one identifier even if there is many role=identifier in the manifest', () => {
    const current = {
      fields: {
        identifier: { type: 'text' },
        mail: { type: 'email', role: 'identifier' },
        login: { type: 'text', role: 'identifier' },
        new_identifier: { type: 'text', role: 'identifier' }
      }
    }
    const result = sanitizeManifest(current)
    const identifiers = Object.keys(result.fields).filter(
      name => result.fields[name].role === 'identifier'
    )
    expect(identifiers.length).toBe(1)
  })

  it('should set only one identifier even if there is no password fields', () => {
    const current = {
      fields: {
        plop1: { type: 'text' },
        plop2: { type: 'text' },
        plop3: { type: 'text' },
        plop4: { type: 'text' }
      }
    }
    const result = sanitizeManifest(current)
    const identifiers = Object.keys(result.fields).filter(
      name => result.fields[name].role === 'identifier'
    )
    expect(identifiers.length).toBe(1)
  })

  it('should keep the identifier priority', () => {
    const current = {
      fields: {
        identifier: { type: 'text' },
        mail: { type: 'email' },
        login: { type: 'text' },
        new_identifier: { type: 'text' }
      }
    }
    const result = sanitizeManifest(current)
    expect(result.fields.login.required).toBe(true)
  })

  it('should set required=true as default value in fields', () => {
    const current = {
      fields: {
        login: { type: 'text' },
        password: { type: 'password' },
        gender: { type: 'text', required: false },
        country: { type: 'text' }
      }
    }
    const result = sanitizeManifest(current)
    expect(result.fields.login.required).toBe(true)
    expect(result.fields.password.required).toBe(true)
    expect(result.fields.gender.required).toBe(false)
    expect(result.fields.country.required).toBe(true)
  })

  it('should handle legacy property isRequired in fields', () => {
    const current = {
      fields: {
        login: { type: 'text' },
        password: { type: 'password' },
        gender: { type: 'text', isRequired: false },
        country: { type: 'text' }
      }
    }
    const result = sanitizeManifest(current)
    expect(result.fields.login.required).toBe(true)
    expect(result.fields.password.required).toBe(true)
    expect(result.fields.gender.required).toBe(false)
    expect(result.fields.country.required).toBe(true)
  })

  it('should set encrypted for type=password fields', () => {
    const current = {
      fields: {
        username: { type: 'text' },
        passphrase: { type: 'password' }
      }
    }

    const result = sanitizeManifest(current)
    expect(result.fields.passphrase.encrypted).toBe(true)
  })

  const legacyEncryptedFieldsTest = [
    'secret',
    'dob',
    'code',
    'answer',
    'access_token',
    'refresh_token',
    'appSecret'
  ]

  for (let name of legacyEncryptedFieldsTest) {
    let legacyManifest = {
      fields: {
        [name]: { type: 'text' },
        password: { type: 'password' },
        plop: { type: 'text' }
      }
    }

    it('should set encrypted=true to ' + name, () => {
      const result = sanitizeManifest(legacyManifest)
      expect(result.fields[name].encrypted).toBe(true)
    })

    it('should keep encrypted value', () => {
      const current = {
        fields: {
          [name]: { type: 'text', encrypted: false },
          passphrase: { type: 'password', encrypted: true }
        }
      }
      const result = sanitizeManifest(current)
      expect(result.fields[name].encrypted).toBe(false)
      expect(result.fields.passphrase.encrypted).toBe(true)
    })
  }

  describe('terms', () => {
    it('should remove incomplete terms', () => {
      const incompleteTerms = {
        id: 'mock-terms'
      }
      expect(
        sanitizeManifest({ ...baseMan, terms: incompleteTerms })
      ).not.toHaveProperty('terms')
      expect(sanitizeManifest({ ...baseMan, terms: {} })).not.toHaveProperty(
        'terms'
      )
    })

    it('should keep complete terms', () => {
      const completeTerms = {
        id: 'mock-terms',
        url: 'mock://terms',
        version: 'mock001'
      }
      const man = { ...baseMan, terms: completeTerms }

      expect(sanitizeManifest(man)).toEqual(expect.objectContaining(man))
    })
  })

  describe('partnership', () => {
    it('should remove incomplete', () => {
      const incompletePartnership = {
        icon: 'icon.svg' // icon is optional
      }

      expect(
        sanitizeManifest({
          ...baseMan,
          partnership: {}
        })
      ).not.toHaveProperty('partnership')

      expect(
        sanitizeManifest({
          ...baseMan,
          partnership: incompletePartnership
        })
      ).not.toHaveProperty('partnership')
    })

    it('should keep complete', () => {
      const completePartnership = {
        description: 'A partnership text here' // description is mandatory
      }

      const man = { ...baseMan, partnership: completePartnership }
      expect(sanitizeManifest(man)).toEqual(expect.objectContaining(man))
    })
  })
})

describe('getIdentifier', () => {
  it('should return field having role=identifier', () => {
    const fields = {
      username: {
        type: 'text'
      },
      id: {
        type: 'text',
        role: 'identifier'
      }
    }
    expect(getIdentifier(fields)).toBe('id')
  })

  it('should return the first field', () => {
    const fields = {
      username: {
        type: 'text'
      },
      id: {
        type: 'text'
      }
    }

    expect(getIdentifier(fields)).toBe('username')
  })

  it('should return null if there is no match', () => {
    expect(getIdentifier({})).toBe(null)
  })
})

describe('getCronFromFrequency', () => {
  const options = { dayOfMonth: 25, dayOfWeek: 4, hours: 14, minutes: 15 }
  it('creates default cron (weekly)', () => {
    expect(getCronFromFrequency()).toEqual('0 0 0 * * 1')
  })
  it('creates weekly cron', () => {
    expect(getCronFromFrequency('weekly', options)).toEqual('0 15 14 * * 4')
  })
  it('creates monthly cron', () => {
    expect(getCronFromFrequency('monthly', options)).toEqual('0 15 14 25 * *')
  })
  it('creates daily cron', () => {
    expect(getCronFromFrequency('daily', options)).toEqual('0 15 14 * * *')
  })
  it('creates hourly cron', () => {
    expect(getCronFromFrequency('hourly', options)).toEqual('0 15 * * * *')
  })
})

describe('getCronFromKonnector', () => {
  const randomDayTimeMock = jest.fn()

  beforeEach(() => {
    randomDayTimeMock.mockImplementation((min, max) => ({
      hours: max - 1,
      minutes: 59
    }))
  })
  afterEach(() => {
    randomDayTimeMock.mockReset()
  })
  it('returns expected default cron', () => {
    const konnector = {}
    const date = new Date('2019-02-07T14:12:00')
    expect(getCronFromKonnector(konnector, date, randomDayTimeMock)).toEqual(
      `0 59 4 * * 4`
    )
  })
  it('returns expected monthly cron', () => {
    const konnector = {
      frequency: 'monthly'
    }
    const date = new Date('2019-02-07T14:12:00')
    expect(getCronFromKonnector(konnector, date, randomDayTimeMock)).toEqual(
      `0 59 4 7 * *`
    )
  })
  it('returns expected cron with time interval', () => {
    const konnector = {
      time_interval: [0, 12]
    }
    const date = new Date('2019-02-07T14:12:00')
    expect(getCronFromKonnector(konnector, date, randomDayTimeMock)).toEqual(
      `0 59 11 * * 4`
    )
  })
})

describe('daytime library', () => {
  describe('randomDayTime', () => {
    it('throws error on inconsistent start hour', () => {
      expect(() => randomDayTime(-1, 12)).toThrow(
        'interval must be inside [0, 24]'
      )
    })
    it('throws error on inconsistent end hour', () => {
      expect(() => randomDayTime(2, 26)).toThrow(
        'interval must be inside [0, 24]'
      )
    })
    it('throws error when randomize is null', () => {
      expect(() => randomDayTime(0, 1, null)).toThrow(
        'Parameter randomize must be a function'
      )
    })
    it('throws error when randomize is not a function', () => {
      expect(() => randomDayTime(0, 1, 2)).toThrow(
        'Parameter randomize must be a function'
      )
    })
    it('returns expected hours/minutes values', () => {
      const randomizeStub = jest.fn().mockReturnValueOnce(10.58)

      const result = randomDayTime(0, 24, randomizeStub)

      expect(result).toEqual({
        hours: 10,
        minutes: 34
      })
    })
    it('returns defaut hours/minutes with no parameter', () => {
      // Test based on random function, not sure if it is a good idea, but it
      // makes code 100% covered.
      const result = randomDayTime()

      expect(result.hours).toBe(0)

      expect(result.minutes).toBeGreaterThanOrEqual(0)
      expect(result.minutes).toBeLessThanOrEqual(59)
    })
    it('returns valid hours/minutes with default randomize function', () => {
      // Test based on random function, not sure if it is a good idea, but it
      // makes code 100% covered.
      const result = randomDayTime(19, 21)

      expect(result.hours).toBeGreaterThanOrEqual(19)
      expect(result.hours).toBeLessThanOrEqual(20)

      expect(result.minutes).toBeGreaterThanOrEqual(0)
      expect(result.minutes).toBeLessThanOrEqual(59)
    })
    it('throw error on incorrect minimal hour', () => {
      const randomizeStub = jest.fn().mockReturnValueOnce(-1)

      expect(() => randomDayTime(0, 24, randomizeStub)).toThrow(
        'randomize function returns invalid hour value'
      )
    })
    it('throws error on incorrect maximal hour', () => {
      const randomizeStub = jest.fn().mockReturnValueOnce(24)

      expect(() => randomDayTime(0, 24, randomizeStub)).toThrow(
        'randomize function returns invalid hour value'
      )
    })
    it('handles floats', () => {
      const randomizeStub = jest.fn().mockReturnValueOnce(10.58)
      randomDayTime(5.5, 6.5, randomizeStub)
      expect(randomizeStub).toHaveBeenCalledWith(5.5, 6.5)
    })
  })
})
