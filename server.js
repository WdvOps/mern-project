require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
// const mongoose = require("mongoose");

const connectToDatabase = require("./src/database");
connectToDatabase();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", function (req, res) {
  res.json({ message: "Hello Json API" });
});

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
