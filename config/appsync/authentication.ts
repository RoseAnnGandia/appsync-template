import { REGION } from "@config/env.json";

export const Authentication = {
  authentication: {
    type: "AMAZON_COGNITO_USER_POOLS",
    config: {
      awsRegion: REGION,
      defaultAction: "ALLOW",
      userPoolId: {
        Ref: "UserPool",
      },
    },
  },
};
