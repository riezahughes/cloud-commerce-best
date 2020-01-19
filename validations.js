const { ApolloError } = require("apollo-server-errors");

module.exports = {
  validateExists: async (entityName, condition, context) => {
    const exists = await context.prisma.$exists[entityName](condition);

    if (!exists) {
      throw new ApolloError(
        `${entityName} ${JSON.stringify(condition)} does not exist`,
        "NOT_FOUND",
        {
          association: {
            name: entityName,
            ...condition
          }
        }
      );
    }
  }
};
