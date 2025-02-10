import React, { useState, useEffect, useContext, useRef } from "react";

import { Container, SelectDays, ButtonsContainer } from "./styles";

import { EmployeeInputContainer } from "../EmployeeInput/styles";

import EmployeeInput from "../EmployeeInput/index.jsx";

import { BiLockOpenAlt } from "react-icons/bi";

import FormContext from "../../../../context/formContext";
import AvailableSchedulesContext from "../../../../context/availableSchedulesContext";

import Select from "react-select/async";

import ChangeDefaultHoursModal from "../../../Modal/EditScheduleHour";
import HaveScheduleHoursChanges from "../../../Modal/HaveScheduleHoursChanges";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaTrashAlt, FaTrashRestoreAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type LoadData = {
  idLoaded: string;
  dayLoaded: number;
  employeesLoaded: string[];
  scheduleHourLoaded: string[];
};

type Props = {
  index: number;
  action: string;
  day: number;
  defaultValues?: LoadData;
  removeRegisterOfRemoveList: any;
  removeRegisterSaved: any;
  removeRegister: any;
  id: any;
};

const Register = ({
  index,
  action = "create",
  defaultValues = {
    idLoaded: "",
    dayLoaded: 1,
    employeesLoaded: [],
    scheduleHourLoaded: ["00:00", "00:00", "00:00", "24:00"],
  },
  day,
  removeRegisterOfRemoveList,
  removeRegisterSaved,
  removeRegister,
  id,
}: Props) => {
  const {
    registers,
    setRegisters,
    updateRegisterHours,
    formularioDelete,
    formulario,
    setChangesSchedulesHourObservation,
    setHaveSchedulesHourChanged,
    changesSchedulesHourObservation,
    haveSchedulesHourChanged,
  } = useContext(FormContext);

  console.log("index", index);

  const { monthNumber, year, plantaoChosen, localChosen } = useContext(AvailableSchedulesContext);

  const [diferenca, setDiferenca] = useState<string>();
  const [totalHoras, setTotalHoras] = useState<number>(0);
  const [isFullTime, setIsFulltime] = useState<boolean>(false);

  const [isLockedScheduleHours, setIsLockedScheduleHours] = useState<boolean>(false);

  const [allDays, setAllDays] = useState<any[]>([]);

  const [daySelected, setDaySelected] = useState<number>(action === "edit" ? day : 1);

  const [rangeOfScheduleSelected, setRangeOfScheduleSelected] = useState(defaultValues.scheduleHourLoaded);

  function parse(horario: string) {
    if (!horario) return 0;

    let [hora, minuto] = horario.split(":").map((v) => parseInt(v));
    if (!minuto) {
      // para o caso de não ter os minutos
      minuto = 0;
    }
    return minuto + hora * 60;
  }

  // os valores de horarios estão considerando que só havera escalas em 30 em 30 minutos assim os valores salvando como numeros fica como por exemplo (8) para 8:30 e (8.5) para 8:30
  // rangeOfAvailableHours é um array de 4 posições a primeira é o horario de entrada, a segunda é o inicio do intervalo, o terceiro é o fim do intervalo e o quarto é o horário de saída

  function converterParaHorasMinuto(horario: number) {
    let horatioToString = (horario / 60).toString();

    let [hora, minuto] = horatioToString.split(".").map((v) => parseInt(v));

    if (minuto === 5) {
      setTotalHoras(hora + 0.5);
    } else {
      setTotalHoras(hora);
    }

    if (minuto === 5) {
      minuto = 30;
    } else {
      minuto = 0;
    }

    setDiferenca(`${hora}h:${minuto}m`);
  }

  function calculoDaJornadaComIntervalo(entrada1: string, saida1: string, entrada2: string, saida2: string) {
    return parse(saida1) - parse(entrada1) + (parse(saida2) - parse(entrada2));
  }

  useEffect(() => {
    let jornadaDoFuncionario = calculoDaJornadaComIntervalo(
      rangeOfScheduleSelected && rangeOfScheduleSelected[0],
      rangeOfScheduleSelected && rangeOfScheduleSelected[1],
      rangeOfScheduleSelected && rangeOfScheduleSelected[2],
      rangeOfScheduleSelected && rangeOfScheduleSelected[3]
    );
    updateScheduleRegister(rangeOfScheduleSelected);
    converterParaHorasMinuto(jornadaDoFuncionario);
  }, [rangeOfScheduleSelected, daySelected]);

  let totalOfDays = new Date(year, monthNumber, 0).getDate();

  // para setar o total de dias do mês nos
  useEffect(() => {
    setAllDays(Array.from({ length: totalOfDays }, (v, k) => k + 1));
  }, [monthNumber, year]);

  const [AvaibleScheduleHours, setAvaibleScheduleHours] = useState([
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ]);

  const updateScheduleRegister = (schedule: string[]) => {
    const currentRegisters = registers;

    currentRegisters.set(index.toString(), {
      ...registers.get(index.toString())!,
      scheduleHour: schedule,
      day: daySelected,
    });

    setRegisters(currentRegisters);
  };

  const handleUpdateScheduleHour = async (arrayIndex: number, value: string, fullSchedule?: string[]) => {
    if (fullSchedule) {
      setRangeOfScheduleSelected(fullSchedule);

      updateScheduleRegister(fullSchedule);

      return true;
    }

    const newRange = rangeOfScheduleSelected ? [...rangeOfScheduleSelected] : [];

    newRange[arrayIndex] = value;

    if (arrayIndex === 1) {
      if (value === "00:00") {
        newRange[2] = "00:00";
      }

      if (value != "00:00") {
        const hourInt = parseInt(value.split(":")[0]);
        const minutesInt = parseInt(value.split(":")[1]);

        let hourPlusOneInt = parseInt(value.split(":")[0]) + 1;
        let minutesPlus = "";

        if (minutesInt === 0) {
          minutesPlus = "30";
        } else {
          hourPlusOneInt++;
          minutesPlus = "00";
        }

        if (hourInt < 24) {
          if (hourPlusOneInt < 10) {
            newRange[2] = `0${hourPlusOneInt}:${minutesPlus}`;
          } else {
            newRange[2] = `${hourPlusOneInt}:${minutesPlus}`;
          }
        } else {
          if (hourPlusOneInt < 10) {
            newRange[2] = `0${hourInt}:${minutesPlus}`;
          } else {
            newRange[2] = `${hourInt}:${minutesPlus}`;
          }
        }
      }
    }

    if (arrayIndex === 2) {
      if (value === "00:00") {
        newRange[1] = "00:00";
      }
    }

    setRangeOfScheduleSelected(newRange);

    updateScheduleRegister(newRange);

    // updateRegisterHours(index.toString(), newRange);

    return true;
  };

  // TODO TRAVA DE ESCALA

  const endHourRef = useRef<HTMLSelectElement>(null);

  const setDefaultScheduleOptions = () => {
    endHourRef!.current!.value = "24:00";
    handleUpdateScheduleHour(0, "0", ["00:00", "00:00", "00:00", "24:00"]);
    setTotalHoras(24);
    setIsLockedScheduleHours(false);
  };

  useEffect(() => {
    setRegisters(
      (map: any) =>
        new Map(
          map.set(index.toString(), {
            ...registers.get(index.toString()),
            day: daySelected,
          })
        )
    );

    if (action === "create") {
      if (getDayOfTheWeek(daySelected) === "SAB") {
        if (plantaoChosen === "Operacional") {
          switch (localChosen) {
            case "Juquitiba":
            case "Jacupiranga":
            case "Cajati":
            case "Eldorado":
            case "Barra do Turvo":
            case "Iporanga":
            case "Juquiá":
            case "Miracatu":
            case "Pedro de Toledo":
            case "Itariri":
            case "Tapiraí":
            case "Apiaí":
              endHourRef!.current!.value = "17:30";
              handleUpdateScheduleHour(0, "0", ["08:00", "12:00", "13:30", "17:30"]);
              setTotalHoras(8);
              setIsLockedScheduleHours(true);
              break;
            case "Iguape":
            case "Cananéia":
            case "Pariquera-Açu":
            case "Ilha Comprida":
              endHourRef!.current!.value = "22:00";
              handleUpdateScheduleHour(0, "0", ["17:30", "00:00", "00:00", "22:00"]);
              setTotalHoras(6.5);
              setIsLockedScheduleHours(true);
              break;
          }
        }
        if (plantaoChosen === "ETA") {
          switch (localChosen) {
            case "Registro":
              endHourRef!.current!.value = "24:00";
              handleUpdateScheduleHour(0, "0", ["00:00", "00:00", "00:00", "24:00"]);
              setTotalHoras(24);
              setIsLockedScheduleHours(true);
              break;
            case "Sete Barras":
            case "Juquitiba":
            case "Iguape / Ilha Comprida":
              endHourRef!.current!.value = "24:00";
              handleUpdateScheduleHour(0, "0", ["17:30", "00:00", "00:00", "24:00"]);
              setTotalHoras(6.5);
              setIsLockedScheduleHours(true);
              break;
            case "São Lourenço da Serra":
              endHourRef!.current!.value = "24:00";
              handleUpdateScheduleHour(0, "0", ["17:00", "00:00", "00:00", "24:00"]);
              setTotalHoras(7);
              setIsLockedScheduleHours(true);
              break;
            case "Cananéia":
            case "Pariquera-Açu":
            case "Pedro de Toledo":
            case "Itariri":
            case "Tapiraí":
            case "Apiaí":
            case "Barra do Chapéu":
            case "Itaóca":
            case "Itapirapuã Paulista":
            case "Itaoca":
            case "Ribeira / Itapirapuã Paulista":
            case "Ribeira / Itaoca":
              endHourRef!.current!.value = "17:30";
              handleUpdateScheduleHour(0, "0", ["08:00", "12:00", "13:30", "17:30"]);
              setTotalHoras(8);
              setIsLockedScheduleHours(true);
              break;
          }
        }
        if (plantaoChosen === "Manutenção") {
          switch (localChosen) {
            // case "Apiaí":
            //   endHourRef!.current!.value = "22:00";
            //   handleUpdateScheduleHour(0, "0", ["08:00", "00:00", "00:00", "22:00"]);
            //   setTotalHoras(14);
            //   setIsLockedScheduleHours(true);
            //   break;
            default:
              setDefaultScheduleOptions();
              break;
          }
        }
      } else if (getDayOfTheWeek(daySelected) === "DOM") {
        if (plantaoChosen === "Transporte") {
          endHourRef!.current!.value = "17:30";
          handleUpdateScheduleHour(0, "0", ["08:00", "12:00", "13:30", "17:30"]);
          setTotalHoras(8);
          setIsLockedScheduleHours(true);
        }
        if (plantaoChosen === "Operacional") {
          switch (localChosen) {
            case "Registro / Sete Barras":
            case "São Lourenço":
            case "Juquitiba":
            case "Jacupiranga":
            case "Cajati":
            case "Barra do Turvo":
            case "Eldorado":
            case "Barra do Turvo":
            case "Iporanga":
            case "Juquiá":
            case "Miracatu":
            case "Pedro de Toledo":
            case "Itariri":
            case "Tapiraí":
            case "Apiaí":
              endHourRef!.current!.value = "17:30";
              handleUpdateScheduleHour(0, "0", ["08:00", "12:00", "13:30", "17:30"]);
              setTotalHoras(8);
              setIsLockedScheduleHours(true);
              break;
            case "Iguape":
            case "Cananéia":
            case "Pariquera-Açu":
            case "Ilha Comprida":
              endHourRef!.current!.value = "22:00";
              handleUpdateScheduleHour(0, "0", ["08:00", "00:00", "00:00", "22:00"]);
              setTotalHoras(14);
              setIsLockedScheduleHours(true);
              break;
            default:
              setDefaultScheduleOptions();
          }
        }
        if (plantaoChosen === "ETA") {
          switch (localChosen) {
            case "Registro / Sete Barras":
            case "Sete Barras":
            case "Registro":
            case "Juquitiba":
            case "Jacupiranga":
            case "Cajati":
            case "Eldorado":
            case "Iporanga":
            case "Juquiá":
            case "Miracatu":
            case "Pedro de Toledo":
            case "Itariri":
            case "Tapiraí":
            case "Apiaí":
            case "Barra do Chapéu":
            case "Itaóca":
            case "Ribeira":
            case "Itapirapuã Paulista":
            case "Itaoca":
            case "Ribeira / Itapirapuã Paulista":
            case "Ribeira / Itaoca":
              endHourRef!.current!.value = "17:30";
              handleUpdateScheduleHour(0, "0", ["08:00", "12:00", "13:30", "17:30"]);
              setTotalHoras(8);
              setIsLockedScheduleHours(true);
              break;
            case "Cananéia":
            case "Pariquera-Açu":
            case "Iguape / Ilha Comprida":
            case "Iguape / Pedrinhas":
              endHourRef!.current!.value = "24:00";
              handleUpdateScheduleHour(0, "0", ["08:00", "00:00", "00:00", "24:00"]);
              setTotalHoras(16);
              setIsLockedScheduleHours(true);
              break;
            default:
              setDefaultScheduleOptions();
          }
        }
        if (plantaoChosen === "Manutenção") {
          switch (localChosen) {
            // case "Apiaí":
            //   endHourRef!.current!.value = "22:00";
            //   handleUpdateScheduleHour(0, "0", ["08:00", "00:00", "00:00", "22:00"]);
            //   setTotalHoras(14);
            //   setIsLockedScheduleHours(true);
            //   break;
            default:
              setDefaultScheduleOptions();
              break;
          }
        }
      } else if (getDayOfTheWeek(daySelected) === "SEX") {
        if (plantaoChosen === "ETA") {
          switch (localChosen) {
            case "Registro":
              endHourRef!.current!.value = "24:00";
              handleUpdateScheduleHour(0, "0", ["16:30", "00:00", "00:00", "24:00"]);
              setTotalHoras(7.5);
              setIsLockedScheduleHours(true);
              break;
            case "Juquitiba":
              endHourRef!.current!.value = "24:00";
              handleUpdateScheduleHour(0, "0", ["17:30", "00:00", "00:00", "24:00"]);
              setTotalHoras(6.5);
              setIsLockedScheduleHours(true);
              break;
            default:
              setDefaultScheduleOptions();
          }
        }
      } else if (getDayOfTheWeek(daySelected) === "SEG") {
        if (plantaoChosen === "ETA") {
          switch (localChosen) {
            case "Sete Barras":
            case "Juquitiba":
              endHourRef!.current!.value = "06:00";
              handleUpdateScheduleHour(0, "0", ["00:00", "00:00", "00:00", "06:00"]);
              setTotalHoras(6);
              setIsLockedScheduleHours(true);
              break;
            case "São Lourenço da Serra":
              endHourRef!.current!.value = "08:00";
              handleUpdateScheduleHour(0, "0", ["00:00", "00:00", "00:00", "08:00"]);
              setTotalHoras(8);
              setIsLockedScheduleHours(true);
              break;
            case "Registro":
              endHourRef!.current!.value = "07:00";
              handleUpdateScheduleHour(0, "0", ["00:00", "00:00", "00:00", "07:00"]);
              setTotalHoras(7);
              setIsLockedScheduleHours(true);
              break;
            default:
              setDefaultScheduleOptions();
          }
        }
      } else {
        setDefaultScheduleOptions();
      }
    }
  }, [daySelected]);

  const handleSetFullTime = () => {
    setTotalHoras(24);

    handleUpdateScheduleHour(0, "00:00");
    handleUpdateScheduleHour(1, "00:00");
    handleUpdateScheduleHour(2, "00:00");
    handleUpdateScheduleHour(3, "24:00");

    // rangeOfScheduleSelected[0] = '00:00';
    // rangeOfScheduleSelected[1] = '00:00';
    // rangeOfScheduleSelected[2] = '00:00';
    // rangeOfScheduleSelected[3] = '24:00';
  };

  function getDayOfTheWeek(day: number) {
    let newDate = new Date(year, monthNumber - 1, day);
    if (newDate.getDay() == 0) {
      return "DOM";
    }
    if (newDate.getDay() == 1) {
      return "SEG";
    }
    if (newDate.getDay() == 2) {
      return "TER";
    }
    if (newDate.getDay() == 3) {
      return "QUA";
    }
    if (newDate.getDay() == 4) {
      return "QUI";
    }
    if (newDate.getDay() == 5) {
      return "SEX";
    }
    if (newDate.getDay() == 6) {
      return "SAB";
    }
  }

  const updateLockedSchedule = (schedule: string[]) => {
    handleUpdateScheduleHour(0, schedule[0])
      .then(() => {
        handleUpdateScheduleHour(1, schedule[1]);
      })
      .then(() => {
        handleUpdateScheduleHour(2, schedule[2]);
      })
      .then(() => {
        handleUpdateScheduleHour(3, schedule[3]);
      });
  };

  const unlockRegister = (key: string) => {
    // setRangeOfScheduleSelected(defaultValues.scheduleHourLoaded);

    setIsLockedScheduleHours(false);

    // handleUpdateScheduleHour(0, '00:00');
    // handleUpdateScheduleHour(1, '00:00');
    // handleUpdateScheduleHour(2, '00:00');
    // handleUpdateScheduleHour(3, '24:00');

    // rangeOfScheduleSelected[0] = '00:00';
    // rangeOfScheduleSelected[1] = '00:00';
    // rangeOfScheduleSelected[2] = '00:00';
    // rangeOfScheduleSelected[3] = '24:00';
  };

  const [scheduleRegisterInfo, setScheduleRegisterInfo] = useState<any>({
    registerInfo: {},
  });

  return (
    <>
      {/* {Object.keys(scheduleRegisterInfo.registerInfo).length != 0 ? (
        <ChangeDefaultHoursModal
          registerInfo={scheduleRegisterInfo.registerInfo}
          setHaveSchedulesHourChanged={setHaveSchedulesHourChanged}
          setIsLockedScheduleHours={setIsLockedScheduleHours}
          closeModal={() =>
            setScheduleRegisterInfo({
              registerInfo: {},
            })
          }
        />
      ) : null} */}
      <Container className={`${formularioDelete.get(index.toString()) ? "delete" : action === "edit" ? "edit" : "create"}`}>
        <td>
          <SelectDays
            defaultValue=''
            name=''
            id=''
            onChange={(e: any) => {
              setDaySelected(JSON.parse(e.target.value));
            }}
          >
            {action === "edit" ? (
              <option key={defaultValues?.dayLoaded} value={defaultValues?.dayLoaded}>
                {defaultValues?.dayLoaded} - {getDayOfTheWeek(defaultValues?.dayLoaded)}
              </option>
            ) : (
              <option value='' disabled selected>
                Dia &nbsp;
              </option>
            )}
            {allDays.map((day) => (
              <option key={day} value={day}>
                {day} - {getDayOfTheWeek(day)}
              </option>
            ))}
          </SelectDays>
        </td>
        <td>
          {daySelected != undefined ? (
            <EmployeeInput index={index} />
          ) : (
            <EmployeeInputContainer>
              <Select placeholder='Selecione o Dia' isDisabled />
            </EmployeeInputContainer>
          )}
        </td>
        {daySelected != undefined ? (
          <>
            <td style={{ padding: 0, margin: 0 }}>
              <input
                className='checkbox'
                type='checkbox'
                onChange={() => setIsFulltime(!isFullTime)}
                onClick={() => {
                  handleSetFullTime();
                  setIsFulltime(!isFullTime);
                }}
              />
            </td>

            {isFullTime ? (
              <td colSpan={4}>
                <span style={{ textAlign: "center" }}>FullTime</span>
              </td>
            ) : (
              <>
                <td>
                  <select
                    name='startHour'
                    id='startHour'
                    defaultValue={rangeOfScheduleSelected && rangeOfScheduleSelected[0]}
                    value={rangeOfScheduleSelected && rangeOfScheduleSelected[0]}
                    disabled={isLockedScheduleHours}
                    onChange={(e) => {
                      handleUpdateScheduleHour(0, e.target.value);
                    }}
                  >
                    <>
                      {AvaibleScheduleHours.map((hour) => (
                        <>
                          {parseFloat(hour) < parseFloat(rangeOfScheduleSelected && rangeOfScheduleSelected[3]) ? (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                          ) : null}
                        </>
                      ))}
                    </>
                  </select>
                </td>
                <td>
                  <select
                    name='startBreakHour'
                    id='startBreakHour'
                    defaultValue={rangeOfScheduleSelected && rangeOfScheduleSelected[1]}
                    value={rangeOfScheduleSelected && rangeOfScheduleSelected[1]}
                    disabled={isLockedScheduleHours}
                    onChange={(e) => {
                      e.target.value === "00:00" ? handleUpdateScheduleHour(1, "00:00") : null;
                      handleUpdateScheduleHour(1, e.target.value);
                    }}
                  >
                    <option value={"00:00"}>Sem Intervalo</option>
                    {AvaibleScheduleHours.map((hour) => (
                      <>
                        {parseFloat(hour) > parseFloat(rangeOfScheduleSelected && rangeOfScheduleSelected[0]) ? (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ) : null}
                      </>
                    ))}
                    <option value={"24:00"}>23:59</option>
                  </select>
                </td>

                {rangeOfScheduleSelected && rangeOfScheduleSelected[1] != "00:00" ? (
                  <td>
                    <select
                      name='endBreakHour'
                      id='endBreakHour'
                      defaultValue={rangeOfScheduleSelected[2]}
                      value={rangeOfScheduleSelected[2]}
                      disabled={isLockedScheduleHours}
                      onChange={(e) => handleUpdateScheduleHour(2, e.target.value)}
                    >
                      <option value={"00:00"}>Sem Intervalo</option>
                      {AvaibleScheduleHours.map((hour) => (
                        <>
                          {parseFloat(hour) > parseFloat(rangeOfScheduleSelected && rangeOfScheduleSelected[1]) &&
                          parseFloat(hour) > parseFloat(rangeOfScheduleSelected && rangeOfScheduleSelected[0]) ? (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                          ) : null}
                        </>
                      ))}
                      <option value={"24:00"}>23:59</option>
                    </select>
                  </td>
                ) : (
                  <td>
                    <select
                      disabled
                      name='endBreakHour'
                      id='endBreakHour'
                      defaultValue={"00:00"}
                      value={rangeOfScheduleSelected && rangeOfScheduleSelected[2]}
                    >
                      <option value={"00:00"}>Sem Intervalo</option>
                    </select>
                  </td>
                )}
                <td>
                  <select
                    name='endHour'
                    id='endHour'
                    ref={endHourRef}
                    defaultValue={rangeOfScheduleSelected && rangeOfScheduleSelected[3]}
                    disabled={isLockedScheduleHours}
                    onChange={(e) => handleUpdateScheduleHour(3, e.target.value)}
                  >
                    <option value={"00:00"} disabled>
                      Sem Horário
                    </option>
                    {AvaibleScheduleHours.map((hour) => (
                      <>
                        {parseFloat(hour) > parseFloat(rangeOfScheduleSelected && rangeOfScheduleSelected[2]) &&
                        parseFloat(hour) > parseFloat(rangeOfScheduleSelected && rangeOfScheduleSelected[1]) &&
                        parseFloat(hour) > parseFloat(rangeOfScheduleSelected && rangeOfScheduleSelected[0]) ? (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ) : null}
                      </>
                    ))}
                    <option value={"24:00"}>23:59</option>
                  </select>
                </td>
                {isLockedScheduleHours ? (
                  <td>
                    <button
                      className='register__button--unlock'
                      onClick={() =>
                        setScheduleRegisterInfo({
                          registerInfo: {
                            teste: "teste",
                          },
                        })
                      }
                    >
                      <BiLockOpenAlt size={24} />
                    </button>
                  </td>
                ) : null}
              </>
            )}
          </>
        ) : (
          <>
            <td className='checkbox'>
              <input type='checkbox' onChange={() => setIsFulltime(!isFullTime)} disabled />
            </td>

            <td>
              <select disabled>
                <option value='' disabled selected>
                  Hora
                </option>
              </select>
            </td>

            <td>
              <select disabled>
                <option value='' disabled selected>
                  Hora
                </option>
              </select>
            </td>

            <td>
              <select disabled>
                <option value='' disabled selected>
                  Hora
                </option>
              </select>
            </td>

            <td>
              <select disabled>
                <option value='' disabled selected>
                  Hora
                </option>
              </select>
            </td>
          </>
        )}

        <td className='text-center'>
          <span>
            {rangeOfScheduleSelected && rangeOfScheduleSelected[3] != "00:00" ? diferenca : isFullTime ? <span>24hrs</span> : null}
          </span>
        </td>
        <td>
          {action === "edit" ? (
            <ButtonsContainer>
              <>
                {formularioDelete.get(index.toString()) ? (
                  <button className='register__button--restore' onClick={() => removeRegisterOfRemoveList(index.toString(), id)}>
                    <FaTrashRestoreAlt size={14} color={"white"} />
                  </button>
                ) : (
                  <button className='register__button--delete' onClick={() => removeRegisterSaved(index.toString(), id)}>
                    <FaTrashAlt size={16} color={"white"} />
                  </button>
                )}
              </>
            </ButtonsContainer>
          ) : (
            <>
              {registers.size === index + 1 ? (
                <ButtonsContainer>
                  <button className='register__button--cancel' onClick={() => removeRegister(index.toString())}>
                    <IoClose color='white' size={40} />
                  </button>
                </ButtonsContainer>
              ) : (
                <>
                  {/* <ButtonsContainer>
                  <button className='register__button--cancel' onClick={() => removeRegister(index.toString())}>
                    <IoClose color='white' size={40} />
                  </button>
                </ButtonsContainer> */}
                </>
              )}
            </>
          )}
        </td>
      </Container>
    </>
  );
};

export default Register;
