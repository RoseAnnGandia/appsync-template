interface UnitResolverTemplate extends Record<string, any> {
  directory: String;
  units: {
    dataSource: String;
    Query: String[];
    Mutation: String[];
  }[];
}

/**
 * Returns formatted resolvers for UNIT kind.
 *
 * @returns
 * ```
 *[{
    "Query.user": {
      kind: "UNIT",
      dataSource: "RawTable",
      code: ".path/user.ts",
    }
  }]
 * ```
 */
export const unitResolvers = (template: UnitResolverTemplate) => {
  let resolvers = [];
  const { units, directory } = template;
  units.forEach((unit) => {
    Object.keys(unit).forEach((unitKey) => {
      if (unitKey === "dataSource") return;

      unit[unitKey].forEach((resolverName) => {
        const folderName = unitKey === "Mutation" ? "mutations" : "queries";
        const resolverType = `${unitKey}.${resolverName}`;

        resolvers.push({
          [resolverType]: {
            kind: "UNIT",
            dataSource: unit.dataSource,
            code: `${directory}/${folderName}/${resolverName}.ts`,
          },
        });
      });
    });
  });

  return resolvers;
};
