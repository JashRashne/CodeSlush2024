const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const saltRounds = 10;
const bodyparser = require("body-parser");
const axios = require("axios");
const urlParse = require("url-parse");
app.use(cookieParser()); // for CRUD operations on cookies

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const now = new Date();
const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
const sevenDaysAgoMillis = sevenDaysAgo.getTime();

const mongo_uri = process.env.MONGO_URI;
mongoose
  .connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

app.post("/test", async (req, res) => {
  try {
    res.status(201).send(fitData);
  } catch (error) {
    console.log("TEST ERROR" + error);
  }
});

const port = 8000;
app.listen(process.env.PORT || port, () => {
  console.log("Server started at " + port);
});
module.exports = { app };
