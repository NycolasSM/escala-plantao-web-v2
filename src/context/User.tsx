import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
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
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function UserProvider({ children }: UserProviderProps) {
  const [userInfo, setUserInfo] = useState<UsersType | null>(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    if (username === "admin" && password === "admin") {
      const user = { id: 1, usuario: "admin", nome: "Admin", unidade: "Admin", admin: true };
      setUserInfo(user);
      localStorage.setItem("userInfo", JSON.stringify(user));
      return true;
    } else {
      alert("Invalid username or password");
      return false;
    }
    // try {
    //   const response = await axios.post("https://localsig.com/api/login", { username, password });
    //   const { id, usuario, nome, unidade, admin } = response.data;
    //   const user = { id, usuario, nome, unidade, admin };
    //   setUserInfo(user);
    //   localStorage.setItem("userInfo", JSON.stringify(user));
    //   return true;
    // } catch (error) {
    //   console.error("Login failed", error);
    //   alert("Invalid username or password");
    //   return false;
    // }
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem("userInfo");
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
