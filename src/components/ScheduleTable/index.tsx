import Image from "next/image";
import closeIcon from "../../assets/close.png";

import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import Register from "./components/Register";
import { useAvailableSchedulesContext } from "../../context/availableSchedulesContext";

import { FaTrashAlt, FaTrashRestoreAlt } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { TailSpin } from "react-loader-spinner";

import {
  Container,
  EmptyFieldError,
  AddRegisters,
  ButtonsContainer,
  PenIconContainer,
  EmptyRegistersMessage,
  ObservationSection,
  LoadingContainer,
  Tbody,
  ButtonContainer,
  Button,
} from "./styles";

import FormContext from "../../context/formContext";
import { BiError } from "react-icons/bi";
import { api } from "../../services/api";
import { Buttons } from "../../../styles/pages/dashboard";
import { Slide, ToastContainer } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";

import { IoInformationCircleSharp } from "react-icons/io5";

import HaveScheduleHoursChanges from "../Modal/HaveScheduleHoursChanges";

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

const ScheduleTable = () => {
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

  const { isLogged } = useAuthContext();

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

  // function handleKeyDownObservation(e: any) {
  //   e.target.style.height = "inherit";
  //   e.target.style.height = `${e.target.scrollHeight}px`;
  // }

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
  }, []);

  useEffect(() => {
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

  if (isLoadingRegisters) {
    return (
      <>
        <ToastContainer autoClose={2500} transition={Slide} />
        <Container>
          <Header />
          <Tbody>
            <tr>
              <td colSpan={9}>
                <LoadingContainer>
                  <TailSpin height='50' width='50' color='#2faee0a2' ariaLabel='loading' />
                  <span>Carregando..</span>
                </LoadingContainer>
              </td>
            </tr>
          </Tbody>
        </Container>
      </>
    );
  }

  return (
    <>
      <ToastContainer autoClose={2500} transition={Slide} />
      <Container>
        <Header />
        <Tbody>
          {Object.keys(scheduleHoursChanges.userInfo).length != 0 ? (
            <HaveScheduleHoursChanges
              userInfo2={scheduleHoursChanges.userInfo}
              plantao={`${plantaoChosen} - ${localChosen}`}
              closeModal={() =>
                setScheduleHoursChanges({
                  userInfo: {},
                })
              }
              data_escala={{ year, monthNumber }}
            />
          ) : null}
          {haveEmptyField ? (
            <>
              <tr>
                <td colSpan={9}>
                  <EmptyFieldError>
                    <BiError size={24} />
                    <span>Existem campos vazios a serem preenchidos</span>
                  </EmptyFieldError>
                </td>
              </tr>
            </>
          ) : null}

          {/* verificação se os setores foram escolhidos corretamente e se possuem algum registro */}
          {plantaoChosen === "Transporte" ||
          plantaoChosen === "Controle De Perdas" ||
          (plantaoChosen != "" && localChosen != "" && isEmpty) ? (
            registers.size === 0 ? (
              //@ts-ignore
              <>
                {setHaveSchedulesHourChanged(false)}
                <tr>
                  <td colSpan={9} style={{}}>
                    <EmptyRegistersMessage>
                      <IoInformationCircleSharp color='#666666' size={40} />
                      <h3>Não Há escalas registradas</h3>
                    </EmptyRegistersMessage>
                  </td>
                </tr>
              </>
            ) : null
          ) : null}

          {Array.from(registers).map((data, index) => (
            <Register
              id={data[1].id}
              day={data[1].day}
              index={index}
              action={data[1].action}
              defaultValues={
                data[1].action === "edit" && {
                  idLoaded: "",
                  dayLoaded: data[1].day,
                  employeesLoaded: [],
                  scheduleHourLoaded: data[1].scheduleHour,
                }
              }
              removeRegisterOfRemoveList={removeRegisterOfRemoveList}
              removeRegisterSaved={removeRegisterSaved}
              removeRegister={removeRegister}
            />
          ))}
        </Tbody>
      </Container>
      <ButtonContainer>
        {plantaoChosen === "Transporte" || plantaoChosen === "Controle De Perdas" || (plantaoChosen != "" && localChosen != "") ? (
          //@ts-ignore
          <Button onClick={addRegister}>Adicionar Linha</Button>
        ) : null}
        {/* @ts-ignore */}
        {isSendingForm ? (
          <Button style={{ margin: "0 auto" }}>Carregando..</Button>
        ) : registers.size != 0 || formularioDelete.size != 0 ? (
          haveSchedulesHourChanged ? (
            <Button onClick={() => sendFormWithChanges()}>Salvar</Button>
          ) : (
            <Button onClick={() => sendForm()}>Salvar</Button>
          )
        ) : (
          <Button style={{ opacity: "0.5", pointerEvents: "none" }} disabled>
            Salvar
          </Button>
        )}

        {/* <Button
          disabled={registers.size === 0 || formularioDelete.size === 0 || isSendingForm}
          onClick={haveSchedulesHourChanged ? sendFormWithChanges : sendForm}
          style={
            registers.size === 0 || formularioDelete.size === 0 || isSendingForm ?
            { opacity: "0.5", pointerEvents: 'none'}
            :
            {}
            }
        >
          {isSendingForm ? "Carregando..." : "Salvar"}
        </Button> */}
      </ButtonContainer>
      {registers.size >= 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 15, padding: 10 }}>
          <span style={{ paddingLeft: 5, fontSize: 14 }}>Observação</span>
          <textarea
            style={{ minHeight: 80, paddingLeft: 10, paddingRight: 10 }}
            name='observations'
            id='observations'
            value={observationForm}
            cols={130}
            wrap='hard'
            onChange={(e) => handleChangeObservation(e.target.value)}
          ></textarea>
        </div>
      )}
      <Buttons></Buttons>
    </>
  );
};

