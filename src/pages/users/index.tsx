import { Container, SearchBar, Table, Button, Modal, ModalContent, Input, Wrapper } from "@/styles/pages/users";
import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const Historico = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "ALEXANDRE RIBEIRO",
      unidade: "RRDO2",
      endereco: "Endereço 1",
      telefone1: "123456789",
      telefone2: "987654321",
      email: "user1@example.com",
    },
    {
      id: 2,
      name: "JOÃO SILVA",
      unidade: "RRDO2",
      endereco: "Endereço 2",
      telefone1: "123456789",
      telefone2: "987654321",
      email: "user2@example.com",
    },
    // ...more users
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleAddUser = () => {
    setCurrentUser({ id: null, name: "", unidade: "", endereco: "", telefone1: "", telefone2: "", email: "" });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (currentUser.id) {
      setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)));
    } else {
      setUsers([...users, { ...currentUser, id: users.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <Container>
        <span>Usuários</span>
        <SearchBar type='text' placeholder='Pesquisar usuário' value={searchTerm} onChange={handleSearch} />
        {/* <Button onClick={handleAddUser}>
          <FaPlus /> Adicionar Usuário
        </Button> */}
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Unidade</th>
              <th>Endereço</th>
              <th>Telefone 1</th>
              <th>Telefone 2</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.name.includes(searchTerm))
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.unidade}</td>
                  <td>{user.endereco}</td>
                  <td>{user.telefone1}</td>
                  <td>{user.telefone2}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button onClick={() => handleEdit(user)}>
                      <FaEdit /> Editar
                    </Button>
                    <Button onClick={() => handleDelete(user.id)}>
                      <FaTrash /> Excluir
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {isModalOpen && (
          <Modal>
            <ModalContent>
              <h2>{currentUser.id ? "Editar Usuário" : "Adicionar Usuário"}</h2>
              <Input
                type='text'
                placeholder='Nome'
                value={currentUser.name}
                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              />
              <Input
                type='text'
                placeholder='Unidade'
                value={currentUser.unidade}
                onChange={(e) => setCurrentUser({ ...currentUser, unidade: e.target.value })}
              />
              <Input
                type='text'
                placeholder='Endereço'
                value={currentUser.endereco}
                onChange={(e) => setCurrentUser({ ...currentUser, endereco: e.target.value })}
              />
              <Input
                type='text'
                placeholder='Telefone 1'
                value={currentUser.telefone1}
                onChange={(e) => setCurrentUser({ ...currentUser, telefone1: e.target.value })}
              />
              <Input
                type='text'
                placeholder='Telefone 2'
                value={currentUser.telefone2}
                onChange={(e) => setCurrentUser({ ...currentUser, telefone2: e.target.value })}
              />
              <Input
                type='email'
                placeholder='Email'
                value={currentUser.email}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              />
              <Button onClick={handleSave}>Salvar</Button>
              <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </Wrapper>
  );
};

export default Historico;
