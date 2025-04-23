export type HelloInput = {
  message: string;
  name: string;
};

export class Hello {
  greet(input: HelloInput): string {
    const { message, name } = input;

    return `${message} ${name}`;
  }
}
