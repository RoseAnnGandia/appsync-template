import { SERVICE, STAGE, S3BUCKET, PROFILE, ACCOUNTID } from "@config/env.json";

export const UserPool = {
  UserPool: {
    Type: "AWS::Cognito::UserPool",
    Properties: {
      UserPoolName: `${SERVICE}-${STAGE}`,
      AdminCreateUserConfig: {
        AllowAdminCreateUserOnly: true,
        InviteMessageTemplate: {
          SMSMessage: `Your account ID: {username}. Your password: {####}. Use your email or phone number to login at https://${S3BUCKET[STAGE]}`,
          EmailMessage: `<p>Your credentials are:</p><p>U: {username}</p><p>P: {####}</p><p>You can access the control center at https://${S3BUCKET[STAGE]}</p>`,
          EmailSubject: `${S3BUCKET[STAGE]} Control Center Credentials`,
        },
      },
      AliasAttributes: ["preferred_username", "email", "phone_number"],
      AutoVerifiedAttributes: ["email", "phone_number"],
      MfaConfiguration: "OPTIONAL",
      SmsConfiguration: {
        ExternalId: `${SERVICE}-${STAGE}-external`,
        SnsCallerArn: `arn:aws:iam::${
          ACCOUNTID[PROFILE[STAGE]]
        }:role/AppSyncSNSRole`,
      },
      EnabledMfas: ["SMS_MFA", "SOFTWARE_TOKEN_MFA"],
      Schema: [
        {
          AttributeDataType: "String",
          Mutable: true,
          Name: "type",
        },
        {
          AttributeDataType: "String",
          Mutable: true,
          Name: "roles",
        },
      ],
      Policies: {
        PasswordPolicy: {
          RequireLowercase: true,
          RequireUppercase: true,
          RequireSymbols: true,
          RequireNumbers: true,
          MinimumLength: 8,
          TemporaryPasswordValidityDays: 365,
        },
      },
      UserPoolTags: {
        Projects: SERVICE,
        Stage: STAGE,
      },
    },
  },

  UserPoolWebClient: {
    Type: "AWS::Cognito::UserPoolClient",
    Properties: {
      ClientName: `${SERVICE}-${STAGE}-web`,
      GenerateSecret: false,
      ExplicitAuthFlows: [
        "ALLOW_USER_PASSWORD_AUTH",
        "ALLOW_REFRESH_TOKEN_AUTH",
        "ALLOW_USER_SRP_AUTH",
      ],
      UserPoolId: {
        Ref: "UserPool",
      },
    },
  },

  UserPoolMobileClient: {
    Type: "AWS::Cognito::UserPoolClient",
    Properties: {
      ClientName: `${SERVICE}-${STAGE}-mobile`,
      GenerateSecret: true,
      UserPoolId: {
        Ref: "UserPool",
      },
    },
  },
};
