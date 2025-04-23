## Table of Contents
- [Table of Contents](#table-of-contents)
- [Raw Table Indexes](#raw-table-indexes)
- [Access Patterns](#access-patterns)
- [Project structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Reminders](#reminders)

## Raw Table Indexes
| Index          | Filters              | PK-X                                | SK-X                                                    |
| -------------- | -------------------- | ----------------------------------- | ------------------------------------------------------- |
| ***SAMPLE***   |                      |                                     |                                                         |
| MAIN           | ID                   | `{id}`                              | `SAMPLE`                                                |
| GSK1           | Type                 | `TYPE#SAMPLE`                       | `DATECREATED#{dateCreated}`                             |


## Access Patterns
| Access Patterns        | Entity               | Index                                  | Query Expression                                                                   |
| ------------ | ----------------------| ------------------------------------- | ------------------------------------------------------------ |
| Sample details         | Sample                    | MAIN                                | `PK = id`                                                              |
| Sample lists         | Sample                  | GSK1                        | `PK1 = TYPE#SAMPLE`                                                                 |

## Project structure
```
.
├── bruno
│ 
├── config
│  ├── appsync
│  │  ├── authentication.ts
│  │  ├── data-sources.ts
│  │  ├── index.ts
│  │  └── resolvers.ts
│  │  
│  └── provider
│  │  ├── env.ts
│  │  ├── iam-role.ts
│  │  └── index.ts
│  │ 
│  └── resources
│  │  ├── cognito
│  │  │  ├── auth-role.ts 
│  │  │  ├── identitypool.ts 
│  │  │  └── userpool.ts 
│  │  │
│  │  ├── dynamodb.ts
│  │  ├── index.ts
│  │  └── s3.ts
│  │ 
│  └── custom.ts
│  └── env.json
│  └── package.ts
│  
├── docs
│  
├── libs     
│  ├── resolvers 
│  │  ├── condition.ts
│  │  ├── result.ts
│  │  └── unit-resolvers.ts
│  │ 
│  └── handler-path.ts  
│ 
├── src
│  ├── functions          
│  │  └── hello
│  │     ├── handler.ts     
│  │     ├── hello.ts     
│  │     └── index.ts   
│  │
│  ├── graphql                   
│  │  ├── base.graphql        
│  │  ├── sample.mutations.graphql
│  │  └── sample.queries.graphql      
│  │
│  └── resolvers         
│     ├── mutations 
│     │  ├── createSample.ts
│     │  ├── updateSample.ts
│     │  └── removeSample.ts
│     │
│     ├── queries 
│     │  ├── sample.ts
│     │  └── samples.ts
│     │
│     └── config.ts  
│
├── package.json
├── serverless.ts          
├── tsconfig.json          
├── tsconfig.paths.json            
└── typedoc.json       
```

## Environment Setup
1. Install dependencies
  ```
  $ npm install
  ```
2. Environment configuration
  
   Update `config/env.json` with project-wide environment values

3. Deploy in DEV env
  ```
  $ sls deploy -s dev
  ```

4. Run tests
  - Create `.secret.jest` with:
    - userPoolId
    - clientId
    - cognitoUsername
    - cognitoPassword
  - Run 
    - $ npm run test
  
5. Optional: Generate docs
  ```
  $ npm run test
  ```


## Reminders
1. Graphql - follow schema [naming conventions](https://www.apollographql.com/docs/technotes/TN0002-schema-naming-conventions/).
2. Bruno - do not forget to create a `.env` file for the ff variables and any other addtnl variables.
  - username 
  - password 
  - client-id
  - stage


[Back to Top 🔼](#table-of-contents)


