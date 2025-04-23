import { get } from "@aws-appsync/utils/dynamodb";
import { result } from "@libs/resolvers/result";
import { Context } from "@aws-appsync/utils";

export function request(ctx: Context) {
  const { id } = ctx.args;

  return get({
    key: { id, sort: "SAMPLE" },
  });
}

export const response = (ctx: Context) => result(ctx);
