export const Package = {
  individually: false,
  excludeDevDependencies: true,
  patterns: [
    "!src/graphql/**",
    "!config/**",
    "!**/node_modules/aws-sdk/**",
    "!.build/**",
    "!.dynamodb/**",
    "!.vscode/**",
    "!tests/**",
    "!docs/**",
    "!bruno/**",
  ],
};
