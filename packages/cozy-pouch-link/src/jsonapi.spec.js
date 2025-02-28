import CozyClient from 'cozy-client'

import { fromPouchResult, normalizeDoc } from './jsonapi'

const BART_FIXTURE = {
  id: 1,
  doc: {
    _id: 1,
    name: 'Bart'
  }
}
const LISA_FIXTURE = {
  id: 2,
  doc: {
    _id: 2,
    name: 'Lisa'
  }
}
const MARGE_FIXTURE = {
  id: 3,
  doc: {
    _id: 3,
    name: 'Marge'
  }
}
const DELETED_DOC_FIXTURE = {
  id: 4,
  delete: true
}

const token = 'fake_token'
const uri = 'https://claude.mycozy.cloud'
const client = new CozyClient({ token, uri })
client.capabilities = { flat_subdomains: true }

describe('doc normalization', () => {
  it('keeps the highest between rev and _rev and removes the rev attribute', () => {
    const normalized = normalizeDoc(
      {
        _id: 1234,
        _rev: '3-deadbeef',
        rev: '4-cffee',
        firstName: 'Bobba',
        lastName: 'Fett'
      },
      'io.cozy.contacts'
    )
    expect(normalized).toEqual({
      _id: 1234,
      id: 1234,
      _rev: '4-cffee',
      _type: 'io.cozy.contacts',
      firstName: 'Bobba',
      lastName: 'Fett',
      relationships: {
        referenced_by: undefined
      }
    })
  })

  it('should normalize apps links', () => {
    const normalized = normalizeDoc(
      {
        _id: 1234,
        _rev: '3-deadbeef',
        rev: '4-cffee',
        slug: 'contact',
        version: '1.2.0'
      },
      'io.cozy.apps',
      client
    )
    expect(normalized).toEqual({
      _id: 1234,
      id: 1234,
      _rev: '4-cffee',
      _type: 'io.cozy.apps',
      slug: 'contact',
      version: '1.2.0',
      relationships: {
        referenced_by: undefined
      },
      links: {
        icon: '/apps/contact/icon/1.2.0',
        related: 'https://claude-contact.mycozy.cloud/#/',
        self: '/apps/contact'
      }
    })
  })
})

