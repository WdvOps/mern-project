import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

import MenuAdmin from "../../../components/menu-admin";
import Footer from "../../../components/footer-admin";
import api from "../../../services/api";

const mdTheme = createTheme();

function ProductUpdateContent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  const { idProduct } = useParams();

  useEffect(() => {
    async function getProduct() {
      var response = await api.get("/api/product.details/" + idProduct);
      setName(response.data.product_name);
      setDescription(response.data.product_description);
      setPrice(response.data.product_price);
      setAmount(response.data.Product_amount);
    }

    getProduct();
  }, [idProduct]);

  async function handleSubmit() {
    const data = {
      _id: idProduct,
      product_name: name,
      product_description: description,
      product_price: price,
      Product_amount: amount,
    };

    if (idProduct === "") {
      alert("Produto não encontrado");
    } else if (
      name !== "" &&
      description !== "" &&
      price !== "" &&
      amount !== ""
    ) {
      const response = await api.put("/api/product", data);

      if (response.status === 200) {
        alert("Produto atualizado com sucesso!");
        window.location.href = "/admin/products";
        console.log(data);
      } else {
        alert("Erro ao atualizar produto");
        console.log(response.status);
      }
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <MenuAdmin title={"Atualização de Produto"} />

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
                  href={"/admin/products"}
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
                  <h2>Atualizar Produto</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        id="name"
                        name="name"
                        label="Nome do Produto"
                        fullWidth
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="description"
                        name="description"
                        label="Descrição"
                        fullWidth
                        autoComplete="descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="price"
                        name="price"
                        label="Preço"
                        fullWidth
                        autoComplete="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="amount"
                        name="amount"
                        label="Quantidade"
                        fullWidth
                        autoComplete="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <Button variant="contained" onClick={handleSubmit}>
                        <SaveIcon sx={{ mr: 1 }} /> Salvar
                      </Button>
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

export default function UpdateProducts() {
  return <ProductUpdateContent />;
}
