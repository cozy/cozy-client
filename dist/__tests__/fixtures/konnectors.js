"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET_KONNECTORS_RESPONSE = exports.ALL_KONNECTORS_RESPONSE = void 0;
var ALL_KONNECTORS_RESPONSE = {
  data: [{
    type: 'io.cozy.konnectors',
    id: 'io.cozy.konnectors/bouibox',
    attributes: {
      id: 'Boui Box',
      name: 'Boui Box',
      editor: 'Cozy',
      icon: 'bouibox.svg',
      type: 'konnector',
      language: 'node',
      vendor_link: 'https://www.boui.fr/',
      locales: {
        fr: {
          short_description: 'Récupère toutes vos factures Boui Box',
          long_description: 'Récupère toutes vos factures Boui Box',
          permissions: {
            'bank operations': {
              description: 'Utilisé pour relier les factures à des operations bancaires'
            },
            bills: {
              description: 'Utilisé pour sauver les données des factures'
            },
            files: {
              description: 'Utilisé pour sauvegarder les factures'
            },
            accounts: {
              description: 'Utilisé pour obtenir les données du compte'
            }
          }
        },
        en: {
          short_description: 'Retrieves all your Boui Box invoices',
          long_description: 'Retrieves all your Boui Box invoices',
          permissions: {
            'bank operations': {
              description: 'Required to link bank operations to bills'
            },
            bills: {
              description: 'Required to save the bills data'
            },
            files: {
              description: 'Required to save the bills'
            },
            accounts: {
              description: "Required to get the account's data"
            }
          }
        }
      },
      langs: ['fr'],
      categories: ['isp'],
      developer: {
        name: 'Cozy Cloud',
        url: 'https://cozy.io'
      },
      screenshots: [],
      data_types: ['bill'],
      fields: {
        login: {
          type: 'text'
        },
        password: {
          type: 'password'
        },
        lastname: {
          type: 'text'
        },
        advancedFields: {
          folderPath: {
            advanced: true,
            isRequired: false
          }
        }
      },
      notifications: null,
      slug: 'bouibox',
      state: 'ready',
      source: 'registry://bouibox/stable',
      version: '1.9.1',
      checksum: '',
      permissions: {
        accounts: {
          type: 'io.cozy.accounts',
          verbs: ['GET', 'PUT']
        },
        'bank operations': {
          type: 'io.cozy.bank.operations'
        },
        bills: {
          type: 'io.cozy.bills'
        },
        files: {
          type: 'io.cozy.files'
        }
      },
      terms: {
        url: '',
        version: ''
      },
      created_at: '2019-01-21T18:37:55.65454+01:00',
      updated_at: '2019-01-21T18:37:55.654541+01:00'
    },
    meta: {
      rev: '1-264f83b3c71a2ce4c6bca3d1c281ba03'
    },
    links: {
      self: '/konnectors/bouibox',
      icon: '/konnectors/bouibox/icon/1.9.1',
      permissions: '/permissions/konnectors/bouibox'
    }
  }, {
    type: 'io.cozy.konnectors',
    id: 'io.cozy.konnectors/delivreousa',
    attributes: {
      name: 'Delivreousa',
      editor: 'Cozy',
      icon: 'icon.svg',
      type: 'konnector',
      language: 'node',
      vendor_link: 'https://delivreousa.fr/fr/login',
      locales: {
        fr: {
          short_description: 'Connecteur delivreousa',
          long_description: 'Ce connecteur récupère une liste de factures sur le site https://delivreousa.fr',
          permissions: {
            'bank operations': {
              description: 'Utilisé pour relier les factures à des operations bancaires'
            },
            bills: {
              description: 'Utilisé pour sauver les données des factures'
            },
            files: {
              description: 'Utilisé pour sauvegarder les factures'
            },
            accounts: {
              description: 'Utilisé pour obtenir les données du compte'
            }
          }
        },
        en: {
          short_description: 'Connector delivreousa',
          long_description: 'This connector fetches a list of invoices from https://delivreousa.fr',
          permissions: {
            'bank operations': {
              description: 'Required to link bank operations to bills'
            },
            bills: {
              description: 'Required to save the bills data'
            },
            files: {
              description: 'Required to save the bills'
            },
            accounts: {
              description: "Required to get the account's data"
            }
          }
        }
      },
      langs: ['fr', 'en'],
      categories: ['online_services'],
      developer: {
        name: 'Cozy Cloud',
        url: 'https://cozy.io'
      },
      screenshots: [],
      data_types: ['bill'],
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
      },
      notifications: null,
      slug: 'delivreousa',
      state: 'ready',
      source: 'registry://delivreousa/stable',
      version: '1.1.1',
      checksum: '',
      permissions: {
        accounts: {
          type: 'io.cozy.accounts',
          verbs: ['GET']
        },
        'bank operations': {
          type: 'io.cozy.bank.operations'
        },
        bills: {
          type: 'io.cozy.bills'
        },
        files: {
          type: 'io.cozy.files'
        }
      },
      terms: {
        url: '',
        version: ''
      },
      created_at: '2019-01-21T18:28:18.009116+01:00',
      updated_at: '2019-01-21T18:28:18.009116+01:00'
    },
    meta: {
      rev: '1-0ad37818d94971da986d18f172fc5c87'
    },
    links: {
      self: '/konnectors/delivreousa',
      icon: '/konnectors/delivreousa/icon/1.1.1',
      permissions: '/permissions/konnectors/delivreousa'
    }
  }, {
    type: 'io.cozy.konnectors',
    id: 'io.cozy.konnectors/frit',
    attributes: {
      name: 'Frit',
      editor: 'Cozy',
      icon: 'frit.svg',
      type: 'konnector',
      language: 'node',
      vendor_link: 'https://www.frit.fr/',
      locales: {
        fr: {
          short_description: 'Récupérer vos données Frit dans votre Cozy',
          long_description: "Ce fournisseur vous permettra de récupérer l'ensemble de vos facture Frit dans votre Cozy.",
          permissions: {
            'bank operations': {
              description: 'Utilisé pour relier les factures à des operations bancaires'
            },
            bills: {
              description: 'Utilisé pour sauver les données des factures'
            },
            files: {
              description: 'Utilisé pour sauvegarder les factures'
            },
            accounts: {
              description: 'Utilisé pour obtenir les données du compte'
            }
          }
        },
        en: {
          short_description: 'Fetch your Frit data in your Cozy',
          long_description: 'This provider will allow you to fetch all your Frit bills in your Cozy.',
          permissions: {
            'bank operations': {
              description: 'Required to link bank operations to bills'
            },
            bills: {
              description: 'Required to save the bills data'
            },
            files: {
              description: 'Required to save the bills'
            },
            accounts: {
              description: "Required to get the account's data"
            }
          }
        }
      },
      langs: ['fr', 'en'],
      categories: ['isp'],
      developer: {
        name: 'Cozy Cloud',
        url: 'https://cozy.io'
      },
      screenshots: [],
      data_types: ['bill'],
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
      },
      notifications: null,
      slug: 'frit',
      state: 'ready',
      source: 'registry://frit/stable',
      version: '1.2.1',
      checksum: '',
      permissions: {
        accounts: {
          type: 'io.cozy.accounts',
          verbs: ['GET']
        },
        'bank operations': {
          type: 'io.cozy.bank.operations'
        },
        bills: {
          type: 'io.cozy.bills'
        },
        files: {
          type: 'io.cozy.files'
        }
      },
      terms: {
        url: '',
        version: ''
      },
      created_at: '2019-01-21T18:54:11.145111+01:00',
      updated_at: '2019-01-21T18:54:11.145111+01:00'
    },
    meta: {
      rev: '1-9b30fc9c3143a11c1df28ca09b1141cc'
    },
    links: {
      self: '/konnectors/frit',
      icon: '/konnectors/frit/icon/1.2.1',
      permissions: '/permissions/konnectors/frit'
    }
  }, {
    type: 'io.cozy.konnectors',
    id: 'io.cozy.konnectors/unpot',
    attributes: {
      name: 'Unpot',
      editor: 'Cozy',
      icon: 'icon.svg',
      type: 'konnector',
      language: 'node',
      vendor_link: 'https://unpot/LoginMDP',
      locales: {
        fr: {
          short_description: 'Récupère vos déclarations de revenu et autres taxes',
          long_description: 'Récupère vos déclarations de revenu et autres taxes',
          permissions: {
            files: {
              description: 'Utilisé pour sauvegarder les documents fichiers'
            },
            accounts: {
              description: 'Utilisé pour obtenir les données du compte'
            }
          }
        },
        en: {
          short_description: 'Fetch your taxes declarations',
          long_description: 'This connector fetches your taxes declarations',
          permissions: {
            files: {
              description: 'Required to save the file documents'
            },
            accounts: {
              description: "Required to get the account's data"
            }
          }
        }
      },
      langs: ['fr', 'en'],
      categories: ['public_service'],
      developer: {
        name: 'Cozy',
        url: 'https://cozy.io'
      },
      data_types: ['documents'],
      fields: {
        login: {
          type: 'text',
          min: 13,
          max: 13
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
      },
      notifications: null,
      slug: 'unpot',
      state: 'ready',
      source: 'registry://unpot/stable',
      version: '1.0.0',
      checksum: 'beb4523d1af9afb5cccac16670a53616cdb77f6fd2e66dbf1166541be3d6df3f',
      permissions: {
        accounts: {
          type: 'io.cozy.accounts',
          verbs: ['GET']
        },
        files: {
          type: 'io.cozy.files'
        }
      },
      available_version: '1.3.0',
      terms: {
        url: '',
        version: ''
      },
      created_at: '2019-02-07T14:18:19.350339+01:00',
      updated_at: '2019-02-07T14:18:29.167049+01:00'
    },
    meta: {
      rev: '15-28e73174c7ef2703318c2489e7e4ec27'
    },
    links: {
      self: '/konnectors/unpot',
      icon: '/konnectors/unpot/icon/1.0.0',
      permissions: '/permissions/konnectors/unpot'
    }
  }],
  meta: {
    count: 4
  }
};
exports.ALL_KONNECTORS_RESPONSE = ALL_KONNECTORS_RESPONSE;
var GET_KONNECTORS_RESPONSE = {
  data: {
    type: 'io.cozy.konnectors',
    id: 'io.cozy.konnectors/bouibox',
    attributes: {
      name: 'Boui Box',
      editor: 'Cozy',
      icon: 'bouibox.svg',
      type: 'konnector',
      language: 'node',
      vendor_link: 'https://www.boui.fr/',
      locales: {
        fr: {
          short_description: 'Récupère toutes vos factures Boui Box',
          long_description: 'Récupère toutes vos factures Boui Box',
          permissions: {
            'bank operations': {
              description: 'Utilisé pour relier les factures à des operations bancaires'
            },
            bills: {
              description: 'Utilisé pour sauver les données des factures'
            },
            files: {
              description: 'Utilisé pour sauvegarder les factures'
            },
            accounts: {
              description: 'Utilisé pour obtenir les données du compte'
            }
          }
        },
        en: {
          short_description: 'Retrieves all your Boui Box invoices',
          long_description: 'Retrieves all your Boui Box invoices',
          permissions: {
            'bank operations': {
              description: 'Required to link bank operations to bills'
            },
            bills: {
              description: 'Required to save the bills data'
            },
            files: {
              description: 'Required to save the bills'
            },
            accounts: {
              description: "Required to get the account's data"
            }
          }
        }
      },
      langs: ['fr'],
      categories: ['isp'],
      developer: {
        name: 'Cozy Cloud',
        url: 'https://cozy.io'
      },
      screenshots: [],
      data_types: ['bill'],
      fields: {
        login: {
          type: 'text'
        },
        password: {
          type: 'password'
        },
        lastname: {
          type: 'text'
        },
        advancedFields: {
          folderPath: {
            advanced: true,
            isRequired: false
          }
        }
      },
      notifications: null,
      slug: 'bouibox',
      state: 'ready',
      source: 'registry://bouibox/stable',
      version: '1.9.1',
      checksum: '',
      permissions: {
        accounts: {
          type: 'io.cozy.accounts',
          verbs: ['GET', 'PUT']
        },
        'bank operations': {
          type: 'io.cozy.bank.operations'
        },
        bills: {
          type: 'io.cozy.bills'
        },
        files: {
          type: 'io.cozy.files'
        }
      },
      terms: {
        url: '',
        version: ''
      },
      created_at: '2019-01-21T18:37:55.65454+01:00',
      updated_at: '2019-01-21T18:37:55.654541+01:00'
    },
    meta: {
      rev: '1-264f83b3c71a2ce4c6bca3d1c281ba03'
    },
    links: {
      self: '/konnectors/bouibox',
      icon: '/konnectors/bouibox/icon/1.9.1',
      permissions: '/permissions/konnectors/bouibox'
    }
  }
};
exports.GET_KONNECTORS_RESPONSE = GET_KONNECTORS_RESPONSE;