import { DynamoDBFilterObject } from "@aws-appsync/utils";

/**
 * Return condition for the resolver operation to succeed.
 *
 * @param {boolean} isExist - check if ID attribute exists
 * @returns {DynamoDBFilterObject} - verifies whether the item is currently in DynamoDB.
 */
export function attrCondition(isExist: boolean = true): DynamoDBFilterObject {
  const condition: DynamoDBFilterObject<{
    id: String;
  }> = {
    id: { attributeExists: isExist },
  };

  return condition;
}
