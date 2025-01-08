import { api } from "@/services/api";
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

import { UserContext } from "./User";
import { RegistersContext, RegistersType } from "./Registers";

interface FiltersProviderProps {
  children: ReactNode;
}

interface FiltersContextProps {
  setFilter: (type: "municipio" | "data", value: FilterSetType | DateFilterSetType | null) => void;

  municipioFilter: FilterSetType | null;
  dataFilter: Date | null;

  filterByDate: (value: Date | null) => void;
  filterByMunicipio: (value: RegistersType | any) => void;
}

export type FilterSetType = {
  label: string;
  value: string;
};

export type DateFilterSetType = {
  label: string;
  value: Date;
};

export const FiltersContext = createContext<FiltersContextProps>({} as FiltersContextProps);

export function FiltersProvider({ children }: FiltersProviderProps) {
  const { userInfo } = useContext(UserContext);
  const { allRegisters } = useContext(RegistersContext);

  const [municipioFilter, setMunicipioFilter] = useState<FilterSetType | null>(null);

  const [dataFilter, setDataFilter] = useState<Date | null>(new Date());

  const filterByDate = (register: RegistersType | any) => {
    const [year, month, day] = register.data.split(" ")[0].split("-");
    const registerDate = `${day}/${month}/${year}`;

    return registerDate === dataFilter?.toLocaleString();
  };

  const filterByMunicipio = (register: RegistersType | any) => {
    if (!municipioFilter) {
      return register;
    }

    return register.endereco.includes(municipioFilter.value);
  };

  const handleSetMunicipioFilter = useCallback((filter: FilterSetType | null) => {
    setMunicipioFilter(filter);
  }, []);

  const handleSetDataFilter = useCallback((filter: Date) => {
    setDataFilter(filter);
  }, []);

  const setFilter = (type: "municipio" | "data", value: any) => {
    const setFilterOn = {
      municipio: handleSetMunicipioFilter,
      data: handleSetDataFilter,
    };

    setFilterOn[type](value);
  };

  return (
    <FiltersContext.Provider
      value={{
        setFilter,
        municipioFilter,
        dataFilter,
        filterByDate,
        filterByMunicipio,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export function useRegistersContext() {
  const context = useContext(FiltersContext);

  return context;
}
