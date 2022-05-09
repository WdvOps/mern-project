import React, { useState, useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import Chip from "@mui/material/Chip";
// import Stack from "@mui/material/Stack";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import MenuAdmin from "../../../components/menu-admin";
import Footer from "../../../components/footer-admin";
import api from "../../../services/api";
import { ButtonGroup } from "@mui/material";
// import { getTypeName } from "../../../functions/static_data";

const mdTheme = createTheme();

function ProductListContent() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function loadProduct() {
      const response = await api.get("/api/product");
      setProduct(response.data);
    }

    loadProduct();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      var result = await api.delete("/api/product/" + id);
      if (result.status === 200) {
        alert("Produto excluido com sucesso!");
        window.location.href = "/admin/product";
      } else {
        alert("Erro ao excluir o produto, tente novamente.");
      }
    }
  }

  return (
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
                <Button
                  style={{ marginBottom: 10 }}
                  variant="contained"
                  href={"/admin/product"}
                >
                  <ArrowBackIcon sx={{ mr: 1 }} /> Voltar
                </Button>
                <Paper
                  style={{
                    padding: 35,
                    display: "flex",
                    overflow: "auto",
                    flexDirection: "column",
                  }}
                >
                  <h2>Lista de Usuários</h2>
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
                              <TableCell>Nome</TableCell>
                              {/* <TableCell align="left">Produto</TableCell> */}
                              <TableCell align="left">Descrição</TableCell>
                              <TableCell align="left">Preço</TableCell>
                              <TableCell align="left">Quantidade</TableCell>
                              <TableCell align="left">
                                Data de cadastro
                              </TableCell>
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
                                <TableCell>{row.product_description}</TableCell>
                                <TableCell align="left">
                                  {row.product_price}
                                </TableCell>
                                <TableCell align="left">
                                  {row.Product_amount}
                                </TableCell>
                                {/* <TableCell>
                                  <Chip
                                    label={getTypeName(row.Product_amount)}
                                    color="primary"
                                    variant="outlined"
                                  />
                                </TableCell> */}
                                <TableCell>
                                  {new Date(row.createdAt).toLocaleString(
                                    "pt-br"
                                  )}
                                </TableCell>
                                <TableCell align="center">
                                  <ButtonGroup
                                    size="small"
                                    aria-label="small button group"
                                  >
                                    <Button
                                      color="primary"
                                      href={"/admin/Product/edit/" + row._id}
                                    >
                                      Atualizar
                                    </Button>
                                    <Button
                                      color="secondary"
                                      onClick={() => handleDelete(row._id)}
                                    >
                                      Excluir
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
  );
}

export default function ProductRegister() {
  return <ProductListContent />;
}
