const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");
const userType = require("../../../graphql/schema/typeDefs/user");
const { getAllUsers, getUserById } = require("../../../models/db");

const userQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    getUser: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return getUserById(args.id);
      },
    },
    getAllUsers: {
      type: new GraphQLList(userType),
      resolve(parent, args) {
        return getAllUsers();
      },
    },
  },
});

module.exports = userQuery;
