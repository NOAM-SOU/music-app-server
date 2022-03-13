//Imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { connectDB } = require("./models/modelsIndex.js");
const {
  songsRoute,
  usersRoute,
  searchRoute,
  playlistRoute,
} = require("./routes/router.js");

//Uses
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Connect the Database
connectDB().then(() => {
  console.log("Connected to DB successfully");
});

//Use routes
app.use("/songs", songsRoute);
app.use("/users", usersRoute);
app.use("/search", searchRoute);
app.use("/playlist", playlistRoute);

//Listen
// const port = process.env.PORT || 5000;
const port = 5001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
