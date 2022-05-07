const express = require("express");

const routes = express.Router();

const User = require("./controllers/users.controller");
const Product = require("./controllers/products.controller");

routes.get("/", User.index);

//Users routes
routes.post("/api/user", User.create);
routes.get("/api/user", User.index);
routes.get("/api/user.details/:_id", User.details);
routes.delete("/api/user/:_id", User.delete);
routes.put("/api/user", User.update);
routes.post("/api/user/login", User.login);

//product routes
routes.post("/api/product", Product.create);
routes.get("/api/product", Product.index);
routes.get("/api/product.details/:_id", Product.details);
routes.delete("/api/product/:_id", Product.delete);
routes.put("/api/product", Product.update);

module.exports = routes;
