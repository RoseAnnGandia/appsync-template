const fetch = require("node-fetch");
const { jwtDecode } = require("jwt-decode");
require("core-js/stable/atob");

// Get JWT Token from Cognito
const session = async ({ username, password, region, clientId }) => {
  const domain = region.split("_")[0]; // backward compatible with Pool
  const requestBody = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  const request = {
    method: "post",
    headers: {
      "content-type": "application/x-amz-json-1.1",
      "x-amz-target": "AWSCognitoIdentityProviderService.InitiateAuth",
    },
    body: JSON.stringify(requestBody),
  };
  const response = await fetch(
    `https://cognito-idp.${domain}.amazonaws.com`,
    request
  );

  if (response.status !== 200) {
    console.log(
      "Looks like there was a problem. Status Code: " + response.status
    );
    return (
      "Error in getting session: " +
      JSON.stringify({ request, status: response.status })
    );
  }
  const { AuthenticationResult } = await response.json();

  return AuthenticationResult.AccessToken;
};

// Validate if the token has expired
const validToken = (token) => {
  const now = Date.now().valueOf() / 1000;
  try {
    const data = jwtDecode(token);
    if (typeof data.exp !== "undefined" && data.exp < now) {
      return false;
    }
    if (typeof data.nbf !== "undefined" && data.nbf > now) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

// Main run function
const run = async () => {
  const username = bru.getProcessEnv("username");
  const password = bru.getProcessEnv("password");
  const region = "ap-southeast-1";
  const clientId = bru.getProcessEnv(`${bru.getProcessEnv("stage")}-client-id`);

  const token = bru.getEnvVar("token");

  async function login() {
    try {
      const token = await session({
        username,
        password,
        region,
        clientId,
        token_type: "access",
      });

      setAuth(token);
    } catch (error) {
      // To keep thing simple we create a fake JWT token with error message
      throw Error(error.message);
    }
  }

  if (token && validToken(token)) {
    if (jwtDecode(token).error) {
      // Display error
      bru.setEnvVar("token", null);
      req.setHeader("Authorization", null);
      await login();
      return jwtDecode(token).error;
    }
    // JWT token is still valid, reuse it
    setAuth(token);
  } else {
    await login();
    // Compute a new token
  }
};

const setAuth = (token) => {
  bru.setEnvVar("token", token);
  req.setHeader("Authorization", token);
};

module.exports = { run };
