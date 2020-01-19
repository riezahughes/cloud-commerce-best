const { prisma } = require("./generated/prisma-client");
const { GraphQLServer } = require("graphql-yoga");

const resolvers = {
  Query: {
    customers: (root, args, context) => context.prisma.customers()
  },
  Mutation: {
    createProduct: (root, { input }, context) =>
      context.prisma.createProduct(input),
    updateProduct: (root, { input, id }, context) =>
      context.prisma.updateProduct({ data: input, where: { id } })
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
