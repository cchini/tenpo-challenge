module.exports = {
  rootDir: './',
  testTimeout: 30000,
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/__mocks__/mock-files.js',
    '\\.module\\.(css|scss)$': '<rootDir>/node_modules/identity-obj-proxy',
    '\\.(css|scss|less)$': '<rootDir>/config/__mocks__/mock-styles.js',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  setupFilesAfterEnv: [
    '<rootDir>/setupTests.js',
    '<rootDir>/node_modules/@testing-library/jest-dom/dist/index.js',
  ],
  coveragePathIgnorePatterns: [],
  coverageDirectory: '<rootDir>/config/__coverage__/',
  transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
};
