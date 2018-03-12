const collectionMock = {
  all: jest.fn(() => Promise.resolve()),
  find: jest.fn(() => Promise.resolve()),
  create: jest.fn(() => Promise.resolve()),
  update: jest.fn(() => Promise.resolve()),
  destroy: jest.fn(() => Promise.resolve()),
  findReferencedBy: jest.fn(() => Promise.resolve())
}
const linkMock = jest.fn().mockImplementation(() => {
  return { collection: jest.fn(() => collectionMock) }
})
export default linkMock