describe('jsonapi', () => {
  it('should return a response understandable by cozy-client', () => {
    const res = {
      rows: [BART_FIXTURE, LISA_FIXTURE, MARGE_FIXTURE, DELETED_DOC_FIXTURE]
    }
    const normalized = fromPouchResult({
      res,
      withRows: true,
      doctype: 'io.cozy.simpsons',
      client
    })
    expect(normalized.data[0].name).toBe('Bart')
    expect(normalized.data[0].id).toBe(1)
    expect(normalized.data[0]._id).toBe(1)
    expect(normalized.data[0]._type).toBe('io.cozy.simpsons')

    expect(normalized.data[1].name).toBe('Lisa')
    expect(normalized.data[1].id).toBe(2)
    expect(normalized.data[1]._id).toBe(2)

    expect(normalized.data[2].name).toBe('Marge')
    expect(normalized.data[2].id).toBe(3)
    expect(normalized.data[2]._id).toBe(3)
  })

  describe('pagination', () => {
    it('has no next when there is no pagination information', () => {
      const res = { rows: [BART_FIXTURE] }
      const normalized = fromPouchResult({
        res,
        withRows: true,
        doctype: 'io.cozy.simpsons',
        client
      })
      expect(normalized.next).toBe(false)
    })

    it('paginates when there is a total_rows field greater than the rows number', () => {
      const res = { rows: [BART_FIXTURE], total_rows: 3 }
      const normalized = fromPouchResult({
        res,
        withRows: true,
        doctype: 'io.cozy.simpsons',
        client
      })
      expect(normalized.next).toBe(true)
    })

    it("does't paginates when there is a total_rows field equal to the rows number", () => {
      const res = {
        rows: [BART_FIXTURE, MARGE_FIXTURE, LISA_FIXTURE],
        total_rows: 3
      }
      const normalized = fromPouchResult({
        res,
        withRows: true,
        doctype: 'io.cozy.simpsons',
        client
      })
      expect(normalized.next).toBe(false)
    })

    it('paginates when there is a limit field', () => {
      const res = { rows: [BART_FIXTURE, LISA_FIXTURE], limit: 2 }
      const normalized = fromPouchResult({
        res,
        withRows: true,
        doctype: 'io.cozy.simpsons',
        client
      })
      expect(normalized.next).toBe(true)

      const lastRes = { rows: [MARGE_FIXTURE], limit: 2 }
      const lastNormalized = fromPouchResult({
        res: lastRes,
        withRows: true,
        doctype: 'io.cozy.simpsons',
        client
      })
      expect(lastNormalized.next).toBe(false)
    })
  })

  describe('normalization', () => {
    it('Should normalize single doc', () => {
      const res = singleDocRes
      const normalized = fromPouchResult({
        res,
        withRows: false,
        doctype: 'io.cozy.settings',
        client
      })
      expect(normalized).toEqual({
        data: {
          _id: 'io.cozy.settings.flags',
          _rev: '1-078d414431314ea48ad6556cad579996',
          _type: 'io.cozy.settings',
          cozyLocalOnly: true,
          id: 'io.cozy.settings.flags',
          links: {
            self: '/settings/flags'
          },
          relationships: {
            referenced_by: undefined
          },
          'some.boolean.flag': true,
          'some.number.flag': 30,
          'some.object.flag': {
            value1: 100,
            value2: 100
          },
          'some.other.boolean.flag': true,
          type: 'io.cozy.settings'
        }
      })
    })
  })
  it('Should normalize docs array', () => {
    const res = multipleDocRes
    const normalized = fromPouchResult({
      res,
      withRows: true,
      doctype: 'io.cozy.files',
      client
    })
    expect(normalized).toEqual({
      data: [
        {
          relationships: {
            referenced_by: undefined
          },
          id: '018bdcec-00c8-7155-b352-c8a8f472f882',
          type: 'file',
          _type: 'io.cozy.files',
          name: 'New note 2023-11-17T10-55-36Z.cozy-note',
          dir_id: '3ab984a52b49806a2a29a14d31cc063f',
          created_at: '2023-11-17T10:55:36.061274688Z',
          updated_at: '2023-11-17T10:58:40.254562842Z',
          size: '51',
          md5sum: 'AYU8xZStzHKpiabOg2EHyg==',
          mime: 'text/vnd.cozy.note+markdown',
          class: 'text',
          executable: false,
          trashed: false,
          encrypted: false,
          metadata: {
            content: {
              content: [],
              type: 'doc'
            },
            schema: {
              marks: [],
              nodes: [],
              version: 4
            },
            title: '',
            version: 57
          },
          cozyMetadata: {
            doctypeVersion: '1',
            metadataVersion: 1,
            createdAt: '2023-11-17T10:55:36.061274688Z',
            createdByApp: 'notes',
            updatedAt: '2023-11-17T10:58:40.254562842Z',
            createdOn: 'https://yannickchironcozywtf1.cozy.wtf/'
          },
          internal_vfs_id: 'HyepeHXMIHkKhrmq',
          _id: '018bdcec-00c8-7155-b352-c8a8f472f882',
          _rev: '2-c78707eb06cceaa5e95c1c4a4c4073bd'
        },
        {
          relationships: {
            referenced_by: [
              {
                id: '536bde9aef87dde16630d3c99d26453f',
                type: 'io.cozy.photos.albums'
              }
            ]
          },
          id: '018c7cf1-1d00-73ac-9a7f-ee3190638183',
          type: 'file',
          _type: 'io.cozy.files',
          name: 'IMG_0046.jpg',
          dir_id: 'io.cozy.files.root-dir',
          created_at: '2023-11-19T13:31:47+01:00',
          updated_at: '2023-12-18T12:40:25.379Z',
          size: '1732841',
          md5sum: 'i19eI81lfj3dTwc7i8ihfA==',
          mime: 'image/jpeg',
          class: 'image',
          executable: false,
          trashed: false,
          encrypted: false,
          tags: ['library'],
          metadata: {
            datetime: '2023-11-19T13:31:47+01:00',
            extractor_version: 2,
            flash: 'On, Fired',
            height: 3024,
            orientation: 6,
            width: 4032
          },
          referenced_by: [
            {
              id: '536bde9aef87dde16630d3c99d26453f',
              type: 'io.cozy.photos.albums'
            }
          ],
          cozyMetadata: {
            doctypeVersion: '1',
            metadataVersion: 1,
            createdAt: '2023-12-18T12:40:25.556898681Z',
            updatedAt: '2023-12-18T12:45:29.375968305Z',
            updatedByApps: [
              {
                slug: 'photos',
                date: '2023-12-18T12:45:29.375968305Z',
                instance: 'https://yannickchironcozywtf1.cozy.wtf/'
              }
            ],
            createdOn: 'https://yannickchironcozywtf1.cozy.wtf/',
            uploadedAt: '2023-12-18T12:40:25.556898681Z',
            uploadedOn: 'https://yannickchironcozywtf1.cozy.wtf/'
          },
          internal_vfs_id: 'SidToiYjmikHrFBP',
          _id: '018c7cf1-1d00-73ac-9a7f-ee3190638183',
          _rev: '2-02e800df012ea1cc740e5ad1554cefe6'
        },
        {
          relationships: {
            referenced_by: [
              {
                id: '536bde9aef87dde16630d3c99d26453f',
                type: 'io.cozy.photos.albums'
              }
            ]
          },
          id: '018ca6a8-8292-7acb-bcaf-a95ccfd83662',
          _type: 'io.cozy.files',
          type: 'file',
          name: 'IMG_0047.jpg',
          dir_id: 'io.cozy.files.root-dir',
          created_at: '2023-11-19T13:31:47+01:00',
          updated_at: '2023-12-26T15:05:10.256Z',
          size: '1732841',
          md5sum: 'i19eI81lfj3dTwc7i8ihfA==',
          mime: 'image/jpeg',
          class: 'image',
          executable: false,
          trashed: false,
          encrypted: false,
          tags: ['library'],
          metadata: {
            datetime: '2023-11-19T13:31:47+01:00',
            extractor_version: 2,
            flash: 'On, Fired',
            height: 3024,
            orientation: 6,
            width: 4032
          },
          referenced_by: [
            {
              id: '536bde9aef87dde16630d3c99d26453f',
              type: 'io.cozy.photos.albums'
            }
          ],
          cozyMetadata: {
            doctypeVersion: '1',
            metadataVersion: 1,
            createdAt: '2023-12-26T15:05:10.51011657Z',
            updatedAt: '2025-01-12T12:33:00.313230696Z',
            updatedByApps: [
              {
                slug: 'photos',
                date: '2023-12-26T15:11:03.400641304Z',
                instance: 'https://yannickchironcozywtf1.cozy.wtf/'
              },
              {
                slug: 'drive',
                date: '2025-01-12T12:33:00.313230696Z',
                instance: 'https://yannickchironcozywtf1.cozy.wtf/'
              }
            ],
            createdOn: 'https://yannickchironcozywtf1.cozy.wtf/',
            uploadedAt: '2023-12-26T15:05:10.51011657Z',
            uploadedOn: 'https://yannickchironcozywtf1.cozy.wtf/'
          },
          internal_vfs_id: 'VSHXbbIKcufNgifx',
          _id: '018ca6a8-8292-7acb-bcaf-a95ccfd83662',
          _rev: '3-e18fb4f579ba93d569cabcbacc7bcd60'
        }
      ],
      meta: { count: 3 },
      skip: 0,
      next: false
    })
  })
})

