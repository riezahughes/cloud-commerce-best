const { validateExists } = require("../validations");

module.exports = {
  Query: {},
  Mutation: {
    createItemOption: async (
      root,
      { input: { name, value, itemId } },
      context
    ) => {
      const itemCondition = { id: itemId };
      await validateExists("item", itemCondition, context);

      return context.prisma.createItemOption({
        item: { connect: itemCondition },
        name,
        value
      });
    },
    updateItemOption: async (
      root,
      { input: { itemId, name, value }, id },
      context
    ) => {
      const itemCondition = { id: itemId };
      await validateExists("item", itemCondition, context);

      return context.prisma.updateItemOption({
        data: {
          ...(itemId && { item: { connect: itemCondition } }),
          name,
          value
        },
        where: { id }
      });
    }
  }
};
