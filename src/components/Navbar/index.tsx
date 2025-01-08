import React, { useContext, useState } from "react";
import { Container, FoldMenuButton, Logo } from "./styles";

import Link from "next/link";

import Image from "next/image";

import NavButton from "./components/NavButton";

// Icons
import { RiFileCopy2Line, RiFileHistoryLine, RiMenuUnfoldFill } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";

import { useRouter } from "next/router";

import { UserContext } from "../../context/User";

const Navbar = () => {
  const { userInfo } = useContext(UserContext);

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
            navLink='/schedules'
            icon={<RiFileCopy2Line size={24} color={hasHightlight("/schedules") ? "#e9e9e9" : "#e9e9e9"} />}
            name={"Escalas"}
            hasHightlight={hasHightlight("/schedules")}
          />
          <NavButton
            initials='Histórico'
            navLink='/history'
            icon={<RiFileHistoryLine size={23} color={hasHightlight("/history") ? "#e9e9e9" : "#e9e9e9"} />}
            name={"Histórico"}
            hasHightlight={hasHightlight("/history")}
          />
          <NavButton
            initials='Usuários'
            navLink='/users'
            icon={<FiUsers size={22} color={hasHightlight("/users") ? "#e9e9e9" : "#e9e9e9"} />}
            name={"Usuários"}
            hasHightlight={hasHightlight("/users")}
          />
        </ul>
      </nav>
      <div style={{ position: "absolute", bottom: 8, width: "100%", textAlign: "center" }}>
        <Image
          src={require("../../../public/sabesp_logo.png")}
          alt='Sabesp Logo'
          width={34}
          placeholder='empty'
          priority={true}
          style={{ transition: "all ease 0.2s", marginRight: -2 }}
        />
      </div>
    </Container>
  );
};

export default Navbar;
