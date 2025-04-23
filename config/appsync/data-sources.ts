export const DataSources = {
  RawTable: {
    type: "AMAZON_DYNAMODB",
    config: {
      tableName: {
        Ref: "RawTable",
      },
    },
  },
};
