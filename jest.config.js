export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': ['babel-jest', { configFile: './babel.config.js' }]
  },
  testMatch: ['**/__tests__/**/*.test.js'],
  setupFiles: ['dotenv/config'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  moduleFileExtensions: ['js', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(supertest)/)'
  ]
}; 