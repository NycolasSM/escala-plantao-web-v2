// @ts-nocheck

import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Header from "../components/Header";
import MenuMobile from "../components/MenuMobile";
import { useAuthContext } from "../context/AuthContext";
import {
  StyledTableContainer,
  StyledTableRow,
  ActionsCell,
  StyledDialog,
  StyledTextField,
  StyledTableHead,
  WideCell,
  MediumCell,
  NarrowCell,
  Form,
  SearchUser,
} from "../../styles/pages/users";
import { Tooltip } from "@mui/material";
import { api } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Link from "next/link";
import { Container } from "../../styles/pages/historic";

const Users = () => {
  const { userInfo, isLogged } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogType, setDialogType] = useState(null);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [formData, setFormData] = useState({
    n_pes: "",
    nome: "",
    unidade: "",
    endereco: "",
    telefone_1: "",
    telefone_2: "",
    email: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nome");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await api("/funcionarios/funcionarios");

      const data = await response.data;

      setUsers(data);
    };

    fetchUsers().catch(console.error);
  }, []);

  const handleOpenDialog = (user, type) => {
    setSelectedUser(user);
    setDialogType(type);
    setFormData({ ...user });
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setDialogType(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateUser = async () => {
    try {
      const response = await api.put(`/funcionarios/funcionarios/${selectedUser.id}`, formData);
      const updatedUser = await response.data;
      const updatedUsers = users.map((user) => (user.id === selectedUser.id ? updatedUser : user));
      setUsers(updatedUsers);
      toast.success("Usuário atualizado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar usuário");
    }
    handleCloseDialog();
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/funcionarios/funcionarios/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("Usuário excluído com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir usuário");
    }
    handleCloseDialog();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateUser = async () => {
    try {
      const response = await api.post("/funcionarios/funcionarios", formData);
      const newUser = await response.data;
      setUsers([...users, newUser]);
      toast.success("Usuário criado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar usuário");
    }
    handleCloseDialog();
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    const sortedUsers = stableSort(users, getComparator(order, property));
    setUsers(sortedUsers);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1]; // mantém a estabilidade ao ordenar
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const TablePaginationActions = (props) => {
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div style={{ flexShrink: 0 }}>
        <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label='first page'>
          <FirstPageIcon />
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label='previous page'>
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label='next page'>
          <KeyboardArrowRight />
        </IconButton>
        <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label='last page'>
          <LastPageIcon />
        </IconButton>
      </div>
    );
  };

  if (!isLogged) {
    return (
      <>
        <Container>
          <h3 style={{ fontWeight: 500, fontSize: 16 }}>Você precisa estar logado para Acessar essa página</h3>
          <div style={{ maxWidth: 200, margin: "0 auto" }}>
            <Link
              href={{
                pathname: "/",
              }}
            >
              <button className='button__back__login'>Voltar Para Login</button>
            </Link>
          </div>
        </Container>
      </>
    );
  }

  return (
    <div>
      <ToastContainer autoClose={2500} transition={Slide} />
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", paddingLeft: 10, paddingRight: 10 }}>
        <SearchUser>
          <TextField
            label='Buscar Usuário'
            variant='outlined'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "300px" }}
            size='small'
          />
        </SearchUser>
        <Button onClick={() => handleOpenDialog({}, "create")} variant='contained' color='primary'>
          Adicionar Usuário
        </Button>
      </div>
      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <NarrowCell onClick={() => handleRequestSort("id")}>
                <span>ID</span>
              </NarrowCell>
              <NarrowCell onClick={() => handleRequestSort("n_pes")}>
                <span>Nº Pessoal</span>
              </NarrowCell>
              <MediumCell onClick={() => handleRequestSort("nome")}>
                <span>Nome</span>
              </MediumCell>
              <WideCell onClick={() => handleRequestSort("endereco")}>
                <span>Endereço</span>
              </WideCell>
              <MediumCell onClick={() => handleRequestSort("telefone_1")}>
                <span>Telefone</span>
              </MediumCell>
              {/* <NarrowCell onClick={() => handleRequestSort("telefone_2")}>Telefone 2</NarrowCell> */}
              <MediumCell onClick={() => handleRequestSort("email")}>
                <span>E-mail</span>
              </MediumCell>
              <ActionsCell style={{ paddingTop: 7 }}>
                <span>Ações</span>
              </ActionsCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {users
              .filter((user) => user?.nome?.toLowerCase().includes(searchTerm.toLowerCase()))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <StyledTableRow key={user.id}>
                  <NarrowCell>{user.id}</NarrowCell>
                  <NarrowCell>{user.n_pes}</NarrowCell>
                  <MediumCell>{user.nome}</MediumCell>
                  <WideCell>{user.endereco}</WideCell>
                  <MediumCell>{user.telefone_1}</MediumCell>
                  {/* <NarrowCell>{user.telefone_2}</NarrowCell> */}
                  <MediumCell>{user.email}</MediumCell>
                  <ActionsCell>
                    <div style={{ display: "flex", justifyContent: "center", gap: 8, alignItems: "center", paddingTop: 4 }}>
                      <Tooltip title='Visualizar'>
                        <Button onClick={() => handleOpenDialog(user, "view")}>
                          <VisibilityIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title='Editar'>
                        <Button onClick={() => handleOpenDialog(user, "edit")}>
                          <EditIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title='Excluir'>
                        <Button onClick={() => handleOpenDialog(user, "delete")}>
                          <DeleteIcon />
                        </Button>
                      </Tooltip>
                    </div>
                  </ActionsCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 30]}
          component='div'
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions} // Uso do componente personalizado
        />
      </StyledTableContainer>
      {selectedUser && (
        <StyledDialog open={Boolean(dialogType)} onClose={handleCloseDialog} aria-labelledby='user-dialog-title'>
          <DialogTitle>{`${
            dialogType === "view" ? "Visualizar" : dialogType === "edit" ? "Editar" : dialogType === "create" ? "Adicionar" : "Excluir"
          } Usuário`}</DialogTitle>
          <DialogContent>
            {dialogType === "delete" ? (
              "Tem certeza de que deseja excluir este usuário?"
            ) : (
              <>
                <Form>
                  <StyledTextField
                    label='Nº Pessoal'
                    variant='outlined'
                    fullWidth
                    name='n_pes'
                    value={formData.n_pes}
                    onChange={handleInputChange}
                    disabled={dialogType === "view"}
                    size='small'
                  />
                  <StyledTextField
                    label='Nome'
                    variant='outlined'
                    fullWidth
                    name='nome'
                    value={formData.nome}
                    onChange={handleInputChange}
                    disabled={dialogType === "view"}
                    size='small'
                  />
                  <StyledTextField
                    label='Unidade'
                    variant='outlined'
                    fullWidth
                    name='unidade'
                    value={formData.unidade}
                    onChange={handleInputChange}
                    disabled={dialogType === "view"}
                    size='small'
                  />
                  <StyledTextField
                    label='Endereço'
                    variant='outlined'
                    fullWidth
                    name='endereco'
                    value={formData.endereco}
                    onChange={handleInputChange}
                    disabled={dialogType === "view"}
                    size='small'
                  />
                  <StyledTextField
                    label='Telefone 1'
                    variant='outlined'
                    fullWidth
                    name='telefone_1'
                    value={formData.telefone_1}
                    onChange={handleInputChange}
                    disabled={dialogType === "view"}
                    size='small'
                  />
                  <StyledTextField
                    label='Telefone 2'
                    variant='outlined'
                    fullWidth
                    name='telefone_2'
                    value={formData.telefone_2}
                    onChange={handleInputChange}
                    disabled={dialogType === "view"}
                    size='small'
                  />
                  <StyledTextField
                    label='E-mail'
                    variant='outlined'
                    fullWidth
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={dialogType === "view"}
                    size='small'
                  />
                </Form>
              </>
            )}
          </DialogContent>
          <DialogActions>
            {dialogType === "delete" ? (
              <>
                <Button onClick={() => handleDeleteUser(selectedUser.id)} color='primary'>
                  Excluir
                </Button>
                <Button onClick={handleCloseDialog} color='secondary'>
                  Cancelar
                </Button>
              </>
            ) : dialogType === "create" ? (
              <>
                <Button onClick={handleCreateUser} color='primary'>
                  Adicionar
                </Button>
                <Button onClick={handleCloseDialog} color='secondary'>
                  Cancelar
                </Button>
              </>
            ) : (
              <Button onClick={handleCloseDialog} color='primary'>
                Fechar
              </Button>
            )}
            {dialogType === "edit" && (
              <Button onClick={handleUpdateUser} color='primary'>
                Salvar Alterações
              </Button>
            )}
          </DialogActions>
        </StyledDialog>
      )}
    </div>
  );
};

export default Users;
