import type { AWS } from "@serverless/typescript";
import { SERVICE } from "@config/env.json";
import { AppSyncConfig } from "serverless-appsync-plugin";

import hello from "@functions/hello";
import { Provider } from "@config/provider";
import { Package } from "@config/package";
import { Custom } from "@config/custom";
import { Resources } from "@config/resources";
import { Appsync } from "@config/appsync";

const serverlessConfiguration: AWS | AppSyncConfig = {
  service: SERVICE,
  configValidationMode: "error",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-appsync-plugin"],
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    region: "ap-southeast-1",
    ...Provider,
  },
  functions: { hello },
  package: Package,
  custom: Custom,
  ...Appsync,
  resources: Resources,
};

module.exports = serverlessConfiguration;
