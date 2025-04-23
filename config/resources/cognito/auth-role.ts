import { SERVICE, STAGE } from "@config/env.json";

export const AuthRole = {
  AuthRole: {
    Type: "AWS::IAM::Role",
    Properties: {
      Path: "/",
      AssumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: {
              Federated: "cognito-identity.amazonaws.com",
            },
            Action: ["sts:AssumeRoleWithWebIdentity"],
            Condition: {
              StringEquals: {
                "cognito-identity.amazonaws.com:aud": { Ref: "IdentityPool" },
              },
            },
          },
        ],
      },
      Policies: [
        {
          PolicyName: `${SERVICE}-${STAGE}-AuthPolicy`,
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Action: ["s3:*"],
                Resource: [
                  {
                    "Fn::GetAtt": ["S3Bucket", "Arn"],
                  },
                  {
                    "Fn::Join": [
                      "/",
                      [
                        {
                          "Fn::GetAtt": ["S3Bucket", "Arn"],
                        },
                        "*",
                      ],
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  },
};
