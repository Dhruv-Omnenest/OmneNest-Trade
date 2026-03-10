import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  // --- ADDED FOR WHOLE CODE COVERAGE ---
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text', 'html'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',          // Track every file in src
    '!src/**/*.d.ts',             // Ignore type definitions
    '!src/main.tsx',              // Ignore entry point
    '!src/vite-env.d.ts',         // Ignore Vite types
    '!**/node_modules/**',        // Ignore dependencies
  ],
  // -------------------------------------

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|svg)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json', 
      },
    ],
  },
};

export default config;