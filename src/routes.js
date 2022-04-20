const express = require("express");

const routes = express.Router();

const User = require("./controllers/users.controller");
const Visit = require("./controllers/visits.controller");

routes.get("/", User.index);

//Users routes
routes.post("/api/user", User.create);
routes.get("/api/user", User.index);
routes.get("/api/user.details/:_id", User.details);
routes.delete("/api/user/:_id", User.delete);
routes.put("/api/user", User.update);

//Visit routes
routes.post("/api/visit", Visit.create);
routes.get("/api/visit", Visit.index);
routes.get("/api/visit.details/:_id", Visit.details);
routes.delete("/api/visit/:_id", Visit.delete);
routes.put("/api/visit", Visit.update);

module.exports = routes;
