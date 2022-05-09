import React, { useEffect, useState } from "react";
import api from "./api";
import { logout, getToken } from "./auth";
import { Route, Redirect } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function WAuth({ component: Component, ...rest }) {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      var res = await api.get("/api/user/checktoken", {
        params: { token: getToken() },
      });

      if (res.data.status === 200) {
        setLoading(false);
        setRedirect(false);
      } else {
        logout();
        setLoading(false);
        setRedirect(true);
      }
    }
    // verify();
    setTimeout(() => verify(), 1000);
  }, []);

  return loading ? (
    <CircularProgress
      style={{ margin: "auto", display: "flex", marginTop: "200px" }}
    />
  ) : (
    <Route
      {...rest}
      render={(props) =>
        !redirect ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/admin/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
