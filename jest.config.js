module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/server.ts",
    "!src/types/**/*.ts"
  ]
};