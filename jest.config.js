module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // maps @/ to your src folder
  },
  // If you are using TypeScript, also add extensions:
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  transformIgnorePatterns: [
    "/node_modules/", // don't transform node_modules by default
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
