import React, { useState } from "react";
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

import MenuAdmin from "../../../components/menu.admin";
import Footer from "../../../components/footer-admin";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const mdTheme = createTheme();

function UserRegisterContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telphone, setTelphone] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");
  const [tipo, setTipo] = useState("");

  const [open, setOpen] = React.useState(true);
  // eslint-disable-next-line no-unused-vars
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <MenuAdmin title={"Usuários"} />

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
                  href={"/admin/usuarios"}
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
                  <h2>Cadastro de Usuários</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        id="name"
                        name="name"
                        label="Nome completo"
                        fullWidth
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="telefone"
                        name="telefone"
                        label="Telefone"
                        fullWidth
                        autoComplete="telefone"
                        value={telphone}
                        onChange={(e) => setTelphone(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="password"
                        required
                        id="senha"
                        name="senha"
                        label="Senha"
                        fullWidth
                        autoComplete="senha"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="password"
                        required
                        id="senha"
                        name="senha"
                        label="Senha"
                        fullWidth
                        autoComplete="senha"
                        value={PasswordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <FormControl style={{ width: "100%" }}>
                        <InputLabel id="labelTipo">Tipo</InputLabel>
                        <Select
                          labelId="Tipo"
                          label="Tipo"
                          id="tipo"
                          value={tipo}
                          onChange={(e) => setTipo(e.target.value)}
                        >
                          <MenuItem value={1}>Administrador</MenuItem>
                          <MenuItem value={2}>Gerente</MenuItem>
                          <MenuItem value={3}>Funcionário</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button variant="contained">
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

export default function UserRegister() {
  return <UserRegisterContent />;
}
