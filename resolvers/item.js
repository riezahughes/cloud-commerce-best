const { validateExists } = require("../validations");

module.exports = {
  Query: {
    items: (root, args, context) => context.prisma.items()
  },
  Mutation: {
    createItem: async (
      root,
      { input: { productId, sku, price, quantity } },
      context
    ) => {
      const productCondition = { id: productId };
      await validateExists("product", productCondition, context);

      return context.prisma.createItem({
        product: { connect: productCondition },
        sku,
        price,
        quantity
      });
    },
    updateItem: async (
      root,
      { input: { productId, sku, price, quantity }, id },
      context
    ) => {
      const productCondition = { id: productId };
      await validateExists("product", productCondition, context);

      return context.prisma.updateItem({
        data: {
          ...(productId && { product: { connect: productCondition } }),
          sku,
          price,
          quantity
        },
        where: { id }
      });
    }
  }
};
