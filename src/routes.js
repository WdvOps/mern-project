const express = require("express");

const routes = express.Router();

const User = require("./controllers/users.controller");

routes.get("/", User.index);

//Users routes
routes.post("/api/user", User.create);
routes.get("/api/user", User.index);
routes.get("/api/user.details/:_id", User.details);
routes.delete("/api/user/:_id", User.delete);

module.exports = routes;
