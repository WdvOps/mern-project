const express = require("express");

const routes = express.Router();

const User = require("./controllers/users.controller");

routes.get("/", User.index);
routes.post("/api/users", User.create);

module.exports = routes;
