import React, { useState, useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Chip from "@mui/material/Chip";
// import Stack from "@mui/material/Stack";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import MenuAdmin from "../../../components/menu.admin";
import Footer from "../../../components/footer-admin";
import api from "../../../services/api";
import { ButtonGroup } from "@mui/material";

const mdTheme = createTheme();

function UserListContent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/api/user");
      setUsers(response.data);
    }

    loadUsers();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Deseja realmente excluir este usuário?")) {
      var result = await api.delete("/api/user/" + id);
      if (result.status === 200) {
        alert("Usuário excluido com sucesso!");
        window.location.href = "/admin/users";
      } else {
        alert("Erro ao excluir o usuário, tente novamente.");
      }
    }
  }

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
                              <TableCell align="left">Email</TableCell>
                              <TableCell align="left">Telefone</TableCell>
                              <TableCell align="left">Tipo</TableCell>
                              <TableCell align="left">
                                Data de cadastro
                              </TableCell>
                              <TableCell align="center">Ações</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {users.map((row) => (
                              <TableRow
                                key={row._id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.user_name}
                                </TableCell>
                                <TableCell>{row.user_email}</TableCell>
                                <TableCell align="right">
                                  {row.user_phone_number}
                                </TableCell>
                                <TableCell>
                                  {row.user_type === 1 ? (
                                    <Chip
                                      label="Admin"
                                      color="primary"
                                      variant="outlined"
                                    />
                                  ) : (
                                    <Chip
                                      label="Office"
                                      color="secondary"
                                      variant="outlined"
                                    />
                                  )}
                                </TableCell>
                                <TableCell>
                                  {new Date(row.createdAt).toLocaleString(
                                    "pt-br"
                                  )}
                                </TableCell>
                                <TableCell align="right">
                                  <ButtonGroup
                                    size="small"
                                    aria-label="small button group"
                                  >
                                    <Button color="primary">Atualizar</Button>
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

export default function UserRegister() {
  return <UserListContent />;
}
