import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
import BakcGroundImg from "../../../assets/image/vector.jpg";

import MenuAdmin from "../../../components/menu.admin";
import Footer from "../../../components/footer-admin";

const mdTheme = createTheme();

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
        <MenuAdmin />

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
          <Container
            maxWidth="lg"
            sx={{ ml: 50, mt: 12, mb: 4, textAlign: "center" }}
          >
            <Grid container spacing={2}>
              <img src={BakcGroundImg} alt="logo" />
            </Grid>
          </Container>
          <Footer sx={{ mr: 30, pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
