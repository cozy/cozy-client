"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET_APPS_RESPONSE = exports.ALL_APPS_RESPONSE = void 0;
var ALL_APPS_RESPONSE = {
  data: [{
    type: 'io.cozy.apps',
    id: 'io.cozy.apps/drive',
    attributes: {
      id: 'Drive',
      name: 'Drive',
      editor: 'Cozy',
      icon: 'public/app-icon.svg',
      category: 'cozy',
      vendor_link: '',
      locales: {
        fr: {
          description: 'Gestionnaire de fichiers pour Cozy v3'
        }
      },
      developer: {
        name: 'Cozy',
        url: 'https://cozy.io'
      },
      slug: 'drive',
      state: 'ready',
      source: 'git://github.com/cozy/cozy-drive.git#build',
      version: '3.0.0-aa7af90c25ce4782b889c6e2845a62ba585ae633',
      permissions: {
        albums: {
          type: 'io.cozy.photos.albums',
          description: 'Required to manage photos albums'
        },
        apps: {
          type: 'io.cozy.apps',
          description: 'Required by the cozy-bar to display the icons of the apps',
          verbs: ['GET']
        },
        files: {
          type: 'io.cozy.files',
          description: 'Required to access the files'
        },
        settings: {
          type: 'io.cozy.settings',
          description: 'Required by the cozy-bar to display Claudy and know which applications are coming soon',
          verbs: ['GET']
        }
      },
      intents: [{
        action: 'OPEN',
        type: ['io.cozy.files'],
        href: '/services'
      }, {
        action: 'GET_URL',
        type: ['io.cozy.files'],
        href: '/services'
      }],
      routes: {
        '/': {
          folder: '/',
          index: 'index.html',
          public: false
        },
        '/public': {
          folder: '/public',
          index: 'index.html',
          public: true
        },
        '/services': {
          folder: '/',
          index: 'services.html',
          public: false
        }
      },
      services: null,
      notifications: null,
      created_at: '2018-07-06T00:59:36.319130083+02:00',
      updated_at: '2018-08-06T15:35:01.62521429+02:00'
    },
    meta: {
      rev: '2-b3f01490f0b443ad0cf642063b540921'
    },
    links: {
      self: '/apps/drive',
      related: 'http://drive.cozy.tools:8080/',
      icon: '/apps/drive/icon'
    }
  }, {
    type: 'io.cozy.apps',
    id: 'io.cozy.apps/store',
    attributes: {
      name: 'Store',
      name_prefix: 'Cozy',
      editor: 'Cozy',
      icon: 'icon-store.svg',
      type: 'webapp',
      vendor_link: '',
      locales: {
        de: {},
        en: {},
        fr: {},
        nl_NL: {},
        pl: {}
      },
      langs: ['de', 'en', 'fr', 'nl_NL', 'pl'],
      categories: ['cozy'],
      developer: {
        name: 'Cozy Cloud',
        url: 'https://cozy.io'
      },
      slug: 'store',
      state: 'ready',
      source: 'registry://store/dev',
      version: '1.0.8-dev.cb61910db26290bf5be2c504e116b864587b8b42',
      permissions: {
        apps: {
          type: 'io.cozy.apps',
          description: 'Required to manage applications'
        },
        konnectors: {
          type: 'io.cozy.konnectors',
          description: 'Required to manage konnectors'
        },
        settings: {
          type: 'io.cozy.settings',
          description: 'Required by the cozy-bar to display Claudy and know which applications are coming soon',
          verbs: ['GET']
        }
      },
      intents: [{
        action: 'REDIRECT',
        type: ['io.cozy.apps'],
        href: '/#/redirect'
      }, {
        action: 'INSTALL',
        type: ['io.cozy.apps'],
        href: '/intents'
      }],
      routes: {
        '/': {
          folder: '/',
          index: 'index.html',
          public: false
        },
        '/intents': {
          folder: '/intents',
          index: 'index.html',
          public: false
        }
      },
      services: null,
      notifications: null,
      created_at: '2018-08-06T15:36:35.524158386+02:00',
      updated_at: '2018-08-06T15:36:35.524158888+02:00'
    },
    meta: {
      rev: '1-c83797d71661b24c262d1a5a223fc12c'
    },
    links: {
      self: '/apps/store',
      related: 'http://store.cozy.tools:8080/',
      icon: '/apps/store/icon'
    }
  }],
  meta: {
    count: 2
  }
};
exports.ALL_APPS_RESPONSE = ALL_APPS_RESPONSE;
var GET_APPS_RESPONSE = {
  data: {
    type: 'io.cozy.apps',
    id: 'io.cozy.apps/drive',
    attributes: {
      name: 'Drive',
      editor: 'Cozy',
      icon: 'public/app-icon.svg',
      category: 'cozy',
      vendor_link: '',
      locales: {
        fr: {
          description: 'Gestionnaire de fichiers pour Cozy v3'
        }
      },
      developer: {
        name: 'Cozy',
        url: 'https://cozy.io'
      },
      slug: 'drive',
      state: 'ready',
      source: 'git://github.com/cozy/cozy-drive.git#build',
      version: '3.0.0-aa7af90c25ce4782b889c6e2845a62ba585ae633',
      permissions: {
        albums: {
          type: 'io.cozy.photos.albums',
          description: 'Required to manage photos albums'
        },
        apps: {
          type: 'io.cozy.apps',
          description: 'Required by the cozy-bar to display the icons of the apps',
          verbs: ['GET']
        },
        files: {
          type: 'io.cozy.files',
          description: 'Required to access the files'
        },
        settings: {
          type: 'io.cozy.settings',
          description: 'Required by the cozy-bar to display Claudy and know which applications are coming soon',
          verbs: ['GET']
        }
      },
      intents: [{
        action: 'OPEN',
        type: ['io.cozy.files'],
        href: '/services'
      }, {
        action: 'GET_URL',
        type: ['io.cozy.files'],
        href: '/services'
      }],
      routes: {
        '/': {
          folder: '/',
          index: 'index.html',
          public: false
        },
        '/public': {
          folder: '/public',
          index: 'index.html',
          public: true
        },
        '/services': {
          folder: '/',
          index: 'services.html',
          public: false
        }
      },
      services: null,
      notifications: null,
      created_at: '2018-07-06T00:59:36.319130083+02:00',
      updated_at: '2018-08-06T15:35:01.62521429+02:00'
    },
    meta: {
      rev: '2-b3f01490f0b443ad0cf642063b540921'
    },
    links: {
      self: '/apps/drive',
      related: 'http://drive.cozy.tools:8080/',
      icon: '/apps/drive/icon'
    }
  }
};
exports.GET_APPS_RESPONSE = GET_APPS_RESPONSE;