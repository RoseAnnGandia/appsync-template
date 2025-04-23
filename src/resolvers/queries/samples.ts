import { Context } from "@aws-appsync/utils";
import { result } from "@libs/resolvers/result";

export function request(ctx: Context) {
  return {
    operation: "Query",
    index: "GSK1",
    query: {
      expression: "pk1 = :pk1",
      expressionValues: util.dynamodb.toMapValues({
        ":pk1": "TYPE#SAMPLE",
      }),
    },
    nextToken: ctx?.args?.nextToken || null,
  };
}

export const response = (ctx: Context) => result(ctx);
