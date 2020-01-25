const { prisma } = require("./generated/prisma-client");
const { GraphQLServer } = require("graphql-yoga");
const { validateExists } = require("./validations");

const resolvers = {
  Query: {
    customers: (root, args, context) => context.prisma.customers(),
    products: (root, args, context) => context.prisma.products(),
    items: (root, args, context) => context.prisma.items(),
    itemOptions: (root, args, context) => context.prisma.itemOptions()
  },
  Mutation: {
    createProduct: (root, { input }, context) =>
      context.prisma.createProduct(input),
    updateProduct: (root, { input, id }, context) =>
      context.prisma.updateProduct({ data: input, where: { id } }),
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
    },
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
  },
  Item: {
    product: parent => prisma.item({ id: parent.id }).product()
    // itemOptions: parent => prisma.item({ id: parent.id }).itemOptions()
  },
  ItemOption: {
    item: parent => prisma.itemOption({ id: parent.id }).item()
  }
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: {
    prisma
  }
});

server.start(() => console.log("Server is running on http://localhost:4000"));
