/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  testEnvironment: 'node',
  preset: '@shelf/hest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};

export default config;
