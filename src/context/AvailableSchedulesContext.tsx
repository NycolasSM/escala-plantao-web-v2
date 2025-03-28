import React, { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

type SchedulesContextProps = {
  children: ReactNode;
};

type dayDataType = {
  day: number;
  rangeOfAvailableHours: string[] | string;
  holidayTitle: string;
};

interface ISchedulesAvailableContext {
  plantaoAvailable?: string[];
  plantaoChosen: string;
  localAvailable?: string[];
  localChosen: string;
  monthNumber: number;
  year: number;
  availableDays: Set<any>;
  availableDaysData: dayDataType[];
  availableEmployees: object[];
  employeesInVacation: object[];
  observationForm: string;
  setPlantaoAvailable: (newState: string[]) => void;
  setPlantaoChosen: (newState: string) => void;
  setLocalAvailable: (newState: string[]) => void;
  setLocalChosen: (newState: string) => void;
  setMonthNumber: (newState: number) => void;
  setAvailableDaysData: (newState: []) => void;
  setYear: (newState: number) => void;
  setObervationForm: (newState: string) => void;
}

//TODO os plantões disponiveis virão de outro context

//TODO refatorar para que o available days venha da mesma variavel array e não diferentes, aí o calendário faz o SET

const initilValue = {
  plantaoAvailable: ["Operacional", "ETA", "Transporte", "Manutenção", "Controle De Perdas"],
  plantaoChosen: "",
  localAvailable: ["São Lourenço"],
  localChosen: "",
  monthNumber: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  availableDays: new Set<any>(),
  availableDaysData: [],
  availableEmployees: [],
  employeesInVacation: [],
  observationForm: "",
  setPlantaoAvailable: () => {},
  setPlantaoChosen: () => {},
  setLocalAvailable: () => {},
  setLocalChosen: () => {},
  setMonthNumber: () => {},
  setAvailableDaysData: () => {},
  setObervationForm: () => {},
  setYear: () => {},
};

const AvailableSchedulesContext = createContext<any>(initilValue);

export function AvailableSchedulesProvider({ children }: SchedulesContextProps) {
  const [plantaoChosen, setPlantaoChosen] = useState(initilValue.plantaoChosen);
  const [plantaoAvailable, setPlantaoAvailable] = useState(initilValue.plantaoAvailable);

  const [localChosen, setLocalChosen] = useState(initilValue.localChosen);
  const [localAvailable, setLocalAvailable] = useState(initilValue.localAvailable);

  const [monthNumber, setMonthNumber] = useState(initilValue.monthNumber);
  const [year, setYear] = useState(initilValue.year);

  const [availableDays, setAvailableDays] = useState(initilValue.availableDays);
  const [availableDaysData, setAvailableDaysData] = useState<dayDataType[]>(initilValue.availableDaysData);

  const [availableEmployees, setAvailableEmployees] = useState(initilValue.availableEmployees);

  const [employeesInVacation, setEmployeesInVacation] = useState(initilValue.employeesInVacation);

  const [observationForm, setObervationForm] = useState<string>(initilValue.observationForm);

  const getAvailableDays = (daysObjects: object[]) => {
    let daysAvailable = new Set<number>();

    type DayObject = {
      day?: number;
      rangeOfAvailableHours?: string[];
    };

    if (daysObjects.length != 0) {
      daysObjects.map((object: DayObject) => {
        daysAvailable.add(object.day!);
      });
    }

    return daysAvailable;
  };

  const getAvailableSchedules = (plantao: string, local: string, monthNumber: number, year: number) => {
    // verificação da lista dos municipios disponíveis, caso não ele faz um fetch que ira voltar todos os funcionários

    // TODO REMOVENDO O FILTRO TEMPORARIAMENTE
    // if (
    //   [
    //     "São Lourenço",
    //     "Juquitiba",
    //     "Registro / Sete Barras",
    //     "Sete Barras",
    //   ].some((el) => local.includes(el)) === true
    // ) {
    //   let holidays: any[];

    //   if (plantao != "Transporte" && (plantao === "" || local === "")) {
    //     fetch(
    //       `https://apiescalas.localsig.com/schedulesAvailable/?year=${year}&month=${monthNumber}&plantao=sem plantao&local=${
    //         local ? local : ""
    //       }`
    //     )
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setAvailableDays(getAvailableDays(data.availableDays));
    //         setAvailableDaysData(data.availableDays);
    //         setAvailableEmployees(data.availableEmployees);
    //         setEmployeesInVacation(data.employeesInVacation);
    //       });
    //   }

    //   if (local === "Registro / Sete Barras") {
    //     fetch(
    //       `https://apiescalas.localsig.com/schedulesAvailable/?year=${year}&month=${monthNumber}&plantao=ETA&local=Registro`
    //     )
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setAvailableDays(getAvailableDays(data.availableDays));
    //         holidays = data.availableDays;

    //         setAvailableEmployees(data.availableEmployees);
    //         setEmployeesInVacation(data.employeesInVacation);
    //       })
    //       .then(() => {
    //         fetch(
    //           `https://apiescalas.localsig.com/schedulesAvailable/?year=${year}&month=${monthNumber}&plantao=ETA&local=Sete Barras`
    //         )
    //           .then((response) => response.json())
    //           .then((data) => {
    //             let holidaysJoin = holidays.concat(data.availableDays);

    //             const uniqueHolidays: any[] = [];

    //             const unique = holidaysJoin.filter((element) => {
    //               const isDuplicate = uniqueHolidays.includes(
    //                 element.holidayTitle
    //               );

    //               if (!isDuplicate) {
    //                 uniqueHolidays.push(element.holidayTitle);

    //                 return true;
    //               }

    //               return false;
    //             });

    //             setAvailableDays(getAvailableDays(unique));
    //             setAvailableDaysData(unique);
    //           });
    //       });
    //   }

    //   if (plantao === "Transporte" || (plantao != "" && local != "")) {
    //     fetch(
    //       `https://apiescalas.localsig.com/schedulesAvailable/?year=${year}&month=${monthNumber}&plantao=${plantao}&local=${
    //         local ? local : ""
    //       }`
    //     )
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setAvailableDays(getAvailableDays(data.availableDays));
    //         setAvailableDaysData(data.availableDays);
    //         setAvailableEmployees(data.availableEmployees);
    //         setEmployeesInVacation(data.employeesInVacation);
    //       });
    //   }
    // } else {
    let holidays: any[];

    const getCitiesHolidays = (city1: string, city2: string) => {
      fetch(`https://apiescalas.localsig.com/schedulesAvailable/?year=${year}&month=${monthNumber}&plantao=ETA&local=${city1}`)
        .then((response) => response.json())
        .then((data) => {
          setAvailableDays(getAvailableDays(data.availableDays));
          holidays = data.availableDays;

          setAvailableEmployees(data.availableEmployees);
          setEmployeesInVacation(data.employeesInVacation);
        })
        .then(() => {
          fetch(`https://apiescalas.localsig.com/schedulesAvailable/?year=${year}&month=${monthNumber}&plantao=ETA&local=${city2}`)
            .then((response) => response.json())
            .then((data) => {
              let holidaysJoin = holidays.concat(data.availableDays);

              const uniqueIds: any[] = [];

              const unique = holidaysJoin.filter((element) => {
                const isDuplicate = uniqueIds.includes(element.holidayTitle);

                if (!isDuplicate) {
                  uniqueIds.push(element.holidayTitle);

                  return true;
                }

                return false;
              });

              setAvailableDays(getAvailableDays(unique));
              setAvailableDaysData(unique);
            });
        });
    };

    if (local === "Cajati / Jacupiranga") {
      getCitiesHolidays("Cajati", "Jacupiranga");
    }

    if (local === "Registro / Sete Barras") {
      getCitiesHolidays("Registro", "Sete Barras");
    }

    if (local === "Iguape / Ilha Comprida") {
      getCitiesHolidays("Iguape", "Ilha Comprida");
    }

    if (local === "Ilha Comprida / Pedrinhas") {
      getCitiesHolidays("Ilha Comprida", "Pedrinhas");
    }

    if (local === "Ribeira / Itapirapuã Paulista") {
      getCitiesHolidays("Ribeira", "Itapirapuã Paulista");
    }

    if (local === "Ribeira / Itaoca") {
      getCitiesHolidays("Ribeira", "Itaoca");
    }

    if (localChosen || plantaoChosen === "Transporte" || plantaoChosen === "Controle De Perdas") {
      fetch(
        `https://apiescalas.localsig.com/schedulesAvailable/?year=${year}&month=${monthNumber}&plantao=sem plantao&local=${
          local ? local : ""
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          setAvailableDays(getAvailableDays(data.availableDays));
          setAvailableDaysData(data.availableDays);
          setAvailableEmployees(data.availableEmployees);
          setEmployeesInVacation(data.employeesInVacation);
        });
    }
  };

  const getAllFeriados = () => {
    let feriados = "";

    if (availableDaysData) {
      Array.from(availableDaysData).map((holidayData, i) => {
        if (i === 0) {
          feriados += `\n Feriados: \n ${holidayData.day} - ${holidayData.holidayTitle}`;
        } else {
          feriados += `\n ${holidayData.day} - ${holidayData.holidayTitle}`;
        }
      });
    }

    return feriados;
  };

  const containsFeriadoWord = (observacao: string) => {
    if (observacao.includes("Feriado")) {
      return true;
    }

    if (observacao.includes("Feriados")) {
      return true;
    }

    if (observacao.includes("Feriados:")) {
      return true;
    }

    if (observacao.includes("Feriado")) {
      return true;
    }

    if (observacao.includes("Feriado:")) {
      return true;
    }

    if (observacao.includes("feriado")) {
      return true;
    }

    if (observacao.includes("feriado:")) {
      return true;
    }

    if (observacao.includes("feriados")) {
      return true;
    }

    if (observacao.includes("feriados:")) {
      return true;
    }

    return false;
  };

  const getObservetions = (plantaoChosen: string, localChosen: string, monthNumber: number, year: number) => {
    if (localChosen) {
      fetch(`https://apiescalas.localsig.com/observation?setor=${plantaoChosen} - ${localChosen}&year=${year}&month=${monthNumber}`)
        .then((response) => response.json())
        .then((data) => {
          // verificar se existe obercação de feriado, se não adicionar na observação

          // console.log(data[0]?.observacao);
          if (!containsFeriadoWord(data[0]?.observacao)) {
            setObervationForm(data[0]?.observacao + `${getAllFeriados()}`);
          } else {
            setObervationForm(data[0]?.observacao);
          }
        })
        .catch((e) => {
          setObervationForm("");
          console.log(e);
        });
    }
  };

  useEffect(() => {
    getAvailableSchedules(plantaoChosen, localChosen, monthNumber, year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantaoChosen, localChosen, monthNumber, year]);

  useEffect(() => {
    getObservetions(plantaoChosen, localChosen, monthNumber, year);
  }, [getAvailableSchedules]);

  return (
    <AvailableSchedulesContext.Provider
      value={{
        plantaoChosen,
        plantaoAvailable,
        localChosen,
        localAvailable,
        monthNumber,
        year,
        availableEmployees,
        availableDays,
        availableDaysData,
        employeesInVacation,
        observationForm,
        setObervationForm,
        setPlantaoChosen,
        setPlantaoAvailable,
        setLocalChosen,
        setLocalAvailable,
        setMonthNumber,
        setAvailableDaysData,
        setYear,
      }}
    >
      {children}
    </AvailableSchedulesContext.Provider>
  );
}

export function useAvailableSchedulesContext() {
  const availableSchedule = useContext(AvailableSchedulesContext);

  return availableSchedule;
}

export default AvailableSchedulesContext;
