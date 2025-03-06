// @ts-nocheck

import React, { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { api } from "../services/api";
import { useAuthContext } from "./AuthContext";
import AvailableSchedulesContext from "./availableSchedulesContext2";

// Toastfify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { Registers } from "../components/ScheduleTable/styles";

type EscalasContextProps = {
  children: ReactNode;
};

type LoadedForm = {
  data: Date;
  endereco: string | null;
  escala_participante: string;
  funcionario: string;
  horario: string;
  id: string;
  n_pes_funcionario: string;
  n_pes_responsavel: string;
  responsavel: string;
  telefone_1: string | null;
  telefone_2: string | null;
  total_horas: string;
};

export type EmployeeData = {
  label: string;
  value: {
    n_pes: string;
    nome: string;
    endereco: string;
    telefone_1: string;
    telefone_2: string;
  };
};

type RegisterData = {
  id: string;
  day: number;
  employees: EmployeeData[];
  scheduleHour: any;
  action: string;
};

interface IFormContext {
  formulario: object;
  responsavel: string;
  n_pes_responsavel: string;
  consoleLogForm: any;
  sendForm: any;
  haveEmptyField: boolean;
  registers: Map<string, RegisterData>;
  formularioDelete: Map<string, string>;
  showFormSendMessage: boolean;
  loadedForms: LoadedForm[];
  isLoadingRegisters: boolean;
  isEmpty: boolean | null;
  isSendingForm: boolean;
  haveSchedulesHourChanged: boolean;
  setHaveSchedulesHourChanged: (state: boolean) => void;
  changesSchedulesHourObservation: string;
  setChangesSchedulesHourObservation: (state: string) => void;
  setIsEmpty: (value: boolean) => void;
  setIsLoadingRegisters: (state: boolean) => void;
  setRegisters: (newState: any) => void;
  updateRegisterHours: (index: string, scheduleHours: string[]) => void;
  setResponsavel: (newState: any) => void;
  setN_pes_responsavel: (newState: any) => void;
  setFormularioDelete: (newState: any) => void;
  setShowFormSendMessage: (newState: any) => void;
  setLoadedForms: (newState: any) => void;
  gerarEscalas: () => void;
  verifyEmptyFields: () => boolean;
  setIsSendingForm: (state: boolean) => void;
  setHaveEmptyField: (state: boolean) => void;
  registersIndex: any;
  setRegistersIndex: any;
}

const initilValue = {
  formulario: {},
  responsavel: "Responsavel Teste",
  n_pes_responsavel: "0000",
  haveEmptyField: false,
  registers: new Map(),
  formularioDelete: new Map(),
  showFormSendMessage: false,
  loadedForms: [],
  isLoadingRegisters: false,
  isEmpty: false,
  isSendingForm: false,
  haveSchedulesHourChanged: true,
  changesSchedulesHourObservation: "",
  setHaveSchedulesHourChanged: () => {},
  setChangesSchedulesHourObservation: () => {},
  setIsEmpty: () => {},
  setIsLoadingRegisters: () => {},
  setFuncionariosEscalados: () => {},
  setHorariosEscalados: () => {},
  consoleLogForm: () => {},
  sendForm: () => {},
  setHaveEmptyField: () => {},
  setRegisters: () => {},
  updateRegisterHours: () => {},
  setFormularioDelete: () => {},
  setResponsavel: () => {},
  setN_pes_responsavel: () => {},
  setShowFormSendMessage: () => {},
  setLoadedForms: () => {},
  gerarEscalas: () => {},
  verifyEmptyFields: () => true,
  setIsSendingForm: () => true,
};

const FormContext = createContext<IFormContext>(initilValue);

const FormProvider = ({ children }: EscalasContextProps) => {
  const { monthNumber, year, localChosen, plantaoChosen, setPlantaoChosen, observationForm } = useContext(AvailableSchedulesContext);

  const [responsavel, setResponsavel] = useState(initilValue.responsavel);
  const [n_pes_responsavel, setN_pes_responsavel] = useState(initilValue.n_pes_responsavel);

  const [formularioDelete, setFormularioDelete] = useState(initilValue.formularioDelete);

  const [showFormSendMessage, setShowFormSendMessage] = useState<boolean>(initilValue.showFormSendMessage);

  const [loadedForms, setLoadedForms] = useState<LoadedForm[]>(initilValue.loadedForms);

  const [registers, setRegisters] = useState<Map<any, any>>(initilValue.registers);

  const [haveEmptyField, setHaveEmptyField] = useState<boolean>(initilValue.haveEmptyField);

  const [isLoadingRegisters, setIsLoadingRegisters] = useState<boolean>(initilValue.isLoadingRegisters);

  const [isEmpty, setIsEmpty] = useState<boolean | null>(initilValue.isEmpty);

  const [isSendingForm, setIsSendingForm] = useState<boolean>(initilValue.isSendingForm);

  let [registersIndex, setRegistersIndex] = useState<number>(0);

  // AuthContext
  const { userInfo } = useAuthContext();

  useEffect(() => {
    setResponsavel(userInfo.nome);
    setN_pes_responsavel(userInfo.n_pes);
  }, [userInfo]);

  const calcularTotalJornada = (scheduleHour: string[]) => {
    let horasFormatadas: number[] = [];

    scheduleHour.map((hora) => {
      horasFormatadas.push(parseFloat(hora.replace(":", ".").replace(".3", ".5")));
    });

    return horasFormatadas[3] - horasFormatadas[0] - (horasFormatadas[2] - horasFormatadas[1]);
  };

  const notify = (text: string) => toast.success(text);

  function gerarEscalas() {
    let escalas: object[] = [];

    registers.forEach((value, key) => {
      const registerDay = value.day;
      const registerEmployees = value.employees;
      const registerSchedule = value.scheduleHour;
      const registerType = value.action;

      if (registerType === "create") {
        registerEmployees!.map((employee: any) => {
          escalas.push({
            funcionario: employee.value.nome,
            n_pes_funcionario: employee.value.n_pes,
            data: `${year}/${monthNumber}/${registerDay}`,
            horario: `${registerSchedule[0]} - ${registerSchedule[1]} / ${registerSchedule[2]} - ${registerSchedule[3]}`,
            total_horas: calcularTotalJornada([
              registerSchedule[0] ?? "00:00",
              registerSchedule[1] ?? "00:00",
              registerSchedule[2] ?? "00:00",
              registerSchedule[3] ?? "24:00",
            ]),
            endereco: employee.value.endereco,
            telefone_1: employee.value.telefone_1,
            telefone_2: employee.value.telefone_2,
          });
        });
      }
    });
    return escalas;
  }

  const [formulario, setFormulario] = useState<any>({
    responsavel: responsavel,
    n_pes_responsavel: n_pes_responsavel,
    escalas: [],
  });

  let formularioObservacao = {
    setor: `${plantaoChosen} - ${localChosen}`,
    year: year.toString(),
    month: monthNumber.toString(),
    observation: observationForm,
  };

  function getScheduleType() {
    if (plantaoChosen === "Transporte" || plantaoChosen === "Controle De Perdas") {
      return plantaoChosen;
    } else {
      return `${plantaoChosen} - ${localChosen}`;
    }
  }

  function updateRegisterHours(index: string, scheduleHours: string[]) {
    registers.set(index, {
      ...registers.get(index),
      scheduleHour: scheduleHours,
    });

    // setFormulario({
    //   responsavel: responsavel,
    //   n_pes_responsavel: n_pes_responsavel,
    //   escalas: gerarEscalas(),
    // });

    // console.log(registers);
    // console.log('teste');
    // console.log(registers.get(index));

    // setRegisters()
  }

  // useEffect(() => {
  //   setFormulario({
  //     responsavel: responsavel,
  //     n_pes_responsavel: n_pes_responsavel,
  //     escalas: gerarEscalas(),
  //   });
  // }, [registers]);

  async function sendForm() {
    setFormulario({
      responsavel: responsavel,
      n_pes_responsavel: n_pes_responsavel,
      escalas: gerarEscalas(),
    });

    const formToSend = {
      responsavel: responsavel,
      n_pes_responsavel: n_pes_responsavel,
      escalas: gerarEscalas(),
    };

    setIsSendingForm(true);
    if (formToSend.escalas.length > 0 || formularioDelete.size > 0) {
      if (verifyEmptyFields() === true) {
        setIsSendingForm(false);
        setHaveEmptyField(true);
        return console.log("Existem campos para preencher");
      } else {
        await api
          .post(`/schedules/?scheduleType=${getScheduleType()}`, formToSend)
          .then(() => {
            api
              .post("/observation", formularioObservacao)
              .then((e) => {
                setHaveEmptyField(false);
                setShowFormSendMessage(true);
                refreshRegistersAfterSend();
                notify("Formulário Enviado");
              })
              .catch((erro) => {
                console.log(`erro na atualização da observação: ${erro}`);
              });
            // window.location.reload(); // refresh na pagina
          })
          .catch((erro) => {
            console.log(`erro post formulario: ${erro}`);
          });

        if (formularioDelete.size > 0) {
          let idList: string[] = [];

          formularioDelete.forEach((value, key) => {
            formulario.escalas.shift();
            idList.push(value);
          });

          api
            .delete("/schedules/", {
              data: idList,
            })
            .then(() => {
              setHaveEmptyField(false);
              setShowFormSendMessage(true);
              refreshRegistersAfterSend();
              notify("Registro(s) Excluído");
              // window.location.reload();
            })
            .catch((erro) => {
              console.log(`erro post formulario: ${erro}`);
            });
        }
      }
    } else {
      api
        .post("/observation", formularioObservacao)
        .then((e) => {
          setHaveEmptyField(false);
          setShowFormSendMessage(true);
          refreshRegistersAfterSend();
        })
        .catch((erro) => {
          console.log(`erro na atualização da observação: ${erro}`);
        });
    }

    setIsSendingForm(false);
  }

  function refreshRegistersAfterSend() {
    setFormularioDelete(new Map());
    setPlantaoChosen("");
    setTimeout(() => {
      setIsSendingForm(false);
      setPlantaoChosen(plantaoChosen);
    }, 10);
    setTimeout(() => {
      setShowFormSendMessage(false);
    }, 3000);
  }

  const [haveSchedulesHourChanged, setHaveSchedulesHourChanged] = useState(false);

  const [changesSchedulesHourObservation, setChangesSchedulesHourObservation] = useState("");

  function verifyEmptyFields() {
    let haveNullField: boolean = false;

    registers.forEach((value, key) => {
      const registerDay: number | string = value.day;
      const registerEmployees: string[] = value.employees;
      const registerSchedule: string[] = value.scheduleHour;
      const totalHour: number = value.totalHours;

      // se todos os horários vierem com 00:00 este horáio é invalido (lembrando que cajo venha das 00:00 meia noite ele virá 24:00)
      let count = 0;
      registerSchedule.map((horarios) => {
        if (horarios == "00:00") {
          count = count + 1;
        }
      });

      // o count seria quantas vezes os horarios vieram como 00:00
      if (count === 4) {
        haveNullField = true;
        console.log("verificao1");
        return true;
      }

      // verifica se o dia está vazio
      if (registerDay === "") {
        haveNullField = true;
        console.log("verificao2");
        return true;
      }

      // verifica se o campo de funcionarios esta vazio
      if (registerEmployees.length === 0) {
        haveNullField = true;
        console.log("verificao3");
        return true;
      }

      // verifica se o horario de saída é menor que o horário de entrada
      if (parseFloat(value.scheduleHour[3]) < parseFloat(value.scheduleHour[0])) {
        haveNullField = true;
        console.log("verificao4");
        return true;
      }

      // vericia se o horario de saída esta como 00:00 (se fosse meia-noite deveria vir 24:00)
      // if (registerSchedule[3] === "00:00") {
      //   haveNullField = true;
      //   console.log("verificao5");
      //   return;
      // }
    });

    // setHaveEmptyField(haveEmptyField);
    return haveNullField;
  }

  function consoleLogForm() {
    console.log(formulario);
  }

  return (
    <FormContext.Provider
      value={{
        responsavel,
        n_pes_responsavel,
        haveEmptyField,
        registers,
        formularioDelete,
        showFormSendMessage,
        formulario,
        loadedForms,
        gerarEscalas,
        setResponsavel,
        setN_pes_responsavel,
        updateRegisterHours,
        consoleLogForm,
        setHaveEmptyField,
        setRegisters,
        sendForm,
        setFormularioDelete,
        setShowFormSendMessage,
        setLoadedForms,
        isLoadingRegisters,
        setIsLoadingRegisters,
        isEmpty,
        setIsEmpty,
        isSendingForm,
        changesSchedulesHourObservation,
        haveSchedulesHourChanged,
        setChangesSchedulesHourObservation,
        setHaveSchedulesHourChanged,
        setIsSendingForm,
        verifyEmptyFields,
        registersIndex,
        setRegistersIndex,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider };
export default FormContext;
