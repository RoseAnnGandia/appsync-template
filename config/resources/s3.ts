import { S3BUCKET, STAGE } from "@config/env.json";

export const S3 = {
  S3Bucket: {
    Type: "AWS::S3::Bucket",
    Properties: {
      BucketName: S3BUCKET[STAGE],
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedHeaders: ["*"],
            AllowedMethods: ["GET", "PUT", "POST", "DELETE"],
            AllowedOrigins: ["*"],
            MaxAge: 3000,
          },
        ],
      },
      PublicAccessBlockConfiguration: {
        BlockPublicPolicy: false,
        RestrictPublicBuckets: false,
      },
      WebsiteConfiguration: {
        ErrorDocument: "index.html",
        IndexDocument: "index.html",
      },
      VersioningConfiguration: {
        Status: "Enabled",
      },
    },
  },

  S3BucketPolicy: {
    Type: "AWS::S3::BucketPolicy",
    Properties: {
      Bucket: {
        Ref: "S3Bucket",
      },
      PolicyDocument: {
        Statement: [
          {
            Sid: "AddPerm",
            Effect: "Allow",
            Principal: "*",
            Action: ["s3:GetObject", "s3:PutObject"],
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
  },
};
