import React, { useContext, useState } from "react";

import { Container } from "../../styles/pages/login";

import Image from "next/image";
import LocalSIGLogo from "../../../public/localsig_logo.png";

import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/User";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await login(username, password);
    if (result) {
      router.push("/"); // Redirect to home page after successful login
    }
  };

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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </Container>
    </>
  );
};

export default Login;
