import React, { useState, useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

// import Chip from "@mui/material/Chip";
// import Stack from "@mui/material/Stack";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ButtonGroup } from "@mui/material";

import MenuAdmin from "../../../components/menu-admin";
import Footer from "../../../components/footer-admin";
// import ProductDetailsPage from "../products/product.details";
import api from "../../../services/api";
// import { getTypeName } from "../../../functions/static_data";

const mdTheme = createTheme();

function HomeContent() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function loadProduct() {
      const response = await api.get("/api/product");
      setProduct(response.data);
    }

    loadProduct();
  }, []);
  useEffect(() => {
    async function showProduct() {
      const response = await api.get("/api/product.details/");
      setProduct(response.data);
    }

    showProduct();
  }, []);

  async function handleShow(id) {
    var result = await api.get("/api/product/" + id);
    if (result.status === 200) {
      window.location.href = "/products/:idProduct";
    } else {
      alert("Erro ao exibir o produto, tente novamente.");
    }
  }

  const sharedProduct = () => {
    return (
      <>
        <h2>title:"Produto nome"</h2>
        <h2>price: "15"</h2>
        <p>description: "Descrição do produto"</p>
      </>
    );
  };
  sharedProduct();
  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <MenuAdmin title={"Produto"} />

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
              <Grid container spacing={3}>
                <Grid item sm={12}>
                  <Paper
                    style={{
                      padding: 35,
                      display: "flex",
                      overflow: "auto",
                      flexDirection: "column",
                    }}
                  >
                    <h2>Lista de Produtos</h2>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12}>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Produto</TableCell>
                                {/* <TableCell align="left">Produto</TableCell> */}
                                <TableCell align="left">Descrição</TableCell>
                                <TableCell align="left">Preço</TableCell>
                                <TableCell align="left">Quantidade</TableCell>

                                <TableCell align="center">Ações</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {product.map((row) => (
                                <TableRow
                                  key={row._id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row.product_name}
                                  </TableCell>
                                  <TableCell>
                                    {row.product_description}
                                  </TableCell>
                                  <TableCell align="left">
                                    {row.product_price}
                                  </TableCell>
                                  <TableCell align="left">
                                    {row.Product_amount}
                                  </TableCell>

                                  <TableCell align="center">
                                    <ButtonGroup
                                      size="small"
                                      aria-label="small button group"
                                    >
                                      <Button
                                        color="secondary"
                                        onClick={() => handleShow(row._id)}
                                        href={"/products/:idProduct" + row._id}
                                      >
                                        Exibir
                                      </Button>
                                    </ButtonGroup>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
              <Footer sx={{ mr: 15, mt: 6, pt: 2 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default function Home() {
  return <HomeContent />;
}
