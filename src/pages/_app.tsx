// @ts-nocheck

import type { AppProps } from "next/app";
import GlobalStyle from "../../styles/globals";
import { AuthProvider } from "../context/AuthContext";
import { AvailableSchedulesProvider } from "../context/availableSchedulesContext";
import { FormProvider } from "../context/formContext";
import { Main } from "../../styles";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import Navbar from "../components/Navbar";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AvailableSchedulesProvider>
        <FormProvider>
          <div style={{ display: "flex", overflow: "hidden" }}>
            <Navbar />
            <Main className='dx-viewport' style={{ backgroundColor: "#e0e5e9" }}>
              <Header />
              <Component {...pageProps} />
              <Tooltip id='my-tooltip' style={{ backgroundColor: "#3691ad", color: "white" }} />
            </Main>
          </div>
          <GlobalStyle />
        </FormProvider>
      </AvailableSchedulesProvider>
    </AuthProvider>
  );
}

export default MyApp;
