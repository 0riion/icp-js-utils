// https://salithachathuranga94.medium.com/setting-up-node-js-project-for-testing-with-jest-1dcc6d3ba5a8
const commonConfig = require("./jest.config");

module.exports = {
  ...commonConfig,
  testMatch: ["**/*.integration.test.{js,jsx,ts,tsx}"],
  coverageDirectory: "coverage/integration",
};
