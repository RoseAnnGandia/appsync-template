import { Context } from "@aws-appsync/utils";

/**
 * Returns customized error message and type.
 *
 * @param {Context} ctx - response from resolver invoked.
 */
const errorHandler = (ctx: Context) => {
  const { fieldName, parentTypeName } = ctx.info;
  let { type, message } = ctx.error;

  if (type === "DynamoDB:DynamoDbException") type = "Server syntax error!";

  if (
    (type === "DynamoDB:ConditionalCheckFailedException" ||
      type === "DynamoDB:TransactionCanceledException") &&
    parentTypeName === "Mutation"
  ) {
    if (fieldName.includes("create")) {
      message = "Please try another item!";
      type = "Item already exists!";
    }

    if (fieldName.includes("update")) {
      message = "Please double check item ID!";
      type = "Item does not exist!";
    }
  }

  util.error(message, type);
};

/**
 * This method uses an {@link errorHandler | error handling function} to customize the error to throw to the client.
 *
 * @param {Context} ctx - response from resolver invoked.
 * @returns {Context} - result of resolver invoked.
 */
export function result(ctx: Context): Context {
  const { result, error } = ctx;

  if (error) {
    errorHandler(ctx);
  }

  return result;
}

/**
 * This method uses an {@link errorHandler | error handling function} to customize the error to throw to the client.
 *
 * @param {Context} ctx - response from resolver invoked.
 * @param {String} message - customized message, if any.
 * @returns {String} - customized message, if any. Default to "Success!".
 */
export function resultString(
  ctx: Context,
  message: String = "Success!"
): String {
  if (ctx.error) {
    errorHandler(ctx);
  }

  return message;
}
