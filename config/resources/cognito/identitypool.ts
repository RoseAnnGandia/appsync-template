import { SERVICE, STAGE } from "@config/env.json";

export const IdentityPool = {
  IdentityPool: {
    Type: "AWS::Cognito::IdentityPool",
    Properties: {
      IdentityPoolName: `${SERVICE}-${STAGE}`,
      AllowUnauthenticatedIdentities: false,
      CognitoIdentityProviders: [
        {
          ClientId: {
            Ref: "UserPoolWebClient",
          },
          ProviderName: {
            "Fn::GetAtt": ["UserPool", "ProviderName"],
          },
        },
        {
          ClientId: {
            Ref: "UserPoolMobileClient",
          },
          ProviderName: {
            "Fn::GetAtt": ["UserPool", "ProviderName"],
          },
        },
      ],
    },
  },

  IdentityPoolRole: {
    Type: "AWS::Cognito::IdentityPoolRoleAttachment",
    Properties: {
      IdentityPoolId: {
        Ref: "IdentityPool",
      },
      Roles: {
        authenticated: {
          "Fn::GetAtt": ["AuthRole", "Arn"],
        },
      },
    },
  },
};
