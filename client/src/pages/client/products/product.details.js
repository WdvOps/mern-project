import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuAdmin from "../../../components/menu-admin";
import Footer from "../../../components/footer-admin";

// import api from "../../../services/api";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
// import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

const tiers = [
  {
    title: "Produto nome",
    price: "15",
    description: "Descrição do produto",
    buttonText: "Adicionar ao carrinho",
    buttonVariant: "contained",
  },
];
// {
//   title: "Enterprise",
//   price: "30",
//   description: [
//     "50 users included",
//     "30 GB of storage",
//     "Help center access",
//     "Phone & email support",
//   ],
//   buttonText: "Contact us",
//   buttonVariant: "outlined",
// },

const mdTheme = createTheme();

function ProductDetails() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <MenuAdmin title={"Detalhes do produto"} />

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
          <Container maxWidth="lg" sx={{ mt: 8, mb: 6 }}>
            <Grid item sm={12}>
              <Button
                style={{ marginBottom: 10 }}
                variant="contained"
                href={"/admin/products"}
              >
                <ArrowBackIcon sx={{ mr: 1 }} /> Voltar
              </Button>
            </Grid>

            {/* Album */}
            <Container
              disableGutters
              maxWidth="sm"
              component="main"
              sx={{ pt: 8, pb: 6, ml: 26 }}
            >
              <Typography
                component="h2"
                variant="h3"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Detalhes do Produto
              </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main" sx={{ ml: 45 }}>
              <Grid container spacing={5} alignItems="flex-end">
                {tiers.map((tier) => (
                  // Enterprise card is full width at sm breakpoint
                  <Grid
                    item
                    key={tier.title}
                    xs={12}
                    sm={tier.title === "Enterprise" ? 12 : 6}
                    md={4}
                  >
                    <Card>
                      <CardHeader
                        title={tier.title}
                        subheader={tier.subheader}
                        titleTypographyProps={{ align: "center" }}
                        action={tier.title === "Pro" ? <StarIcon /> : null}
                        subheaderTypographyProps={{
                          align: "center",
                        }}
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? theme.palette.grey[200]
                              : theme.palette.grey[700],
                        }}
                      />
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "baseline",
                            mb: 2,
                          }}
                        >
                          <Typography
                            component="h2"
                            variant="h3"
                            color="text.primary"
                          >
                            ${tier.price}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            /mo
                          </Typography>
                        </Box>

                        <Typography
                          component="h2"
                          variant="subtitle1"
                          align="center"
                        >
                          {tier.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button fullWidth variant={tier.buttonVariant}>
                          {tier.buttonText}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
            <Footer sx={{ mr: 15, mt: 6, pt: 2 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function ProductDetailsPage() {
  return <ProductDetails />;
}
