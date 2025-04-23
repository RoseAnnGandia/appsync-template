import { unitResolvers } from "@libs/resolvers/unit-resolvers";
import { Units } from "@resolvers/config";

/**
 * Return resolvers for appsync.
 * This method uses {@link unitResolvers | unit resolvers function} to format UNIT kind of resolvers.
 *
 * @remarks
 * Pipeline kinds of resolvers not yet configured.
 * Please add/create libs for that.
 */
export const Resolvers = () => {
  const unitTemplate = {
    directory: "./src/resolvers",
    units: Units,
  };

  return unitResolvers(unitTemplate);
};
