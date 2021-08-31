export default {
  clearMocks: true,
  roots: [
      "<rootDir>/src"
  ],
  testEnvironment: "node",
  preset: "ts-jest",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8"
};
