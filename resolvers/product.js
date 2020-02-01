module.exports = {
  Query: {
    products: (root, args, context) => context.prisma.products()
  },
  Mutation: {
    createProduct: (root, { input }, context) =>
      context.prisma.createProduct(input),
    updateProduct: (root, { input, id }, context) =>
      context.prisma.updateProduct({ data: input, where: { id } })
  }
};
