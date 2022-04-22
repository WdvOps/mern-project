import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

//IMPORT ADMIN PAGES
import Dashboard from "./pages/admin/dashboard";

import Products from "./pages/admin/products";
import UpdateProducts from "./pages/admin/products/edit.product";
import ProducRegister from "./pages/admin/products/product.register";

import Users from "./pages/admin/users";
import UpdateUsers from "./pages/admin/users/edit.user";
import UserRegister from "./pages/admin/users/users.register";

//IMPORT CLIENT
import Home from "./pages/client/home";
import ProductDetails from "./pages/client/products/product.details";

export default function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        {/*Rota Cliente*/}
        <Route path="/" exact component={Home} />
        <Route path="/products/:idProduct" exact component={ProductDetails} />
        {/*Rota Admin Products*/}
        <Route path="/admin" exact component={Dashboard} />
        <Route path="/admin/products" exact component={Products} />
        <Route
          path="/admin/products/register"
          exact
          component={ProducRegister}
        />
        <Route
          path="/admin/products/edit/:idProduct"
          exact
          component={UpdateProducts}
        />

        {/*Rota Admin Users*/}
        <Route path="/admin/users" exact component={Users} />
        <Route path="/admin/users/register" exact component={UserRegister} />
        <Route path="/admin/users/edit/:idUser" exact component={UpdateUsers} />
      </Switch>
    </BrowserRouter>
  );
}
