require("dotenv").config({ path: ".env-jest" });
require("dotenv").config({ path: ".secret.jest" });
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
};
