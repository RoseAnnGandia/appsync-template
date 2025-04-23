import { Context } from "@aws-appsync/utils";
import { resultString } from "@libs/resolvers/result";
import { remove } from "@aws-appsync/utils/dynamodb";

export function request(ctx: Context) {
  let { id } = ctx.args;

  return remove({
    key: { id, sort: "SAMPLE" },
  });
}

export const response = (ctx: Context) => resultString(ctx);
