// @ts-nocheck

import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type AuthContextType = {
  signIn: (code: string, password: string) => Promise<void>;
  signOut: () => void;
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

  async function signIn(usuario: string, senha: string, toast: any) {
    setIsLoading(true);
    try {
      const response = await api.post("https://apiescalas.localsig.com/login", { usuario, senha });

      if (response.data) {
        const userData = response.data;

        // Armazena no estado
        setUserInfo(userData);
        setIsLogged(true);

        // Armazena no localStorage
        localStorage.setItem("userSession", JSON.stringify(userData));

        // Redireciona o usuário após login
        Router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Credenciais inválidas");
    } finally {
      setIsLoading(false);
    }
  }

  function signOut() {
    // Remove a sessão armazenada
    localStorage.removeItem("userSession");
    
    // Reseta os estados do usuário
    setUserInfo({} as UserInfoProps);
    setIsLogged(false);
    setLoggedUser({} as User);
    setErrorMessage(null);
    setError(null);
    
    // Redireciona para a página de login
    Router.push("/login");
  }

  useEffect(() => {
    const storedSession = localStorage.getItem("userSession");

    if (storedSession) {
      const userData = JSON.parse(storedSession);
      setUserInfo(userData);
      setIsLogged(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
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