export default ScheduleTable;

export const PenIcon = () => (
  <>
    {/* @ts-ignore */}
    <PenIconContainer width='29' height='29' viewBox='0 0 29 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <svg>
        <path
          d='M27.8303 0.995058L27.7956 0.962646C27.1312 0.341898 26.27 0 25.3705 0C24.3622 0 23.394 0.436597 22.7143 1.19774L9.86069 15.5911C9.74354 15.7223 9.65467 15.8771 9.59974 16.0456L8.08834 20.68C7.9136 21.2158 8.0013 21.8083 8.32291 22.265C8.64708 22.7252 9.16933 23 9.72004 23H9.72012C9.95832 23 10.1912 22.9499 10.412 22.8511L14.788 20.8929C14.9471 20.8218 15.0899 20.7172 15.2069 20.5861L28.0606 6.19275C29.3981 4.69509 29.295 2.36358 27.8303 0.995058ZM10.9841 19.8239L11.871 17.1045L11.9458 17.0207L13.6267 18.591L13.5519 18.6748L10.9841 19.8239ZM26.2279 4.48047L15.3008 16.7166L13.6198 15.1462L24.547 2.91003C24.7607 2.6707 25.0532 2.53885 25.3706 2.53885C25.649 2.53885 25.9157 2.6448 26.122 2.83758L26.1567 2.87C26.6104 3.2939 26.6424 4.01637 26.2279 4.48047Z'
          fill='black'
        />
        <path
          d='M25.7269 11.0498C25.0237 11.0498 24.4537 11.6225 24.4537 12.3289V23.1887C24.4537 24.9824 23.0011 26.4418 21.2157 26.4418H5.78439C3.99892 26.4418 2.54643 24.9824 2.54643 23.1887V7.81138C2.54643 6.01766 3.999 4.55831 5.78439 4.55831H16.9536C17.6568 4.55831 18.2269 3.98559 18.2269 3.27916C18.2269 2.57272 17.6568 2 16.9536 2H5.78439C2.59481 2 0 4.60701 0 7.81138V23.1886C0 26.393 2.5949 29 5.78439 29H21.2156C24.4051 29 27 26.393 27 23.1886V12.3289C27.0001 11.6225 26.43 11.0498 25.7269 11.0498Z'
          fill='black'
        />
      </svg>
    </PenIconContainer>
  </>
);
