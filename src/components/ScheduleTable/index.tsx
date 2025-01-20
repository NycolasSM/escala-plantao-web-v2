import React, { useContext, useEffect, useState } from "react";
import { Container, Table, ButtonContainer, Button, EmptyRegistersMessage } from "./styles";
import { RiDeleteBin7Line } from "react-icons/ri";
import Select from "react-select";
import { useSchedules } from "@/context/ScheduleContext";
import { useAvailableSchedulesContext } from "@/context/AvailableSchedulesContext";
import { AiOutlineInfoCircle } from "react-icons/ai";
import FormContext from "@/context/formContext";
import { useRouter } from "next/router";
import { api } from "@/services/api";
import { getDayOfTheWeek } from "@/utils/days";

type RegistersLoaded = {
  data: string;
  escala_participante: string;
  funcionario: string;
  horario: string;
  id: string;
  n_pes_funcionario: string;
  n_pes_responsavel: string;
  responsavel: string;
  total_horas: string;
  endereco: string;
  telefone_1: string;
  telefone_2: string;
};

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    minHeight: "29px",
    height: "29px",
    fontSize: "12px",
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),
  input: (provided: any) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (provided: any) => ({
    display: "none",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: "30px",
  }),
  option: (provided: any) => ({
    ...provided,
    fontSize: "12px",
    padding: "8px 10px",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100px",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100px",
  }),
};

const customSelectStyleWithoutIcon = {
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: "30px",
    padding: 0,
    margin: 0,
    display: "none",
  }),
};

