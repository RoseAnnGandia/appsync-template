import { Hello } from "./hello";

const hello = new Hello();

export const handler = async (event: any) => {
  let response;
  const { params, field } = event;

  switch (field) {
    case "greet":
      response = hello.greet(params);
      break;

    default:
      response = Promise.reject("Invalid field");
      break;
  }

  return response;
};
