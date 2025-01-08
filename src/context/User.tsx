import React, { createContext, ReactNode, useContext, useState } from "react";
import axios from "axios";

interface UserProviderProps {
  children: ReactNode;
}

type UsersType = {
  id: number;
  usuario: string;
  nome: string;
  unidade: string;
  admin: boolean;
};

interface UserContextProps {
  userInfo: UsersType | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function UserProvider({ children }: UserProviderProps) {
  const [userInfo, setUserInfo] = useState<UsersType | null>(null);

  const login = async (username: string, password: string) => {
    setUserInfo({ id: 1, usuario: "admin", nome: "Admin", unidade: "Admin", admin: true });

    // try {
    //   const response = await axios.post("https://localsig.com/api/login", { username, password });
    //   const { id, usuario, nome, unidade, admin } = response.data;
    //   setUserInfo({ id, usuario, nome, unidade, admin });
    // } catch (error) {
    //   console.error("Login failed", error);
    // }
  };

  const logout = () => {
    setUserInfo(null);
  };

  return (
    <UserContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  return context;
}
