module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",  // ✅ Ensures Jest runs in a browser-like environment
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",  // ✅ Transforms JSX & TypeScript with Babel
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
