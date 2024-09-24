 export default  {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  collectCoverage: true, // Enable coverage collection
  setupFiles: ['./jest.setup.js'], 
  collectCoverageFrom: [
    'src/components/*.{js,jsx}', // Specify the files from which coverage info should be collected
    '!src/**/*.test.{js,jsx}', // Exclude test files
    '!src/serviceWorker.js', // Exclude service workers if needed
    '!src/index.js', // Exclude entry point files like index.js
  ],
  coverageDirectory: 'coverage', // Directory where coverage information is saved
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // Output formats for coverage reports
  coverageThreshold: { // Optional: Set minimum coverage thresholds
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  // testEnvironment: 'jsdom',
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};