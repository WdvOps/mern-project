import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import api from "../services/api";
import { getToken,  logout } from "../services/auth";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton button component="a" href="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton button component="a" href="/admin/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuários" />
    </ListItemButton>
    <ListItemButton button component="a" href="/admin/products">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Produtos" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Opções
    </ListSubheader>
    <ListItemButton button onClick={confirmExit}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItemButton>
  </React.Fragment>
);

async function confirmExit() {
  if (window.confirm("Deseja realmente sair?")) {
    const response = await api.get("/api/user/destroytoken", {
      headers: {
        token: getToken(),
      },
    });
    if (response.status === 200) {
      logout();
      window.location.href = "/admin/login";
    } else {
      alert("Não foi possível fazer o logout!");
    }
  }
}