const singleDocRes = {
  id: 'io.cozy.settings.flags',
  type: 'io.cozy.settings',
  links: {
    self: '/settings/flags'
  },
  'some.boolean.flag': true,
  'some.other.boolean.flag': true,
  'some.object.flag': {
    value1: 100,
    value2: 100
  },
  'some.number.flag': 30,
  cozyLocalOnly: true,
  _id: 'io.cozy.settings.flags',
  _rev: '1-078d414431314ea48ad6556cad579996'
}

const multipleDocRes = {
  total_rows: 3,
  offset: 0,
  rows: [
    {
      id: '018bdcec-00c8-7155-b352-c8a8f472f882',
      key: '018bdcec-00c8-7155-b352-c8a8f472f882',
      value: {
        rev: '2-c78707eb06cceaa5e95c1c4a4c4073bd'
      },
      doc: {
        type: 'file',
        name: 'New note 2023-11-17T10-55-36Z.cozy-note',
        dir_id: '3ab984a52b49806a2a29a14d31cc063f',
        created_at: '2023-11-17T10:55:36.061274688Z',
        updated_at: '2023-11-17T10:58:40.254562842Z',
        size: '51',
        md5sum: 'AYU8xZStzHKpiabOg2EHyg==',
        mime: 'text/vnd.cozy.note+markdown',
        class: 'text',
        executable: false,
        trashed: false,
        encrypted: false,
        metadata: {
          content: {
            content: [],
            type: 'doc'
          },
          schema: {
            marks: [],
            nodes: [],
            version: 4
          },
          title: '',
          version: 57
        },
        cozyMetadata: {
          doctypeVersion: '1',
          metadataVersion: 1,
          createdAt: '2023-11-17T10:55:36.061274688Z',
          createdByApp: 'notes',
          updatedAt: '2023-11-17T10:58:40.254562842Z',
          createdOn: 'https://yannickchironcozywtf1.cozy.wtf/'
        },
        internal_vfs_id: 'HyepeHXMIHkKhrmq',
        _id: '018bdcec-00c8-7155-b352-c8a8f472f882',
        _rev: '2-c78707eb06cceaa5e95c1c4a4c4073bd'
      }
    },
    {
      id: '018c7cf1-1d00-73ac-9a7f-ee3190638183',
      key: '018c7cf1-1d00-73ac-9a7f-ee3190638183',
      value: {
        rev: '2-02e800df012ea1cc740e5ad1554cefe6'
      },
      doc: {
        type: 'file',
        name: 'IMG_0046.jpg',
        dir_id: 'io.cozy.files.root-dir',
        created_at: '2023-11-19T13:31:47+01:00',
        updated_at: '2023-12-18T12:40:25.379Z',
        size: '1732841',
        md5sum: 'i19eI81lfj3dTwc7i8ihfA==',
        mime: 'image/jpeg',
        class: 'image',
        executable: false,
        trashed: false,
        encrypted: false,
        tags: ['library'],
        metadata: {
          datetime: '2023-11-19T13:31:47+01:00',
          extractor_version: 2,
          flash: 'On, Fired',
          height: 3024,
          orientation: 6,
          width: 4032
        },
        referenced_by: [
          {
            id: '536bde9aef87dde16630d3c99d26453f',
            type: 'io.cozy.photos.albums'
          }
        ],
        cozyMetadata: {
          doctypeVersion: '1',
          metadataVersion: 1,
          createdAt: '2023-12-18T12:40:25.556898681Z',
          updatedAt: '2023-12-18T12:45:29.375968305Z',
          updatedByApps: [
            {
              slug: 'photos',
              date: '2023-12-18T12:45:29.375968305Z',
              instance: 'https://yannickchironcozywtf1.cozy.wtf/'
            }
          ],
          createdOn: 'https://yannickchironcozywtf1.cozy.wtf/',
          uploadedAt: '2023-12-18T12:40:25.556898681Z',
          uploadedOn: 'https://yannickchironcozywtf1.cozy.wtf/'
        },
        internal_vfs_id: 'SidToiYjmikHrFBP',
        _id: '018c7cf1-1d00-73ac-9a7f-ee3190638183',
        _rev: '2-02e800df012ea1cc740e5ad1554cefe6'
      }
    },
    {
      id: '018ca6a8-8292-7acb-bcaf-a95ccfd83662',
      key: '018ca6a8-8292-7acb-bcaf-a95ccfd83662',
      value: {
        rev: '3-e18fb4f579ba93d569cabcbacc7bcd60'
      },
      doc: {
        type: 'file',
        name: 'IMG_0047.jpg',
        dir_id: 'io.cozy.files.root-dir',
        created_at: '2023-11-19T13:31:47+01:00',
        updated_at: '2023-12-26T15:05:10.256Z',
        size: '1732841',
        md5sum: 'i19eI81lfj3dTwc7i8ihfA==',
        mime: 'image/jpeg',
        class: 'image',
        executable: false,
        trashed: false,
        encrypted: false,
        tags: ['library'],
        metadata: {
          datetime: '2023-11-19T13:31:47+01:00',
          extractor_version: 2,
          flash: 'On, Fired',
          height: 3024,
          orientation: 6,
          width: 4032
        },
        referenced_by: [
          {
            id: '536bde9aef87dde16630d3c99d26453f',
            type: 'io.cozy.photos.albums'
          }
        ],
        cozyMetadata: {
          doctypeVersion: '1',
          metadataVersion: 1,
          createdAt: '2023-12-26T15:05:10.51011657Z',
          updatedAt: '2025-01-12T12:33:00.313230696Z',
          updatedByApps: [
            {
              slug: 'photos',
              date: '2023-12-26T15:11:03.400641304Z',
              instance: 'https://yannickchironcozywtf1.cozy.wtf/'
            },
            {
              slug: 'drive',
              date: '2025-01-12T12:33:00.313230696Z',
              instance: 'https://yannickchironcozywtf1.cozy.wtf/'
            }
          ],
          createdOn: 'https://yannickchironcozywtf1.cozy.wtf/',
          uploadedAt: '2023-12-26T15:05:10.51011657Z',
          uploadedOn: 'https://yannickchironcozywtf1.cozy.wtf/'
        },
        internal_vfs_id: 'VSHXbbIKcufNgifx',
        id: '018ca6a8-8292-7acb-bcaf-a95ccfd83662',
        _rev: '3-e18fb4f579ba93d569cabcbacc7bcd60'
      }
    }
  ]
}
