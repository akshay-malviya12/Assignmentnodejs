const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
    token: { type: GraphQLString }
  }
});

module.exports = userType;
