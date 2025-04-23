import { util, Context } from "@aws-appsync/utils";
import { result } from "@libs/resolvers/result";
import { update } from "@aws-appsync/utils/dynamodb";
import { attrCondition } from "@libs/resolvers/condition";

export function request(ctx: Context) {
  const timeStamp = util.time.nowEpochSeconds(),
    { input, id } = ctx.args;

  return update({
    key: { id, sort: "SAMPLE" },
    update: {
      ...input,
      dateUpdated: timeStamp,
    },
    condition: attrCondition(),
  });
}

export const response = (ctx: Context) => result(ctx);
