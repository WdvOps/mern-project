import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import DashAdmin from "./admin";
import DashManager from "./manager";
import DashOfficer from "./officer";

import MenuAdmin from "../../../components/menu-admin";
import Footer from "../../../components/footer-admin";

import { USER_TYPE } from "../../../services/auth";

const mdTheme = createTheme();

function changeDashboard() {
  if (localStorage.getItem(USER_TYPE) === "1") {
    return <DashAdmin />;
  } else if (localStorage.getItem(USER_TYPE) === "2") {
    return <DashManager />;
  } else {
    return <DashOfficer />;
  }
}

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  // eslint-disable-next-line no-unused-vars
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <MenuAdmin title={"Dashboard"} />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 11, mb: 4 }}>
            <Grid container spacing={3}>
              {changeDashboard()}
            </Grid>
            <Footer sx={{ mt: 2, pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
