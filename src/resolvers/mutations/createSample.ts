import { util, Context } from "@aws-appsync/utils";
import { result } from "@libs/resolvers/result";
import { put } from "@aws-appsync/utils/dynamodb";

export function request(ctx: Context) {
  const { input } = ctx.args,
    timeStamp = util.time.nowEpochSeconds();

  return put({
    key: { id: util.autoUlid(), sort: "SAMPLE" },
    item: {
      ...input,
      pk1: "TYPE#SAMPLE",
      sk1: `DATECREATED#${timeStamp}`,
      dateCreated: timeStamp,
      dateUpdated: timeStamp,
    },

    // add condition if needed
    // condition: attrCondition(false),
  });
}

export const response = (ctx: Context) => result(ctx);
