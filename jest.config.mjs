import nextJest from 'next/jest.js';
const createJestConfig = nextJest({
  dir: './',
});
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  // testEnvironment: "node",
  preset: 'ts-jest',
  "moduleNameMapper": {
  '^@/(.*)$': '<rootDir>/src/$1'
}
};
export default createJestConfig(customJestConfig);
