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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import MenuAdmin from "../../../components/menu.admin";
import Footer from "../../../components/footer-admin";
import api from "../../../services/api";

const mdTheme = createTheme();

function UserUpdateContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telphone, setTelphone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [typeUser, setTypeUser] = useState("");

  const { idUser } = useParams();

  useEffect(() => {
    async function getUser() {
      var response = await api.get("/api/user.details/" + idUser);
      setName(response.data.user_name);
      setEmail(response.data.user_email);
      setTelphone(response.data.user_phone_number);
      setPassword(response.data.user_password);
      setPasswordConfirm(response.data.user_password);
      setTypeUser(response.data.user_type);
    }

    getUser();
  }, [idUser]);

  async function handleSubmit() {
    const data = {
      _id: idUser,
      user_name: name,
      user_email: email,
      user_phone_number: telphone,
      user_password: password,
      password_confirm: passwordConfirm,
      user_type: typeUser,
    };

    if (password !== passwordConfirm) {
      alert("As senhas não conferem");
    } else if (
      name !== "" &&
      email !== "" &&
      telphone !== "" &&
      password !== "" &&
      passwordConfirm !== "" &&
      typeUser !== ""
    ) {
      const response = await api.put("/api/user", data);

      if (response.status === 200) {
        alert("Usuário atualizado com sucesso!");
        window.location.href = "/admin/users";
        console.log(data);
      } else {
        alert("Erro ao atualizar usuário");
        console.log(response.status);
      }
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <MenuAdmin title={"Atualização de Usuários"} />

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
                  href={"/admin/users"}
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
                  <h2>Atualizar Usuários</h2>
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="password"
                        required
                        id="confirm_password"
                        name="confirmSenha"
                        label="Confirme a Senha"
                        fullWidth
                        autoComplete="senha"
                        value={passwordConfirm}
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
                          value={typeUser}
                          onChange={(e) => setTypeUser(e.target.value)}
                        >
                          <MenuItem value={1}>Administrador</MenuItem>
                          <MenuItem value={2}>Gerente</MenuItem>
                          <MenuItem value={3}>Funcionário</MenuItem>
                        </Select>
                      </FormControl>
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

export default function UpdateUser() {
  return <UserUpdateContent />;
}
