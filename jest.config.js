const commonConfig = {
  testURL: 'http://localhost',
  setupFiles: ['./jest.setup.js', 'jest-localstorage-mock'],
  setupFilesAfterEnv: [
    '<rootDir>/packages/cozy-stack-client/src/__tests__/setup.js'
  ],
  watchPathIgnorePatterns: ['node_modules'],
  modulePathIgnorePatterns: ['<rootDir>/packages/.*/dist/'],
  transformIgnorePatterns: ['node_modules/(?!(cozy-ui))'],
  testEnvironment: 'jest-environment-jsdom-sixteen',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleNameMapper: {
    '.(png|gif|jpe?g)$': '<rootDir>/jestHelpers/mocks/fileMock.js'
  }
}

module.exports = {
  projects: [
    {
      displayName: 'Test JS files',
      testRegex: ['(\\.|/)(test|spec)\\.js$'],
      ...commonConfig
    },
    {
      displayName: 'Test JSX files',
      testMatch: ['**/(*.)(spec|test).jsx'],
      browser: true,
      ...commonConfig
    }
  ]
}
