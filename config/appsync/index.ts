import { SERVICE, STAGE } from "@config/env.json";
import { Authentication } from "./authentication";
import { DataSources } from "./data-sources";
import { Resolvers } from "./resolvers";

export const Appsync = {
  appSync: {
    name: `${SERVICE}-${STAGE}`,
    ...Authentication,
    dataSources: DataSources,
    resolvers: Resolvers(),
    schema: ["./src/graphql/**.graphql"],
  },
};
