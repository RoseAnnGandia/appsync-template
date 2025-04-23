import { DynamoDb } from "./dynamodb";
import { S3 } from "./s3";
import { UserPool } from "./cognito/userpool";
import { IdentityPool } from "./cognito/identitypool";
import { AuthRole } from "./cognito/auth-role";

export const Resources = {
  Resources: {
    ...UserPool,
    ...IdentityPool,
    ...AuthRole,
    ...DynamoDb,
    ...S3,
  },
};
