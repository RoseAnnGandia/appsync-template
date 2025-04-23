/**
 * Return lists of queries and mutations fields for UNIT kinds of resolvers.
 *
 * @remarks
 * For the subquery, please add it under mutation.
 * ```
 * Type: ["field"]
 * ```
 */
export const Units = [
  {
    dataSource: "RawTable",
    Query: ["sample", "samples"],
    Mutation: ["createSample", "updateSample", "removeSample"],
  },
];

/**
 * Return lists of queries and mutations fields for PIPELINE kinds of resolvers.
 *
 * @remarks
 * No pipeline example for this project.
 */
export const Pipeline = [];
