import Image from "next/image";
import logoLocalsig from "../assets/localsig.png";
import googleChromeLogo from "../assets/google-chrome.png";
import { LocalsigLogoContainer, LoginContainer, MessageErrorContainer, Warnings } from "../../styles/pages/login";
import Input from "../components/Input";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Slide, ToastContainer, toast } from "react-toastify";

import { GrConfigure } from "react-icons/gr";
import { BsInfoSquare } from "react-icons/bs";

const Login = () => {
  // AuthContext
  const { signIn, errorMessage, error, setErrorMessage, setIsLoading, isLoading } = useAuthContext();

  // States
  const [userCode, setUserCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberPassword, setRememberPassword] = useState<boolean>();
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem("password") != undefined) {
      setUserCode(localStorage.getItem("userCode")!);
      setPassword(localStorage.getItem("password")!);
      setRememberPassword(true);
    } else {
      setRememberPassword(false);
    }
  }, []);

  useEffect(() => {
    if (rememberPassword === false) {
      localStorage.removeItem("password");
      localStorage.removeItem("userCode");
    }
  }, [rememberPassword]);

  if (showError) {
    return (
      <>
        <p>{error?.toString() ?? "console: sem erros"}</p>
        <br />
        <p>error.code</p>
        <p>{error?.code}</p>
        <br />
        <p>error.message</p>
        <p>{error?.message}</p>
        <br />
        <p>error.isAxiosError</p>
        <p>{error?.isAxiosError}</p>
        <br />
        <p>error.status</p>
        <p>{error?.response?.status}</p>
        <br />
        <p>error.stack</p>
        <p>{error?.stack}</p>
        <br />
        <p>error.name</p>
        <p>{error?.name}</p>
        <br />
        <button
          onClick={() => setShowError(!showError)}
          style={{
            opacity: 0.15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 0,
            bottom: 1,
            height: 30,
            width: 30,
            cursor: "pointer",
          }}
        >
          <GrConfigure size={30} />
        </button>
      </>
    );
  }

  return (
    <>
      <ToastContainer autoClose={2500} transition={Slide} />
      <LoginContainer>
        {/* {errorMessage && (
          <MessageErrorContainer>
            <h1>{errorMessage}</h1>
          </MessageErrorContainer>
        )} */}
        <form>
          <LocalsigLogo />

          <Input id='login' placeholder='Usuário' value={userCode} onChange={setUserCode} type='text' />

          <Input id='password' type='password' placeholder='Senha' value={password} onChange={setPassword} />

          <footer>
            <div className='login__buttons'>
              <div className='checkbox-container'>
                <input
                  id='rememberPassword'
                  type='checkbox'
                  onClick={() => setRememberPassword(!rememberPassword)}
                  checked={rememberPassword}
                />
                <label htmlFor='rememberPassword'>Salvar usuário?</label>
              </div>
              <button
                onClick={(event: React.FormEvent) => {
                  event?.preventDefault();
                  setErrorMessage(null);
                  setIsLoading(true);
                  signIn(userCode, password, toast);
                  if (rememberPassword) {
                    localStorage.setItem("userCode", userCode);
                    localStorage.setItem("password", password);
                  }
                }}
              >
                {isLoading ? "Carregando..." : "Entrar"}
              </button>
            </div>
          </footer>
        </form>
      </LoginContainer>
      <button
        onClick={() => setShowError(!showError)}
        style={{
          opacity: 0.15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          right: 0,
          bottom: 1,
          height: 30,
          width: 30,
          cursor: "pointer",
        }}
      >
        <GrConfigure size={30} />
      </button>
      {/* <Warnings style={{ marginBottom: 50 }}>
        <div>
          <span>
            <BsInfoSquare style={{ marginTop: 4 }} size={35} color='#7a7a7a' />
          </span>
          <span>
            Em caso de dificuldades, entre em contato pelos telefones/Whastapp:{' '}
            <strong> Fábio Rodrigo - (13) 99747-9996</strong> /{' '}
            <strong> Alex - (13) 99656-3113 </strong>
            ou pelo e-mail <strong>localsig@localsig.com.br</strong>
          </span>
        </div>
      </Warnings> */}
    </>
  );
};

export const LocalsigLogo = () => (
  <LocalsigLogoContainer>
    <Image height={100} width={300} src={logoLocalsig} alt='Logo da empresa localsig' />
  </LocalsigLogoContainer>
);

export default Login;
