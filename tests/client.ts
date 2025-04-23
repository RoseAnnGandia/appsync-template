import { default as client } from "aws-appsync";
import {
  AdminInitiateAuthCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import "isomorphic-fetch";

type AuthCreds = {
  clientId: string;
  userPoolId: string;
  username: string;
  password: string;
};

const cognito = new CognitoIdentityProviderClient({ region: "ap-southeast-1" });

const getCreds = (authInput: AuthCreds) => {
  const { clientId, userPoolId, username, password } = authInput;
  return cognito.send(
    new AdminInitiateAuthCommand({
      AuthFlow: "ADMIN_NO_SRP_AUTH",
      ClientId: clientId,
      UserPoolId: userPoolId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    })
  );
};

export const UserClient = () => {
  const { appsyncUrl, clientId, userPoolId, cognitoUsername, cognitoPassword } =
    process.env!;

  return new client({
    disableOffline: true,
    url: appsyncUrl!,
    region: "ap-southeast-1",
    auth: {
      type: "AMAZON_COGNITO_USER_POOLS",
      jwtToken: async () => {
        let cred = await getCreds({
          clientId: clientId!,
          userPoolId: userPoolId!,
          username: cognitoUsername!,
          password: cognitoPassword!,
        });

        return cred?.AuthenticationResult?.IdToken || "";
      },
    },
  });
};
