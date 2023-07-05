/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./env.config.ts'],
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/utils/'],
};
