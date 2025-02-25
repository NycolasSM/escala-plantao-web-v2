import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type AuthContextType = {
  signIn: (code: string, password: string) => Promise<void>;
  setErrorMessage: (value: string | null) => void;
  setIsLoading: (value: boolean) => void;
  setIsLogged: (value: boolean) => void;
  isLogged: boolean;
  isLoading: boolean;
  errorMessage: string | null;
  loggedUser: User;
  userInfo: UserInfoProps;
  error: AxiosError;
};

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  code: string;
  password: string;
};

type UserInfoProps = {
  id: number;
  usuario: string;
  n_pes: string;
  nome: string;
  senha: string;
  plantao: string;
  local_operacional: string;
  local_eta: string;
  setor: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  // Router
  const Router = useRouter();

  // States
  const [isLogged, setIsLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User>({} as User);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const [userInfo, setUserInfo] = useState<UserInfoProps>({} as UserInfoProps);
  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    id: 0,
    usuario: "admin",
    n_pes: "admin",
    nome: "admin",
    senha: "admin",
    plantao: "admin",
    local_operacional: "admin",
    local_eta: "admin",
    setor: "admin",
  });
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const controller = new AbortController();

  // 5 second timeout:
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  // fetch(url, {
  //   signal: controller.signal ,
  //   method: "POST",
  //   body: {
  //     usuario: userInfo.
  //   }
  // }).then((response) => {
  //   // completed request before timeout fired
  //   // If you only wanted to timeout the request, not the response, add:
  //   // clearTimeout(timeoutId)
  // });

  async function signIn(usuario: string, senha: string, toast: any) {
    setIsLoading(true);
    try {
      const response = await api.post("https://apiescalas.localsig.com/login", { usuario, senha });

      if (response.data) {
        const userData = response.data;

        // Armazena no estado
        setUserInfo(userData);
        setIsLogged(true);
        // setErrorMessage(null);

        // Armazena no localStorage
        localStorage.setItem("userSession", JSON.stringify(userData));

        // Redireciona o usuário após login
        Router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Credenciais inválidas")
      // setErrorMessage("Credenciais inválidas");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const storedSession = localStorage.getItem("userSession");
    
    if (storedSession) {
      const userData = JSON.parse(storedSession);
      setUserInfo(userData);
      setIsLogged(true);
    }
  }, []);

  async function requestSession() {
    // let win = window.open(
    //   'https://localsig.com/escalas/session.php',
    //   'session',
    //   'width=1,height=1,left=1,top=1,toolbar=no,status=no'
    // );
    // setTimeout(function () {
    //   win!.close();
    // }, 70);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isLogged,
        loggedUser,
        setIsLogged,
        errorMessage,
        setErrorMessage,
        userInfo,
        error,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
