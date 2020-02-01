const { prisma } = require("./generated/prisma-client");
const { GraphQLServer } = require("graphql-yoga");
const productResolvers = require("./resolvers/product");
const itemResolvers = require("./resolvers/item");
const itemOptionResolvers = require("./resolvers/itemOption");

const resolvers = {
  Query: {
    customers: (root, args, context) => context.prisma.customers(),
    ...productResolvers.Query,
    ...itemResolvers.Query,
    ...itemOptionResolvers.Query
  },
  Mutation: {
    ...productResolvers.Mutation,
    ...itemResolvers.Mutation,
    ...itemOptionResolvers.Mutation
  },
  Item: {
    product: parent => prisma.item({ id: parent.id }).product(),
    itemOptions: parent => prisma.item({ id: parent.id }).itemOptions()
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
