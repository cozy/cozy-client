import {
  getFullname,
  getIndexByFamilyNameGivenNameEmailCozyUrl,
  getDisplayName,
  getInitials,
  getPrimaryEmail,
  getPrimaryCozy,
  getPrimaryPhone,
  getPrimaryAddress,
  getPrimaryOrFirst
} from './contact'

describe('getPrimaryOrFirst', () => {
  it("should return the first contact's email address if no primary", () => {
    const contact = {
      email: [
        { address: 'john.smith@cozy.cc' },
        { address: 'john.two@cozy.cc' }
      ]
    }
    const result = getPrimaryOrFirst('email')(contact)
    expect(result).toEqual({ address: 'john.smith@cozy.cc' })
  })

  it("should return the primary contact's email address, even if not the first", () => {
    const contact = {
      email: [
        { address: 'john.smith@cozy.cc' },
        { address: 'john.two@cozy.cc', primary: true }
      ]
    }
    const result = getPrimaryOrFirst('email')(contact)
    expect(result).toEqual({ address: 'john.two@cozy.cc', primary: true })
  })
})

describe('getInitials', () => {
  it("should return the contact's initials from the name", () => {
    const contact = {
      name: {
        givenName: 'Arya',
        familyName: 'Stark'
      }
    }
    const result = getInitials(contact)
    expect(result).toEqual('AS')
  })

  it("should return the contact's initials if contact has only givenName", () => {
    const contact = {
      name: {
        givenName: 'Arya'
      }
    }
    const result = getInitials(contact)
    expect(result).toEqual('A')
  })

  it("should return the contact's initials if contact has only familyName", () => {
    const contact = {
      name: {
        familyName: 'Stark'
      }
    }
    const result = getInitials(contact)
    expect(result).toEqual('S')
  })

  it('should return the first letter of the primary email if contact has no name', () => {
    const contact = {
      name: undefined,
      email: [
        {
          address: 'arya.stark@thenorth.westeros',
          primary: true
        }
      ]
    }
    const result = getInitials(contact)
    expect(result).toEqual('A')
  })

  it('should return an empty string if contact has no name/email', () => {
    const result = getInitials({})
    expect(result).toEqual('')
  })
})

describe('getPrimaryCozy', () => {
  it('should return the main cozy', () => {
    const contact = {
      cozy: [
        {
          url: 'https://arya.mycozy.cloud',
          primary: true
        },
        {
          url: 'https://beth.mycozy.cloud',
          primary: false
        }
      ]
    }
    const result = getPrimaryCozy(contact)
    expect(result).toEqual('https://arya.mycozy.cloud')
  })

  it('should return the first if there is no primary', () => {
    const contact = {
      cozy: [
        {
          url: 'https://arya.mycozy.cloud'
        },
        {
          url: 'https://beth.mycozy.cloud'
        }
      ]
    }
    const result = getPrimaryCozy(contact)
    expect(result).toEqual('https://arya.mycozy.cloud')
  })

  it('should work with old doctype', () => {
    const contact = {
      url: 'https://arya.mycozy.cloud'
    }
    const result = getPrimaryCozy(contact)
    expect(result).toEqual('https://arya.mycozy.cloud')
  })
})

describe('getPrimaryPhone', () => {
  it('should return the main phone number', () => {
    const contact = {
      phone: [
        { number: '0320007788', primary: true },
        { number: '0666001122', primary: false },
        { number: '0788996677', primary: false }
      ]
    }
    const result = getPrimaryPhone(contact)
    expect(result).toEqual('0320007788')
  })
})

describe('getPrimaryAddress', () => {
  it('should return the main address', () => {
    const contact = {
      name: {
        givenName: 'Arya',
        familyName: 'Stark'
      },
      address: [
        { formattedAddress: 'Winterfell', primary: true },
        { formattedAddress: 'Braavos', primary: false },
        { formattedAddress: "The Streets of King's Landing", primary: false }
      ]
    }
    const result = getPrimaryAddress(contact)
    expect(result).toEqual('Winterfell')
  })
})

describe('getFullname', () => {
  it("should return contact's fullname", () => {
    const contact = {
      fullname: 'Doran Martell',
      name: {
        givenName: 'Do',
        familyName: 'Martell'
      }
    }
    const result = getFullname(contact)
    expect(result).toEqual('Doran Martell')
  })

  it('should combine all name parts', () => {
    const contact = {
      fullname: '',
      name: {
        namePrefix: 'The Mother of Dragons',
        givenName: 'Daenerys',
        additionalName: 'The Unburnt',
        familyName: 'Targaryen',
        nameSuffix: 'Breaker of Chains'
      }
    }
    const result = getDisplayName(contact)
    expect(result).toEqual(
      'The Mother of Dragons Daenerys The Unburnt Targaryen Breaker of Chains'
    )
  })

  it("should return contact's givenName + familyName if no fullname", () => {
    const contact = {
      fullname: undefined,
      name: {
        givenName: 'Doran',
        familyName: 'Martell'
      }
    }
    const result = getFullname(contact)
    expect(result).toEqual('Doran Martell')
  })

  it("should return contact's givenName if no familyName", () => {
    const contact = {
      fullname: undefined,
      name: {
        givenName: 'Doran',
        familyName: ''
      }
    }
    const result = getFullname(contact)
    expect(result).toEqual('Doran')
  })

  it("should return contact's familyName if no givenName", () => {
    const contact = {
      fullname: undefined,
      name: {
        givenName: '',
        familyName: 'Martell'
      }
    }
    const result = getFullname(contact)
    expect(result).toEqual('Martell')
  })
})

