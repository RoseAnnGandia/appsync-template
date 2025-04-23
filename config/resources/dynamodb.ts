import { SERVICE, STAGE } from "@config/env.json";

export const DynamoDb = {
  RawTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: `${SERVICE}-${STAGE}`,
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH",
        },
        {
          AttributeName: "sort",
          KeyType: "RANGE",
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "GSK1",
          KeySchema: [
            {
              AttributeName: "pk1",
              KeyType: "HASH",
            },
            {
              AttributeName: "sk1",
              KeyType: "RANGE",
            },
          ],
          Projection: {
            ProjectionType: "ALL",
          },
        },
        {
          IndexName: "GSK2",
          KeySchema: [
            {
              AttributeName: "pk2",
              KeyType: "HASH",
            },
            {
              AttributeName: "sk2",
              KeyType: "RANGE",
            },
          ],
          Projection: {
            ProjectionType: "ALL",
          },
        },
        {
          IndexName: "GSK3",
          KeySchema: [
            {
              AttributeName: "pk3",
              KeyType: "HASH",
            },
            {
              AttributeName: "sk3",
              KeyType: "RANGE",
            },
          ],
          Projection: {
            ProjectionType: "ALL",
          },
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S",
        },
        {
          AttributeName: "sort",
          AttributeType: "S",
        },
        {
          AttributeName: "pk1",
          AttributeType: "S",
        },
        {
          AttributeName: "sk1",
          AttributeType: "S",
        },
        {
          AttributeName: "pk2",
          AttributeType: "S",
        },
        {
          AttributeName: "sk2",
          AttributeType: "S",
        },
        {
          AttributeName: "pk3",
          AttributeType: "S",
        },
        {
          AttributeName: "sk3",
          AttributeType: "S",
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
      TimeToLiveSpecification: {
        AttributeName: "expires_in",
        Enabled: true,
      },
    },
  },
};
