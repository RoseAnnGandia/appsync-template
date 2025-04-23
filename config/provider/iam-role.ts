import { STAGE } from "@config/env.json";

export const IAmRole = {
  role: {
    statements: [
      {
        Effect: "Allow",
        Action: ["cognito-idp:*User*", "cognito-idp:*Group*"],
        Resource: {
          "Fn::GetAtt": ["UserPool", "Arn"],
        },
      },
      {
        Effect: "Allow",
        Action: [
          "dynamodb:*Item",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:*Stream",
          "dynamodb:*Records",
          "dynamodb:*Shard*",
        ],
        Resource: [
          {
            "Fn::GetAtt": ["RawTable", "Arn"],
          },
          {
            "Fn::Join": [
              "/",
              [
                {
                  "Fn::GetAtt": ["RawTable", "Arn"],
                },
                "index",
                "*",
              ],
            ],
          },
          `arn:aws:dynamodb:ap-southeast-1:*:table/*-${STAGE}`,
          `arn:aws:dynamodb:ap-southeast-1:*:table/*-${STAGE}/index/*`,
        ],
      },
      {
        Effect: "Allow",
        Action: ["appsync:GraphQL"],
        Resource: "*",
      },
    ],
  },
};
