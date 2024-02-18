const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const userQuery = require("./backend/src/graphql/schema/queries/user");
const userMutation = require("./backend/src/graphql/schema/mutation/user");
const loginRouter = require("./backend/src/controllers/login");
const signupRouter = require("./backend/src/controllers/signup");
const userListShowRouter = require("./backend/src/controllers/UserList");
const mfaRouter = require("./backend/src/controllers/mfa");
const schemabook = require("./backend/src/graphql/bookSchema/bookSchema");
const root = require("./backend/src/graphql/bookSchema/bookroot");

app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schemabook,
    rootValue: root,
    graphiql: true, // Enable GraphiQL GUI for testing
  }),
);

//add router path.
app.use(express.json());
app.use("/", signupRouter);
app.use("/", loginRouter);
app.use("/", userListShowRouter);
app.use("/mfaverify", mfaRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
