import { SERVICE, STAGE, PROFILE, S3BUCKET } from "@config/env.json";
import { IAmRole } from "./iam-role";

export const Provider = {
  stage: STAGE,
  profile: PROFILE[STAGE],
  versionFunctions: false,
  stackName: `${SERVICE}-${STAGE}`,
  stackTags: {
    Projects: SERVICE,
  },
  apiGateway: {
    minimumCompressionSize: 1024,
    shouldStartNameWithService: true,
  },
  environment: {
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    rawTable: `${SERVICE}-${STAGE}`,
    userPool: {
      Ref: "UserPool",
    },
    s3Bucket: S3BUCKET[STAGE],
  },
  iam: IAmRole,
};
