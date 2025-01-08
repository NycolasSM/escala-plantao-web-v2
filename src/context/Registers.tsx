import { api } from "@/services/api";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type RegistersType = {
  index: number;
};

interface RegistersProviderProps {
  children: ReactNode;
}

interface RegistersContextProps {
  allRegisters: RegistersType[];
  loadRegisters: () => Promise<void>;
}

export const RegistersContext = createContext<RegistersContextProps>({} as RegistersContextProps);

export function RegistersProvider({ children }: RegistersProviderProps) {
  const [allRegisters, setAllRegisters] = useState<RegistersType[]>([]);

  const loadRegisters = async () => {
    await api
      .get('/teste')
      .then((resp) => {
        setAllRegisters(resp.data);
      })
      .catch((err) => {
        console.log(err, "");
      });
  };

  useEffect(() => {
    loadRegisters();
  }, []);

  return (
    <RegistersContext.Provider
      value={{
        loadRegisters,
        allRegisters,
      }}
    >
      {children}
    </RegistersContext.Provider>
  );
}

export function useRegistersContext() {
  const context = useContext(RegistersContext);

  return context;
}
