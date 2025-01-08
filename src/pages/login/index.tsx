import React, { useContext } from "react";

import { Container } from "../../styles/pages/login";

import Image from "next/image";
import LocalSIGLogo from "../../../public/LocalSIG Logo.png";

import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/User";

const Login: React.FC = () => {
  const { logout, userInfo } = useContext(UserContext);

  return (
    <>
      <Container style={{ width: "100%" }}>
        <h3>LocalSIG</h3>
        <Image
          src={LocalSIGLogo}
          height={80}
          width={90}
          style={{
            pointerEvents: "none",
          }}
          placeholder="blur"
          priority={true}
          alt="Background Logo"
        />
        {!userInfo ? (
          <form
            action="logout"
            onSubmit={(event) => {
              event.preventDefault();
              logout();
            }}
          >
            <p></p>
            <p></p>
            <button onClick={() => logout()}>Carregando...</button>
          </form>
        ) : (
          <form
            action="logout"
            onSubmit={(event) => {
              event.preventDefault();
              logout();
            }}
          >
            <p>Usuário conectado:</p>
            <p>{userInfo.nome}</p>
            <button onClick={() => logout()}>Logout</button>
          </form>
        )}
      </Container>
    </>
  );
};

export default Login;
