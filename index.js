const { prisma } = require("./generated/prisma-client");
const { GraphQLServer } = require("graphql-yoga");
const { validateExists } = require("./validations");

const resolvers = {
  Query: {
    customers: (root, args, context) => context.prisma.customers(),
    products: (root, args, context) => context.prisma.products(),
    items: (root, args, context) => context.prisma.items()
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
      const productCondition = {
        id: productId
      };
      await validateExists("product", productCondition, context);

      return context.prisma.createItem({
        product: { connect: productCondition },
        sku,
        price,
        quantity
      });
    },
    updateItem: (root, { input, id }, context) =>
      context.prisma.updateItem({ data: input, where: { id } })
  },
  Item: {
    product: parent => prisma.item({ id: parent.id }).product()
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
