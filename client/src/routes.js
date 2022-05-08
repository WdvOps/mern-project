import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

//IMPORT ADMIN PAGES
import Dashboard from "./pages/admin/dashboard";
import Login from "./pages/admin/login";

import Products from "./pages/admin/products";
import UpdateProducts from "./pages/admin/products/edit.product";
import ProducRegister from "./pages/admin/products/product.register";

import Users from "./pages/admin/users";
import UpdateUsers from "./pages/admin/users/edit.user";
import UserRegister from "./pages/admin/users/users.register";

//IMPORT CLIENT
import Home from "./pages/client/home";
import ProductDetails from "./pages/client/products/product.details";

import PrivateRoute from "./services/wAuth";

export default function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        {/*Rota Cliente*/}
        <Route path="/" exact component={Home} />
        <Route path="/products/:idProduct" exact component={ProductDetails} />

        {/*Rota Admin Products*/}
        <PrivateRoute path="/admin" exact component={Dashboard} />
        <PrivateRoute path="/admin/products" exact component={Products} />
        <PrivateRoute
          path="/admin/products/register"
          exact
          component={ProducRegister}
        />
        <PrivateRoute
          path="/admin/products/edit/:idProduct"
          exact
          component={UpdateProducts}
        />

        {/*Rota Admin Users*/}
        <Route path="/admin/login" exact component={Login} />
        <PrivateRoute path="/admin/users" exact component={Users} />
        <PrivateRoute
          path="/admin/users/register"
          exact
          component={UserRegister}
        />
        <PrivateRoute
          path="/admin/users/edit/:idUser"
          exact
          component={UpdateUsers}
        />
      </Switch>
    </BrowserRouter>
  );
}
