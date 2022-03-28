const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri)
  .then((results) => {
    console.log(
      `Connected to Mongo! Database name: "${results.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to Mongo: ", err);
  });

const exerciseRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exerciseRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