describe('getDisplayName', () => {
  it("should return the contact's fullname if any", () => {
    const contact = {
      fullname: 'Doran Martell',
      name: {
        givenName: 'Doran',
        familyName: 'Martell'
      },
      email: [
        {
          address: 'doran.martell@dorne.westeros',
          primary: true
        }
      ]
    }
    const result = getDisplayName(contact)
    expect(result).toEqual('Doran Martell')
  })

  it("should return the contact's name if no fullname", () => {
    const contact = {
      fullname: '',
      name: {
        givenName: 'Doran',
        familyName: 'Martell'
      },
      email: [
        {
          address: 'doran.martell@dorne.westeros',
          primary: true
        }
      ]
    }
    const result = getDisplayName(contact)
    expect(result).toEqual('Doran Martell')
  })

  it("should return the contact's givenName if no fullname and no familyName", () => {
    const contact = {
      fullname: undefined,
      name: { givenName: 'John' }
    }
    const result = getDisplayName(contact)
    expect(result).toEqual('John')
  })

  it("should return the contact's primary email if no fullname and no name", () => {
    const contact = {
      fullname: undefined,
      name: undefined,
      email: [
        {
          address: 'doran.martell@dorne.westeros',
          primary: true
        }
      ]
    }
    const result = getDisplayName(contact)
    expect(result).toEqual('doran.martell@dorne.westeros')
  })

  it("should return the contact's primary cozy url if no fullname, no name and no primary email", () => {
    const contact = {
      fullname: undefined,
      name: undefined,
      email: [],
      cozy: [{ url: 'https//www.john.com' }, { url: 'https//www.smith.com' }]
    }
    const result = getDisplayName(contact)
    expect(result).toEqual('https//www.john.com')
  })
})

describe('getPrimaryEmail', () => {
  it('should return the main email', () => {
    const contact = {
      email: [
        {
          address: 'beth@braavos.essos',
          primary: false
        },
        {
          address: 'arya.stark@thenorth.westeros',
          primary: true
        }
      ]
    }
    const result = getPrimaryEmail(contact)
    expect(result).toEqual('arya.stark@thenorth.westeros')
  })

  it('should return the first if there is no primary', () => {
    const contact = {
      email: [
        {
          address: 'beth@braavos.essos'
        },
        {
          address: 'arya.stark@thenorth.westeros'
        }
      ]
    }
    const result = getPrimaryEmail(contact)
    expect(result).toEqual('beth@braavos.essos')
  })

  it('should work with old doctype', () => {
    const contact = {
      email: 'arya.stark@thenorth.westeros'
    }
    const result = getPrimaryEmail(contact)
    expect(result).toEqual('arya.stark@thenorth.westeros')
  })
})

describe('getIndexByFamilyNameGivenNameEmailCozyUrl', () => {
  it('should returns concatenated string of familyName, givenName, first email and first cozy url', () => {
    const contact = {
      name: { givenName: 'John', familyName: 'Smith' },
      fullname: 'John Smith',
      email: [
        { address: 'john.smith@cozy.cc' },
        { address: 'john.two@cozy.cc' }
      ],
      cozy: [{ url: 'https//www.john.com' }, { url: 'https//www.smith.com' }]
    }
    const result = getIndexByFamilyNameGivenNameEmailCozyUrl(contact)
    expect(result).toEqual('SmithJohnjohn.smith@cozy.cchttps//www.john.com')
  })

  it('should returns only familyName if no givenName, email and cozy url', () => {
    const contact = {
      name: { givenName: '', familyName: 'Smith' },
      fullname: 'Smith',
      email: [{ address: '' }],
      cozy: [{ url: '' }]
    }
    const result = getIndexByFamilyNameGivenNameEmailCozyUrl(contact)
    expect(result).toEqual('Smith')
  })

  it('should returns only givenName if no familyName, email and cozy url', () => {
    const contact = {
      name: { givenName: 'John', familyName: '' },
      fullname: 'John',
      email: [{ address: '' }],
      cozy: [{ url: '' }]
    }
    const result = getIndexByFamilyNameGivenNameEmailCozyUrl(contact)
    expect(result).toEqual('John')
  })

  it('should returns only cozy url if no givenName, familyName and email', () => {
    const contact = {
      name: { givenName: '', familyName: '' },
      fullname: '',
      email: [],
      cozy: [{ url: 'https//www.smith.com' }]
    }
    const result = getIndexByFamilyNameGivenNameEmailCozyUrl(contact)
    expect(result).toEqual('https//www.smith.com')
  })

  it('should returns empty string if no givenName, familyName, email and cozy url', () => {
    const contact = {
      name: {},
      fullname: '',
      email: [],
      cozy: []
    }
    const result = getIndexByFamilyNameGivenNameEmailCozyUrl(contact)
    expect(result).toEqual('')
  })

  it('should returns concatenated string of givenName and cozy url if no familyName and email', () => {
    const contact = {
      name: { givenName: 'John' },
      fullname: 'John',
      cozy: [{ url: 'https//www.smith.com' }]
    }
    const result = getIndexByFamilyNameGivenNameEmailCozyUrl(contact)
    expect(result).toEqual('Johnhttps//www.smith.com')
  })

  it('should returns only email if no name and cozy url', () => {
    const contact = {
      name: {},
      email: [{ address: 'john.smith@cozy.cc' }],
      cozy: [{ url: '' }]
    }
    const result = getIndexByFamilyNameGivenNameEmailCozyUrl(contact)
    expect(result).toEqual('john.smith@cozy.cc')
  })
})
