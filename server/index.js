const express = require("express");
const graphqlHTTP = require("express-graphql");
const Schema = require("./Schema/Schema");
const app = express();
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

//allow cross-origin requests
app.use(cors());

const PORT = process.env.PORT || 4000;

// Connect to the Mongo DB
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/loveactuallyd3";

mongoose.connect(MONGODB_URI);

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error: ")
);
mongoose.connection.once("open", () => {
  console.log(`Connected to mongoDB at ${MONGODB_URI}`);
});

// Set up connection to GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: true
  })
);

// Use morgan logger for logging requests
app.use(logger("dev"));

app.listen(PORT, () => {
  console.log("Now listening for requests on port 4000...");
});
