import React, { useContext, useState } from "react";
import { Container, FoldMenuButton, Logo } from "./styles";

import Link from "next/link";

import Image from "next/image";

import NavButton from "./components/NavButton";

// Icons
import { RiFileCopy2Line, RiFileHistoryLine, RiMenuUnfoldFill } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { IoOptions } from "react-icons/io5";

import { useRouter } from "next/router";

import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { userInfo } = useContext(AuthContext);

  const router = useRouter();

  const hasHightlight = (navLink: string) => {
    if (router.asPath === navLink) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Container>
      <Link href='/'>
        <Logo>
          <Image
            src={require("../../../public/localsig_logo_white_bolder.png")}
            alt='LocalSIG Logo'
            width={41}
            height={41}
            placeholder='empty'
            priority={true}
            style={{ transition: "all ease 0.2s", marginRight: -2 }}
          />
        </Logo>
      </Link>
      <nav>
        <ul>
          <NavButton
            initials='Escalas'
            navLink='/'
            icon={<RiFileCopy2Line size={24} color={hasHightlight("/") ? "#e9e9e9" : "#e9e9e9"} />}
            name={"Escalas"}
            hasHightlight={hasHightlight("/")}
          />
          <NavButton
            initials='Histórico'
            navLink='/historic'
            icon={<RiFileHistoryLine size={23} color={hasHightlight("/historic") ? "#e9e9e9" : "#e9e9e9"} />}
            name={"Histórico"}
            hasHightlight={hasHightlight("/historic")}
          />
          <NavButton
            initials='Usuários'
            navLink='/users'
            icon={<FiUsers size={22} color={hasHightlight("/users") ? "#e9e9e9" : "#e9e9e9"} />}
            name={"Usuários"}
            hasHightlight={hasHightlight("/users")}
          />
          <NavButton
            initials='Parametrização '
            navLink='/parameters'
            icon={<IoOptions size={26} color={hasHightlight("/parameters") ? "#e9e9e9" : "#e9e9e9"} />}
            name={"Parametrização "}
            hasHightlight={hasHightlight("/parameters")}
          />
        </ul>
      </nav>
      <div style={{ position: "absolute", bottom: 8, width: "100%", textAlign: "center" }}>
        <Image
          src={require("../../../public/sabesp_logo.png")}
          alt='Sabesp Logo'
          width={38}
          height={50}
          placeholder='empty'
          priority={true}
          style={{ transition: "all ease 0.2s", marginRight: -2 }}
        />
      </div>
    </Container>
  );
};

export default Navbar;