const ScheduleTable = () => {
  const { schedules, addSchedules } = useSchedules();

  const [newSchedules, setNewSchedules] = useState<
    {
      id: number;
      day: string;
      name: string;
      hours24: boolean;
      start: string;
      from: string;
      to: string;
      end: string;
      totalHours: string;
      isNew: boolean;
    }[]
  >([]);

  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  const { localChosen, plantaoChosen, setLocalChosen, setPlantaoChosen, year, monthNumber, observationForm, setObervationForm } =
    useAvailableSchedulesContext();

  const {
    haveEmptyField,
    registers,
    isEmpty,
    setIsEmpty,
    sendForm,
    isSendingForm,
    setRegisters,
    formularioDelete,
    setFormularioDelete,
    setLoadedForms,
    isLoadingRegisters,
    setIsLoadingRegisters,
    haveSchedulesHourChanged,
    setHaveSchedulesHourChanged,
    verifyEmptyFields,
    setIsSendingForm,
    setHaveEmptyField,
  } = useContext(FormContext);

  const [allDays, setAllDays] = useState<any[]>([]);

  // para setar o total de dias do mês nos
  let totalOfDays = new Date(year, monthNumber, 0).getDate();
  useEffect(() => {
    setAllDays(Array.from({ length: totalOfDays }, (v, k) => k + 1));
  }, [monthNumber, year]);

  const nameOptions = [
    { value: "ALEXANDRE RIBEIRO", label: "ALEXANDRE RIBEIRO" },
    { value: "JOÃO SILVA", label: "JOÃO SILVA" },
    { value: "CARLOS PEREIRA", label: "CARLOS PEREIRA" },
    { value: "ANA COSTA", label: "ANA COSTA" },
  ];

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = String(Math.floor(i / 2)).padStart(2, "0");
    const minutes = i % 2 === 0 ? "00" : "30";
    return { value: `${hour}:${minutes}`, label: `${hour}:${minutes}` };
  });

  const handleCheckboxChange = (id: string | number) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id) ? prevSelectedRows.filter((rowId) => rowId !== id) : [...prevSelectedRows, id]
    );
  };

  const handleAddRow = () => {
    setNewSchedules([
      ...newSchedules,
      {
        id: newSchedules.length + schedules.length + 1,
        day: "",
        name: "",
        hours24: false,
        start: "",
        from: "",
        to: "",
        end: "",
        totalHours: "",
        isNew: true,
      },
    ]);
  };

  const handleSave = () => {
    addSchedules(newSchedules);
    setNewSchedules([]);
  };

  const handleInputChange = (id: number, field: string, value: any) => {
    setNewSchedules((prevSchedules) => prevSchedules.map((schedule) => (schedule.id === id ? { ...schedule, [field]: value } : schedule)));
  };

  const calculateTotalHours = (start: string, end: string, from: string, to: string) => {
    if (!start || !end) return "0h:0m";

    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    const fromTime = from ? new Date(`1970-01-01T${from}:00`) : null;
    const toTime = to ? new Date(`1970-01-01T${to}:00`) : null;

    let totalWorkTime = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    let intervalTime = fromTime && toTime ? (toTime.getTime() - fromTime.getTime()) / (1000 * 60 * 60) : 0;

    if (totalWorkTime < 0) totalWorkTime += 24;
    if (intervalTime < 0) intervalTime += 24;

    const totalHours = totalWorkTime - intervalTime;
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);

    return `${hours}h:${minutes}m`;
  };

  const [registersLoaded, setRegistersLoaded] = useState<RegistersLoaded[]>([]);

  const [observation, setObservation] = useState<string>("");

  let [registersIndex, setRegistersIndex] = useState<number>(0);

  const router = useRouter();

  const addRegister = () => {
    registers.set(registersIndex.toString(), {
      day: 1,
      id: "",
      employees: [],
      scheduleHour: [],
      action: "create",
    });

    setRegistersIndex(registersIndex + 1);

    setRegisters(registers);
  };

  const removeRegisterSaved = (key: string, id: string) => {
    formularioDelete.set(key, id);

    setFormularioDelete(new Map(formularioDelete));
  };

  const removeRegisterOfRemoveList = (key: string, id: string) => {
    formularioDelete.delete(key);

    setFormularioDelete(new Map(formularioDelete));
  };

  const removeRegister = (key: string) => {
    registers.delete(key);

    setRegistersIndex(registersIndex - 1);

    setRegisters(new Map(registers));
  };

  let plantao = router.query.Plantao;
  let local = router.query.Local;
  let mes = router.query.Mes;

  const getRegistersCreated = async () => {
    setIsLoadingRegisters(true);
    if (router.query.Plantao != undefined && router.query.Local != undefined) {
      plantao = router.query.Plantao;
      local = router.query.Local;
      mes = router.query.Mes;
    } else {
      plantao = plantaoChosen;
      local = localChosen;
      mes = monthNumber.toString();
    }

    function getScheduleType() {
      if (plantao === "Transporte" || plantao === "Controle De Perdas") {
        return plantao;
      } else {
        return `${plantao} - ${local}`;
      }
    }

    let setor = getScheduleType();

    if ((plantao === "" && local != "") || (plantao != "" && local === "" && plantao != "Transporte" && plantao != "Controle De Perdas")) {
      router.query.Plantao = undefined;
      router.query.Local = undefined;
      router.query.Mes = undefined;
      setIsLoadingRegisters(false);
      return;
    } else {
      if (setor === " - ") {
        router.query.Plantao = undefined;
        router.query.Local = undefined;
        router.query.Mes = undefined;
        setIsLoadingRegisters(false);
        return;
      } else {
        api.get(`/schedulesRegistered/?year=${year}&month=${mes ?? monthNumber}&setor=${setor}`).then((resp) => {
          setLoadedForms(resp.data);
          setRegistersLoaded(resp.data);
          setIsLoadingRegisters(false);
          router.query.Plantao = undefined;
          router.query.Local = undefined;
          router.query.Mes = undefined;
        });
      }
    }
  };

  useEffect(() => {
    if (registersLoaded.length > 0) {
      for (let i = 0; i < registersLoaded.length; i++) {
        registers.set(i.toString(), {
          day: new Date(registersLoaded[i].data).getUTCDate(),
          id: registersLoaded[i].id,
          employees: [
            {
              label: registersLoaded[i].funcionario,
              value: {
                n_pes: registersLoaded[i].n_pes_funcionario,
                nome: registersLoaded[i].funcionario,
                endereco: registersLoaded[i].endereco,
                telefone_1: registersLoaded[i].telefone_1,
                telefone_2: registersLoaded[i].telefone_2,
              },
            },
          ],
          scheduleHour: registersLoaded[i].horario
            .trim()
            .replace(/ /g, "")
            .split(/[\-\/]/), // os horarios vem em formato de string, então é preciso remover os espaçoes e transformar em um array de horarios
          action: "edit",
        });

        setRegistersIndex(i + 1);
        setRegisters(new Map(registers));
      }
    }
  }, [registersLoaded]);

  if (registers.size === 0) {
    setIsEmpty(true);
  } else {
    setIsEmpty(false);
  }

  const handleChangeObservation = (observation: string) => {
    setObervationForm(observation);
  };

  useEffect(() => {
    setRegisters(new Map());
    setRegistersLoaded([]);
    setRegistersIndex(0);
    getRegistersCreated();
    setScheduleHoursChanges({
      userInfo: {},
    });
    setHaveSchedulesHourChanged(false);
  }, [plantaoChosen, localChosen, monthNumber, year]);

  useEffect(() => {
    setObservation(observationForm);
  }, [observationForm]);

  useEffect(() => {
    setIsEmpty(false);

    setTimeout(() => {
      setRegisters(new Map());
    }, 80);
    setRegistersLoaded([]);
  }, []);

  const sendFormWithChanges = () => {
    if (verifyEmptyFields() === true) {
      setIsSendingForm(false);
      setHaveEmptyField(true);
      return;
    } else {
      setScheduleHoursChanges({
        userInfo: {
          n_pes: "123",
        },
      });
    }
  };

  const [scheduleHoursChanges, setScheduleHoursChanges] = useState<any>({
    userInfo: {},
  });

  const daysOptions = allDays.map((day) => {
    return {
      value: day, label: `${day} - ${getDayOfTheWeek(day, year, monthNumber)}`
    }
  })

  return (
    <Container>
      <Table>
        <thead>
          <tr style={{ height: 35 }}>
            <th colSpan={3}>Escala</th>
            <th colSpan={4}>Intervalo</th>
            <th rowSpan={2} style={{ width: 100 }}>
              Total horas de plantão
            </th>
            <th style={{ width: 55, borderRight: "none" }} rowSpan={2}>
              <RiDeleteBin7Line size={23} color='#808080' />
            </th>
          </tr>
          <tr>
            <th style={{ width: 95 }}>Dia</th>
            <th>Nome do Colaborador</th>
            <th style={{ width: 50 }}>24hrs</th>
            <th style={{ width: 90 }}>Início</th>
            <th style={{ width: 90 }}>dás</th>
            <th style={{ width: 90 }}>às</th>
            <th style={{ width: 90 }}>Término</th>
          </tr>
        </thead>
        <tbody>
          {/* verificação se os setores foram escolhidos corretamente e se possuem algum registro */}
          {plantaoChosen === "Transporte" ||
          plantaoChosen === "Controle De Perdas" ||
          (plantaoChosen != "" && localChosen != "" && isEmpty) ? (
            registers.size === 0 ? (
              // @ts-ignore
              <>
                {setHaveSchedulesHourChanged(false)}
                <EmptyRegistersMessage>
                  <div>
                    <AiOutlineInfoCircle size={36} color={"white"} />
                  </div>
                  <h3>Não Há escalas registradas</h3>
                </EmptyRegistersMessage>
              </>
            ) : null
          ) : null}
          <>
            {Array.from(registers).map((data, index) => {
              const schedule = data[1];

              return (
                <tr key={schedule.id} style={{ backgroundColor: selectedRows.includes(schedule.id) ? "#fd9797" : "transparent" }}>
                  <td>
                    {/* {action === "edit" ? (
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
                    ))} */}
                    {schedule.isNew ? (
                      <Select
                        styles={{ ...customStyles, ...customSelectStyleWithoutIcon }}
                        options={daysOptions}
                        value={daysOptions.find((option) => option.value === schedule.day)}
                        onChange={(option) => handleInputChange(schedule.id, "day", option?.value || "")}
                        placeholder='Selecione'
                      />
                    ) : (
                      schedule.day
                    )}
                  </td>
                  <td className='text-left'>
                    {schedule.isNew ? (
                      <Select
                        styles={customStyles}
                        options={nameOptions}
                        value={nameOptions.find((option) => option.value === schedule.name)}
                        onChange={(option) => handleInputChange(schedule.id, "name", option?.value || "")}
                        placeholder='Selecione'
                        // isMulti
                      />
                    ) : (
                      schedule.name
                    )}
                  </td>
                  <td>
                    <input
                      type='checkbox'
                      checked={schedule.hours24}
                      onChange={(e) => handleInputChange(schedule.id, "hours24", e.target.checked)}
                      placeholder='Selecione'
                    />
                  </td>
                  <td colSpan={schedule.hours24 ? 4 : 1}>
                    {schedule.hours24 ? (
                      "FullTime"
                    ) : schedule.isNew ? (
                      <Select
                        styles={{ ...customStyles, ...customSelectStyleWithoutIcon }}
                        options={timeOptions.filter((option) => !schedule.end || option.value < schedule.end)}
                        value={timeOptions.find((option) => option.value === schedule.start)}
                        onChange={(option) => handleInputChange(schedule.id, "start", option?.value || "")}
                        placeholder='Selecione'
                      />
                    ) : (
                      schedule.start
                    )}
                  </td>
                  {!schedule.hours24 && (
                    <td>
                      {schedule.isNew ? (
                        <Select
                          styles={{ ...customStyles, ...customSelectStyleWithoutIcon }}
                          options={timeOptions.filter((option) => !schedule.to || option.value < schedule.to)}
                          value={timeOptions.find((option) => option.value === schedule.from)}
                          onChange={(option) => handleInputChange(schedule.id, "from", option?.value || "")}
                          placeholder='Selecione'
                        />
                      ) : (
                        schedule.from
                      )}
                    </td>
                  )}
                  {!schedule.hours24 && (
                    <td>
                      {schedule.isNew ? (
                        <Select
                          styles={{ ...customStyles, ...customSelectStyleWithoutIcon }}
                          options={timeOptions.filter((option) => !schedule.from || option.value > schedule.from)}
                          value={timeOptions.find((option) => option.value === schedule.to)}
                          onChange={(option) => handleInputChange(schedule.id, "to", option?.value || "")}
                          placeholder='Selecione'
                        />
                      ) : (
                        schedule.to
                      )}
                    </td>
                  )}
                  {!schedule.hours24 && (
                    <td>
                      {schedule.isNew ? (
                        <Select
                          styles={{ ...customStyles, ...customSelectStyleWithoutIcon }}
                          options={timeOptions.filter((option) => !schedule.start || option.value > schedule.start)}
                          value={timeOptions.find((option) => option.value === schedule.end)}
                          onChange={(option) => handleInputChange(schedule.id, "end", option?.value || "")}
                          placeholder='Selecione'
                        />
                      ) : (
                        schedule.end
                      )}
                    </td>
                  )}
                  <td>{schedule.hours24 ? "24:00" : calculateTotalHours(schedule.start, schedule.end, schedule.from, schedule.to)}</td>
                  <td>
                    <input type='checkbox' onChange={() => handleCheckboxChange(schedule.id)} />
                  </td>
                </tr>
              );
            })}
          </>
        </tbody>
      </Table>
      <ButtonContainer>
        {plantaoChosen === "Transporte" || plantaoChosen === "Controle De Perdas" || (plantaoChosen != "" && localChosen != "") ? (
          <Button onClick={handleAddRow}>Adicionar Linha</Button>
        ) : null}
        <Button onClick={handleSave}>Salvar</Button>
      </ButtonContainer>
      <div style={{ display: "flex", flexDirection: "column", gap: 15, paddingTop: 15 }}>
        <span>Observação</span>
        <textarea style={{ minHeight: 60 }} name='observations' id='observations' wrap='hard'></textarea>
      </div>
    </Container>
  );
};

export default ScheduleTable;
