import "../styles/globals.css";
import type { AppProps } from "next/app";

import Navbar from "../components/Navbar";
import Header from "@/components/Header";

import { Main } from "../styles";

import { UserProvider } from "../context/User";
import { FiltersProvider } from "@/context/Filters";
import { RegistersProvider } from "../context/Registers";
import { AvailableSchedulesProvider } from "@/context/AvailableSchedulesContext";
import { ScheduleProvider } from "@/context/ScheduleContext";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserContext } from "../context/User";

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { userInfo } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [userInfo, router]);

  if (!userInfo && router.pathname !== "/login") {
    return null;
  }

  return <>{children}</>;
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <UserProvider>
      <FiltersProvider>
        <AvailableSchedulesProvider>
          <ScheduleProvider>
            <RegistersProvider>
              <AuthWrapper>
                <div style={{ display: "flex", overflow: "hidden" }}>
                  <Navbar />
                  <Main className='dx-viewport' style={{ backgroundColor: "#e0e5e9" }}>
                    <Header />
                    <Component {...pageProps} />
                    <Tooltip id='my-tooltip' style={{ backgroundColor: "#3691ad", color: "white" }} />
                  </Main>
                </div>
              </AuthWrapper>
            </RegistersProvider>
          </ScheduleProvider>
        </AvailableSchedulesProvider>
      </FiltersProvider>
    </UserProvider>
  );
}

export default MyApp;
