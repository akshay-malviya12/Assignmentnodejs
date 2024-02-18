// const express = require("express");
// const { graphqlHTTP } = require("express-graphql");
// const typeDefs = require("./backend/src/graphql/schema");
// const queryType = require("./backend/src/graphql/schema/query/user");
// const mutationType = require("./backend/src/graphql/schema/mutation/user");

// const login = require("./backend/src/controllers/login");
// const signup = require("./backend/src/controllers/signup");
// const {
//   authorizeUser,
//   authenticateUser,
// } = require("./backend/src/middleware/authmiddlewares");

// const app = express();

// const PORT = 5000;

// const schema = new GraphQLSchema({
//   query: QueryType,
//   mutation: MutationType,
// });
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: schema,
//     graphiql: true,
//   }),
// );

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const userQuery = require("./backend/src/graphql/schema/queries/user");
const userMutation = require("./backend/src/graphql/schema/mutation/user");
const loginRouter = require("./backend/src/controllers/login");
const signupRouter = require("./backend/src/controllers/signup");
const userListShowRouter = require("./backend/src/controllers/UserList");
const mfaRouter = require("./backend/src/controllers/mfa");
//
const schemabook = require("./backend/src/graphql/bookSchema/bookSchema");
const root = require("./backend/src/graphql/bookSchema/bookroot");
// Combine queries and mutations into a single schema
// const schema = new GraphQLSchema({
//   query: userQuery,
//   mutation: userMutation,
// });
// const monitor = require("./backend/src/bull&jobroccesing/monitor");
// // const queue = require("./backend/src/bull&jobroccesing/queue");
// const Queue = require("bull");
// const sendEmail = require("./backend/src/bull&jobroccesing/jobProcessor");
// ////create a bull queue
// const queue = new Queue("email-queue");
//const queue = require("./backend/src/bull&jobroccesing/jobProcessor");
app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schemabook,
    rootValue: root,
    graphiql: true, // Enable GraphiQL GUI for testing
  }),
);
app.use(express.json());
app.use("/", signupRouter);
app.use("/", loginRouter);
app.use("/", userListShowRouter);
app.use("/mfaverify", mfaRouter);

// app.use("/admin/queue", monitor);
// app.post("/enqueuejobs", async (req, res) => {
//   console.log("checked end POint hit or not");
//   try {
//     const job = await myQueue.add({ file: "example.txt" });
//     console.log(`job ${job.id} enqueued`);

//     res.status(200).json({ message: `job ${job.id} enqueued` });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
