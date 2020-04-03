const commonConfig = {
  testURL: 'http://localhost',
  setupFiles: ['./jest.setup.js', 'jest-localstorage-mock'],
  setupFilesAfterEnv: [
    '<rootDir>/packages/cozy-stack-client/src/__tests__/setup.js'
  ],
  modulePathIgnorePatterns: ['<rootDir>/packages/.*/dist/'],
  transformIgnorePatterns: ['node_modules/(?!(cozy-ui))']
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
