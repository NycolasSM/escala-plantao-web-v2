// Next - React
import type { NextPage } from "next";
import { useState } from "react";

// Components
import Login from "./login";
import Header from "../components/Header";
import Dashboard from "./dashboard";
import HistoricoCCO from "./historicocco";
import MenuMobile from "../components/MenuMobile";

// Hooks
import { useAuthContext } from "../context/AuthContext";
import { FormProvider } from "../context/formContext";
import { AvailableSchedulesProvider } from "../context/availableSchedulesContext2";
import Head from "next/head";

const Home: NextPage = () => {
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  const { isLogged, userInfo } = useAuthContext();

  return (
    <>
      {/* <Header
        //openMenuMobile={openMenuMobile}
        setOpenMenuMobile={setOpenMenuMobile}
      /> */}
      <MenuMobile openMenuMobile={openMenuMobile} setOpenMenuMobile={setOpenMenuMobile} />
      {isLogged ? userInfo.setor === "CCO" ? <HistoricoCCO /> : <Dashboard /> : <Login />}
    </>
  );
};

export default Home;
