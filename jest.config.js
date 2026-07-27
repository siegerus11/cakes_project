module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json'
      }
    ]
  },
  moduleNameMapper: {
    '\\.(css|scss|module\\.scss)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom']
};