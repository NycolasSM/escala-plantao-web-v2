import React from "react";
import { Container, NavigationMenuIcon } from "./styles";

import Link from "next/link";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useAuthContext } from "../../../../context/AuthContext";

const Navigation = () => {
  const { isLogged, userInfo } = useAuthContext();

  return (
    <Container>
      <ul>
        <li>
          <Link href='/'>Criar Escalas</Link>
        </li>
        <li>
          <Link href='/historic'>Histórico Escalas</Link>
        </li>
        {userInfo.setor != "CCO" ? (
          <li>
            <Link href='/users'>Usuários</Link>
          </li>
        ) : null}
      </ul>
    </Container>
  );
};

export default Navigation;
