const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");
const userType = require("../typeDefs/user");
const { createUser } = require("../../../models/db");

const userMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: userType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
        token: { type: GraphQLString },
      },
      resolve(parent, args) {
        return createUser(args.name, args.email, args.role, args.token);
      },
    },
    // Define other mutations like updateUser and deleteUser here
  },
});

module.exports = userMutation;
