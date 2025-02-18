// @ts-nocheck

import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Title,
  Container,
  Table,
  Section,
  MonthSelect,
  IconGuide,
  ButtonGenerateXLS,
  SectionTitle,
  WeeklyReportButton,
  WeeklyReports,
  ScheduleButtonsOptions,
  AlterationsLogs,
} from "../../styles/pages/historic";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";

// Icons
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineLoading3Quarters } from "react-icons/ai";

// Services
import { generatePdfSchedule } from "../services/generatePdfSchedule";

import { useAuthContext } from "../context/AuthContext";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { data } from "../data/sectorsData";
import { generatePdfGeneralHistoric } from "../services/generatePdfGeneralHistoric";
import Link from "next/link";
import { api } from "../services/api";
import AvailableSchedulesContext from "../context/availableSchedulesContext";
import axios from "axios";
import { SelectVisualizeReport } from "../components/SelectVisualizeReport";

import { GrDocumentPdf } from "react-icons/gr";

import { AiOutlineFileSearch } from "react-icons/ai";

import Select from "react-select";
import { Box, Button, Modal, Typography } from "@mui/material";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    minHeight: "30px",
    height: "32px",
    fontSize: "13px",
    minWidth: "200px",
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
    fontSize: "13px",
    padding: "8px 10px",
  }),
};

const Historic = () => {
  const { userInfo } = useAuthContext();
  const { observationForm, monthNumber, setMonthNumber, year, setYear } = useContext(AvailableSchedulesContext);

  const { isLogged } = useAuthContext();

  const [dateNow, setDateNow] = useState<Date>(new Date());
  const [month, setMonth] = useState<number>(monthNumber);
  const [daysOfSaturday, setDaysOfSaturday] = useState<number[]>([]);
  const [daysOfThursday, setDaysOfThursday] = useState<number[]>([]);
  const [schedulesDoneList, setSchedulesDoneList] = useState<any>({
    Apiaí: {
      Operacional: null,
      ETA: null,
    },
    Juquiá: {
      Operacional: null,
      ETA: null,
    },
    Juquitiba: {
      Operacional: null,
      ETA: null,
    },
    Registro: {
      Operacional: null,
      ETA: null,
    },
    São_Lourenço: {
      Operacional: null,
      ETA: null,
    },
    Sete_Barras: {
      Operacional: null,
      ETA: null,
    },
    Registro_Sete_Barras: {
      Operacional: null,
      ETA: null,
    },
    Barra_do_Turvo: {
      Operacional: null,
      ETA: null,
    },
    Cajati: {
      Operacional: null,
      ETA: null,
    },
    Cajati_Jacupiranga: {
      Operacional: null,
      ETA: null,
    },
    Eldorado: {
      Operacional: null,
      ETA: null,
    },
    Iporanga: {
      Operacional: null,
      ETA: null,
    },
    Jacupiranga: {
      Operacional: null,
      ETA: null,
    },
    Cananéia: {
      Operacional: null,
      ETA: null,
    },
    Iguape: {
      Operacional: null,
      ETA: null,
    },
    Iguape_Ilha_Comprida: {
      Operacional: null,
      ETA: null,
    },
    Ilha_Comprida: {
      Operacional: null,
      ETA: null,
    },
    Ilha_Comprida_Pedrinhas: {
      Operacional: null,
      ETA: null,
    },
    Pariquera_Açu: {
      Operacional: null,
      ETA: null,
    },
    Itariri: {
      Operacional: null,
      ETA: null,
    },
    Miracatu: {
      Operacional: null,
      ETA: null,
    },
    Pedro_de_Toledo: {
      Operacional: null,
      ETA: null,
    },
    Tapiraí: {
      Operacional: null,
      ETA: null,
    },
    Barra_do_Chapéu: {
      Operacional: null,
      ETA: null,
    },
    Itaoca: {
      Operacional: null,
      ETA: null,
    },
    Itapirapuã_Paulista: {
      Operacional: null,
      ETA: null,
    },
    Ribeira: {
      Operacional: null,
      ETA: null,
    },
    Ribeira_Itapirapuã_Paulista: {
      Operacional: null,
      ETA: null,
    },
    Ribeira_Itaoca: {
      Operacional: null,
      ETA: null,
    },
    Transporte: {
      done: null,
    },
    Controle_De_Perdas: {
      done: null,
    },
    Manutenção_Almoxarifado: {
      done: null,
    },
    Manutenção_Informatica: {
      done: null,
    },
    Manutenção_Apiaí: {
      done: null,
    },
    Manutenção_Automação: {
      done: null,
    },
    Manutenção_Eletromecânica: {
      done: null,
    },
    Manutenção_Juquitiba_São_Lourenço: {
      done: null,
    },
    Manutenção_Técnico: {
      done: null,
    },
    Manutenção_Cananéia: {
      done: null,
    },
    Manutenção_Iguape: {
      done: null,
    },
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [logs, setLogs] = useState([]);

  const [schedulesChanges, setSchedulesChanges] = useState<any>({});

  const handleIncrementMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
      setMonthNumber(1);
    }
    if (month < 12) {
      setMonth(month + 1);
      setMonthNumber(month + 1);
    }
  };

  const handleDecrementMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
      setMonthNumber(12);
    }
    if (month > 1) {
      setMonth(month - 1);
      setMonthNumber(month - 1);
    }
  };

  const notify = (text: string) => toast.warn(text);

  const toastId = React.useRef(null);
  const notifyLoading = () => toast.info("Gerando Relatório..", { autoClose: false });
  const dismissLoadingNotify = () => toast.dismiss(toastId.current!);

  const handleSeeWeek = async (sector: string, day?: number, limit?: number) => {
    // aqui ele ira verifcar pegando primeiro o dia de hoje e verificando se é quarta-feira, caso não ele vai incrementando até bater o valor de quarta feira assim ele salva o valor e usa no parametro da funçao do pdf

    let isWednesday = false;
    let daysLimit = limit ?? 7;
    let dayOfWednesday = dateNow.getDate();

    if (day === undefined) {
      while (isWednesday === false) {
        let date = new Date(year, month - 1, dayOfWednesday, 0, 0, 0);

        if (date.getDay() === 3) {
          isWednesday = true;
        } else {
          dayOfWednesday++;
        }
      }
    } else {
      dayOfWednesday = day;
    }

    try {
      await generatePdfGeneralHistoric(
        sector,
        dayOfWednesday,
        dayOfWednesday + daysLimit, // aqui precisa passar o limite que quantos dias considerar
        month,
        month,
        year,
        dismissLoadingNotify,
        notifyLoading
      );
    } catch (err: any) {
      if (err.message === "Cannot read properties of undefined (reading 'push')") {
        notify("Erro Interno (município) Tente novamente em alguns minutos");
      } else {
        console.log(err);
        notify("Não Foram encontrado escalas com esses parâmetros");
      }
    }
  };

  const generateWeekDays = () => {
    let thursdayDays: number[] = []; // dias que são quinta-feira
    let saturdayDays: number[] = []; // dias que são quarta-feira
    let totalDaysOfMonth = new Date(year, month, 0).getDate(); // total de dias do mês

    let dayOfWednesday = 1; // o contador que passará por todos os dias do mês

    thursdayDays.push(1); // todo mês irá considerar o primeiro dia como o inicío de uma semana

    // o laço que percorrera todos os dias do mês e atribuira os valores para cada array, (quarta e quinta)
    while (dayOfWednesday < totalDaysOfMonth) {
      let date = new Date(year, month - 1, dayOfWednesday, 0, 0, 0);

      if (date.getDay() === 4 && dayOfWednesday != 1) {
        // toda vez que ele detecta que é uma quarta feira ele atribui para o array o dia e proxímo para o array de quinta feira

        thursdayDays.push(dayOfWednesday + 1);
        saturdayDays.push(dayOfWednesday);

        // caso a semana não temine até o final do mês é feito o cálculo para até que dia do outro mês caira a quarta feira
        if (totalDaysOfMonth - dayOfWednesday <= 6) {
          saturdayDays.push(dayOfWednesday + 7 - totalDaysOfMonth);
        } else if (totalDaysOfMonth - dayOfWednesday == 7) {
          saturdayDays.push(totalDaysOfMonth);
        }

        dayOfWednesday++;
      } else {
        dayOfWednesday++;
      }
    }

    setDaysOfThursday(thursdayDays);
    setDaysOfSaturday(saturdayDays);
  };

  let totalOfDays = new Date(year, month, 0).getDate();

  useEffect(() => {
    generateWeekDays();
    // setMonth(currentMonth);
    api.get(`/schedulesDone/?year=${year}&dayStart=01&dayEnd=${totalOfDays}&monthStart=${month}&monthEnd=${month}`).then((resp) => {
      setSchedulesDoneList(resp.data);
    });

    api.get(`/schedulesChanges/?year=${year}&month=${month}`).then((resp) => {
      if (Object.keys(resp.data).length != 0) {
        setSchedulesChanges(resp.data);
      } else {
        setSchedulesChanges(new Map());
      }
    });
  }, [month, year]);

  if (!isLogged) {
    return (
      <>
        <Container>
          <h3 style={{ fontWeight: 500 }}>Você precisa estar logado para Acessar essa página</h3>
          <Link
            href={{
              pathname: "/",
            }}
          >
            <button className='button__back__login'>Voltar Para Login</button>
          </Link>
        </Container>
      </>
    );
  }

  const getForms = (setor: string) => {
    return api.get(`/schedulesRegistered/?year=${year}&month=${month}&setor=${setor}`).then((resp) => {
      return resp.data;
    });
  };

  const generateXLSFile = () => {
    toast.info("Gerando Arquivo...");
    axios({
      url: `https://apiescalas.localsig.com/reportXLS?month=${month}&year=${year}`, //your url
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      if (response.status === 204) {
        // dismissLoadingNotify()
        setTimeout(() => {
          notify("Não Foram encontrado escalas com esses parâmetros");
        }, 200);
        return;
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `escalaPlantãoDigital-${month}-${year}.xls`); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleGeneratePdfSchedule = async (type: any, sector: any) => {
    const schedules = await getForms(type + " - " + sector.name).then((schedules) => schedules);

    generatePdfSchedule(
      schedules,
      userInfo.nome,
      type,
      sector.name,
      month,
      year,
      observationForm,
      dismissLoadingNotify,
      notifyLoading
    ).catch(() => {
      notify("Escala não feita");
    });
  };

  const showModal = (logs) => {
    setLogs(logs);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <ToastContainer autoClose={2500} transition={Slide} />
      <Container>
        <Section>
          <MonthSelect>
            <Select
              className='react-select-container'
              styles={customStyles}
              options={[
                { value: 1, label: "Janeiro" },
                { value: 2, label: "Fevereiro" },
                { value: 3, label: "Março" },
                { value: 4, label: "Abril" },
                { value: 5, label: "Maio" },
                { value: 6, label: "Junho" },
                { value: 7, label: "Julho" },
                { value: 8, label: "Agosto" },
                { value: 9, label: "Setembro" },
                { value: 10, label: "Outubro" },
                { value: 11, label: "Novembro" },
                { value: 12, label: "Dezembro" },
              ]}
              placeholder='Mês'
              onChange={(selectedOption) => setMonth(selectedOption!.value)}
              value={{ value: month, label: new Date(0, month - 1).toLocaleString("pt-BR", { month: "long" }) }}
            />
            <Select
              className='react-select-container'
              styles={customStyles}
              options={[...Array(10)].map((_, index) => {
                const yearValue = new Date().getFullYear() - 5 + index;
                return { value: yearValue, label: yearValue.toString() };
              })}
              value={{ value: year, label: year.toString() }}
              onChange={(selectedOption) => setYear(selectedOption!.value)}
              placeholder='Ano'
            />
          </MonthSelect>

          <div>
            <ButtonGenerateXLS onClick={() => generateXLSFile()}>Gerar Arquivo .xls</ButtonGenerateXLS>
          </div>
        </Section>

        <SectionTitle>
          <h1>Relatórios Semanais</h1>
          <p>Selecione a semana que deseja gerar</p>
        </SectionTitle>

        <WeeklyReports>
          {daysOfThursday.map((day, i) => (
            <div key={i}>
              {daysOfSaturday[i] < 6 && day != 1 ? (
                <>
                  {day === 1 ? (
                    <WeeklyReportButton
                      key={i}
                      onClick={() => {
                        handleSeeWeek("", day, daysOfSaturday[i] - day + 1);
                      }}
                    >
                      <span>
                        {day < 10 ? "0" : ""}
                        {day}/{month < 10 ? "0" + month : month} - {daysOfSaturday[i] < 10 ? "0" : ""}
                        {daysOfSaturday[i]}/{month < 9 ? "0" + (month + 1) : month + 1}
                        {/* para cada dia ele irá atribuir o (0) caso seja menor que 10 */}
                      </span>
                      <GrDocumentPdf size={18} />
                    </WeeklyReportButton>
                  ) : (
                    <WeeklyReportButton key={i} onClick={() => handleSeeWeek("", day)}>
                      <span>
                        {day < 10 ? "0" : ""}
                        {day}/{month < 10 ? "0" + month : month} - {daysOfSaturday[i] < 10 ? "0" : ""}
                        {daysOfSaturday[i]}/{month < 9 ? "0" + (month + 1) : month === 12 ? "01" : month + 1}
                        {/* para cada dia ele irá atribuir o (0) caso seja menor que 10 */}
                      </span>
                      <GrDocumentPdf size={18} />
                    </WeeklyReportButton>
                  )}
                </>
              ) : (
                <>
                  {day === 1 ? (
                    <WeeklyReportButton
                      key={i}
                      onClick={() => {
                        handleSeeWeek("", day, daysOfSaturday[i] - day + 1);
                      }}
                    >
                      <span>
                        {day < 10 ? "0" : ""}
                        {day}/{month < 10 ? "0" + month : month} - {daysOfSaturday[i] < 10 ? "0" : ""}
                        {daysOfSaturday[i]}/{month < 10 ? "0" + month : month}
                        {/* para cada dia ele irá atribuir o (0) caso seja menor que 10 */}
                      </span>
                      <GrDocumentPdf size={18} />
                    </WeeklyReportButton>
                  ) : (
                    <WeeklyReportButton key={i} onClick={() => handleSeeWeek("", day)}>
                      <span>
                        {day < 10 ? "0" : ""}
                        {day}/{month < 10 ? "0" + month : month} - {daysOfSaturday[i] < 10 ? "0" : ""}
                        {daysOfSaturday[i]}/{month < 10 ? "0" + month : month}
                        {/* para cada dia ele irá atribuir o (0) caso seja menor que 10 */}
                      </span>
                      <GrDocumentPdf size={18} />
                    </WeeklyReportButton>
                  )}
                </>
              )}
            </div>
          ))}
        </WeeklyReports>

        <SectionTitle>
          <h1>Relatórios Plantão</h1>
          {/* <p>Selecione a semana que deseja gerar</p> */}
          <IconGuide>
            <ul>
              <li>
                <AiOutlineCloseCircle color='red' size={20} />
                <span>Não feita e ou integrada a outro município</span>
              </li>
              <li>
                <AiOutlineCheckCircle color='green' size={20} />
                <span>Escalas Feitas</span>
              </li>
            </ul>
          </IconGuide>
        </SectionTitle>

        <Table>
          <thead>
            <tr className='table__header'>
              <th colSpan={1}>Plantão</th>
              <th colSpan={1}>Ações</th>
              <th colSpan={1}>Escala Feita</th>
              <th colSpan={1} style={{ maxWidth: 100 }}>
                Alterações
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((sector, id) => (
              <tr
                key={id}
                style={{
                  backgroundColor: `${id % 2 === 0 ? "#dce7eb" : "#ccd9dd"}`,
                }}
              >
                <td className={sector.sector ? "type sector" : "type"}>
                  <>{sector.name}</>
                </td>
                <td className={sector.sector ? "actions sector" : "actions"}>
                  {sector.sector ? (
                    <>
                      {daysOfThursday.map((day, i) => (
                        <div key={i}>
                          {daysOfSaturday[i] < 6 && day != 1 ? (
                            <>
                              {day === 1 ? (
                                <button
                                  key={i}
                                  onClick={() => {
                                    handleSeeWeek("", day, daysOfSaturday[i] - day + 1);
                                  }}
                                >
                                  {day < 10 ? "0" : ""}
                                  {day}/{month < 10 ? "0" + month : month} - {daysOfSaturday[i] < 10 ? "0" : ""}
                                  {daysOfSaturday[i]}/{month < 9 ? "0" + (month + 1) : month + 1}
                                  {/* para cada dia ele irá atribuir o (0) caso seja menor que 10 */}
                                </button>
                              ) : (
                                <button key={i} onClick={() => handleSeeWeek(sector.name, day)}>
                                  {day < 10 ? "0" : ""}
                                  {day}/{month < 10 ? "0" + month : month} - {daysOfSaturday[i] < 10 ? "0" : ""}
                                  {daysOfSaturday[i]}/{month < 9 ? "0" + (month + 1) : month === 12 ? "01" : month + 1}
                                  {/* para cada dia ele irá atribuir o (0) caso seja menor que 10 */}
                                </button>
                              )}
                            </>
                          ) : (
                            <>
                              {day === 1 ? (
                                <button
                                  key={i}
                                  onClick={() => {
                                    handleSeeWeek(sector.name, day, daysOfSaturday[i] - day + 1);
                                  }}
                                >
                                  {day < 10 ? "0" : ""}
                                  {day}/{month < 10 ? "0" + month : month} - {daysOfSaturday[i] < 10 ? "0" : ""}
                                  {daysOfSaturday[i]}/{month < 10 ? "0" + month : month}
                                  {/* para cada dia ele irá atribuir o (0) caso seja menor que 10 */}
                                </button>
                              ) : (
                                <button key={i} onClick={() => handleSeeWeek(sector.name, day)}>
                                  {day < 10 ? "0" : ""}
                                  {day}/{month < 10 ? "0" + month : month} - {daysOfSaturday[i] < 10 ? "0" : ""}
                                  {daysOfSaturday[i]}/{month < 10 ? "0" + month : month}
                                  {/* para cada dia ele irá atribuir o (0) caso seja menor que 10 */}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {sector.name === "Transporte" ? (
                        <>
                          <ScheduleButtonsOptions>
                            <Link
                              href={{
                                pathname: "/",
                                query: {
                                  Plantao: "Transporte",
                                  Local: "",
                                  Mes: month,
                                },
                              }}
                            >
                              <button className='button__edit'>Editar</button>
                            </Link>
                            <button
                              className='visualize__schedule'
                              onClick={async () => {
                                await generatePdfSchedule(
                                  await getForms("Transporte").then((schedules) => schedules),
                                  userInfo.nome,
                                  "Transporte",
                                  "",
                                  month,
                                  year,
                                  observationForm,
                                  dismissLoadingNotify,
                                  notifyLoading
                                ).catch(() => {
                                  notify("Escala não feita");
                                });
                              }}
                            >
                              Visualizar Escala
                            </button>
                          </ScheduleButtonsOptions>
                        </>
                      ) : sector.name === "Controle_De_Perdas" ? (
                        <ScheduleButtonsOptions>
                          <Link
                            href={{
                              pathname: "/",
                              query: {
                                Plantao: "Controle De Perdas",
                                Local: "",
                                Mes: month,
                              },
                            }}
                          >
                            <button className='button__edit'>Editar</button>
                          </Link>
                          <button
                            className='visualize__schedule'
                            onClick={async () => {
                              await generatePdfSchedule(
                                await getForms("Controle De Perdas").then((schedules) => schedules),
                                userInfo.nome,
                                "Controle De Perdas",
                                "",
                                month,
                                year,
                                observationForm,
                                dismissLoadingNotify,
                                notifyLoading
                              ).catch(() => {
                                notify("Escala não feita");
                              });
                            }}
                          >
                            Visualizar Escala
                          </button>
                        </ScheduleButtonsOptions>
                      ) : sector.manutencao === true ? (
                        <>
                          <ScheduleButtonsOptions>
                            <Link
                              href={{
                                pathname: "/",
                                query: {
                                  Plantao: "Manutenção",
                                  Local: sector.name,
                                  Mes: month,
                                },
                              }}
                            >
                              <button className='button__edit'>Editar</button>
                            </Link>
                            <button
                              className='visualize__schedule'
                              onClick={async () => {
                                await generatePdfSchedule(
                                  await getForms("Manutenção - " + sector.name).then((schedules) => schedules),
                                  userInfo.nome,
                                  "Manutenção",
                                  sector.name,
                                  month,
                                  year,
                                  observationForm,
                                  dismissLoadingNotify,
                                  notifyLoading
                                ).catch(() => {
                                  notify("Escala não feita");
                                });
                              }}
                            >
                              Visualizar Escala
                            </button>
                          </ScheduleButtonsOptions>
                        </>
                      ) : sector.name === "Operacional" ? null : sector.name === "ETA" ? null : (
                        <>
                          <div style={{ display: "flex", position: "relative" }}>
                            <Link
                              href={{
                                pathname: "/",
                                query: {
                                  Plantao: "ETA",
                                  Local: sector.name,
                                  Mes: month,
                                },
                              }}
                            >
                              <button className='button__edit'>Editar ETA</button>
                            </Link>
                            <Link
                              href={{
                                pathname: "/",
                                query: {
                                  Plantao: "Operacional",
                                  Local: sector.name,
                                  Mes: month,
                                },
                              }}
                            >
                              <button className='button__edit'>Editar Operacional</button>
                            </Link>
                            <SelectVisualizeReport zIndex={id} handleGeneratePdfSchedule={handleGeneratePdfSchedule} sector={sector} />
                          </div>
                        </>
                      )}
                    </>
                  )}
                  {/* <button
                    onClick={() => handleSeeMonth(sector.name)}
                    className="button__view__Month"
                  >
                    Visualizar Mensal
                  </button> */}
                  {/* {month === currentMonth ? (
                    <button
                      className="button__view__Week"
                      onClick={() => handleSeeWeek(sector.name)}
                    >
                      Visualizar Semana Atual
                    </button>
                  ) : (
                    <button disabled className="button__view__Week disable">
                      Visualizar Semana Atual
                    </button>
                  )} */}
                </td>
                {sector.sector === true ? (
                  <>
                    <td className={sector.sector ? "type sector" : "type"}></td>
                    <td className={sector.sector ? "type sector" : "type"}></td>
                  </>
                ) : (
                  <>
                    {sector.name === "Pariquera-Açu" ? (
                      <>
                        <td className='col__schedule__done' style={{ fontSize: 16 }}>
                          <div>
                            <span>Oper: </span>
                            {schedulesDoneList[sector.name.replaceAll("-", "_")]?.Operacional === true ? (
                              <AiOutlineCheckCircle color='green' size={20} />
                            ) : schedulesDoneList[sector.name.replaceAll("-", "_")]?.Operacional === null ? (
                              <AiOutlineLoading3Quarters style={{ animation: "rotate 1.5s linear infinite" }} color='#527c9e' size={21} />
                            ) : (
                              <AiOutlineCloseCircle color='red' size={20} />
                            )}
                          </div>
                          <div>
                            <span>ETA: </span>
                            {schedulesDoneList[sector.name.replaceAll("-", "_")]?.ETA === true ? (
                              <AiOutlineCheckCircle color='green' size={20} />
                            ) : schedulesDoneList[sector.name.replaceAll("-", "_")]?.ETA === null ? (
                              <AiOutlineLoading3Quarters style={{ animation: "rotate 1.5s linear infinite" }} color='#527c9e' size={21} />
                            ) : (
                              <AiOutlineCloseCircle color='red' size={20} />
                            )}
                          </div>
                        </td>
                        <td>
                          <Button
                            style={{ margin: 0 }}
                            onClick={() => {
                              const operacionalReports = schedulesChanges["Operacional - " + sector.name]?.reports || [];
                              const etaReports = schedulesChanges["ETA - " + sector.name]?.reports || [];

                              const allReports = [...operacionalReports, ...etaReports];

                              showModal(
                                allReports.map((report: any, i: any) => (
                                  <p key={i}>
                                    nº {report.n_responsavel}
                                    {` - `}
                                    {new Date(report.data).getUTCDate()}/
                                    {new Date(report.data).getMonth() + 1 < 10
                                      ? "0" + (new Date(report.data).getMonth() + 1)
                                      : new Date(report.data).getMonth() + 1}
                                    {` : `}
                                    {new Date(report.hora).getHours() + 3}:{new Date(report.hora).getMinutes()}hr (
                                    {report.setor.split(" - ")[0] === "Operacional" ? "Oper" : "ETA"})
                                  </p>
                                ))
                              );
                            }}
                          >
                            <AiOutlineFileSearch color='#aeaeae' size={30} />
                          </Button>
                        </td>
                        {/* <td className='col__schedule__alterations'>
                          <>
                            <div className='reportChange'>
                              {schedulesChanges["Operacional - " + sector.name]?.reports?.map((report: any, i: any) => (
                                <p key={i}>
                                  nº {report.n_responsavel}
                                  {` - `}
                                  {new Date(report.data).getUTCDate()}/
                                  {new Date(report.data).getMonth() + 1 < 10
                                    ? "0" + (new Date(report.data).getMonth() + 1)
                                    : new Date(report.data).getMonth() + 1}
                                  {` : `}
                                  {new Date(report.hora).getHours() + 3}:{new Date(report.hora).getMinutes()}hr (
                                  {report.setor.split(" - ")[0] === "Operacional" ? "Oper" : "ETA"})
                                </p>
                              ))}
                              {schedulesChanges["ETA - " + sector.name]?.reports?.map((report: any, i: any) => (
                                <p key={i}>
                                  nº {report.n_responsavel}
                                  {` - `}
                                  {new Date(report.data).getUTCDate()}/
                                  {new Date(report.data).getMonth() + 1 < 10
                                    ? "0" + (new Date(report.data).getMonth() + 1)
                                    : new Date(report.data).getMonth() + 1}
                                  {` : `}
                                  {new Date(report.hora).getHours() + 3}:{new Date(report.hora).getMinutes()}hr (
                                  {report.setor.split(" - ")[0] === "Operacional" ? "Oper" : "ETA"})
                                </p>
                              ))}
                            </div>
                          </>
                        </td> */}
                      </>
                    ) : (
                      <>
                        {sector.manutencao === true ? (
                          <>
                            <td
                              className='col__schedule__done'
                              style={{
                                fontSize: 16,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div>
                                {schedulesDoneList["Manutenção_" + sector.name.replaceAll(" ", "_").replaceAll("_/_", "_")]?.done ===
                                true ? (
                                  <AiOutlineCheckCircle className='rotating' id='rotate' color='green' size={24} />
                                ) : schedulesDoneList["Manutenção_" + sector.name.replaceAll(" ", "_").replaceAll("_/_", "_")]?.done ===
                                  null ? (
                                  <AiOutlineLoading3Quarters
                                    style={{ animation: "rotate 1.5s linear infinite" }}
                                    color='#527c9e'
                                    size={21}
                                  />
                                ) : (
                                  <AiOutlineCloseCircle color='red' size={24} />
                                )}
                              </div>
                            </td>
                            <td>
                              <Button
                                style={{ margin: 0 }}
                                onClick={() =>
                                  showModal(
                                    schedulesChanges["Manutenção - " + sector.name]?.reports?.map((report: any, i: any) => (
                                      <p key={i}>
                                        nº {report.n_responsavel}
                                        {` - `}
                                        {new Date(report.data).getUTCDate()}/
                                        {new Date(report.data).getMonth() + 1 < 10
                                          ? "0" + (new Date(report.data).getMonth() + 1)
                                          : new Date(report.data).getMonth() + 1}
                                        {` : `}
                                        {new Date(report.hora).getHours() + 3}:{new Date(report.hora).getMinutes()}hr
                                      </p>
                                    ))
                                  )
                                }
                              >
                                <AiOutlineFileSearch color='#aeaeae' size={30} />
                              </Button>
                            </td>
                            {/* <td className='col__schedule__alterations'>
                              <>
                                <div className='reportChange'>
                                  {schedulesChanges["Manutenção - " + sector.name]?.reports?.map((report: any, i: any) => (
                                    <p key={i}>
                                      nº {report.n_responsavel}
                                      {` - `}
                                      {new Date(report.data).getUTCDate()}/
                                      {new Date(report.data).getMonth() + 1 < 10
                                        ? "0" + (new Date(report.data).getMonth() + 1)
                                        : new Date(report.data).getMonth() + 1}
                                      {` : `}
                                      {new Date(report.hora).getHours() + 3}:{new Date(report.hora).getMinutes()}hr
                                    </p>
                                  ))}
                                </div>
                              </>
                            </td> */}
                          </>
                        ) : (
                          <>
                            {sector.name != "Operacional" && sector.name != "ETA" ? (
                              <>
                                {sector.name === "Transporte" ? (
                                  <>
                                    <td
                                      className='col__schedule__done'
                                      style={{
                                        fontSize: 16,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div>
                                        {schedulesDoneList[sector.name].done === true ? (
                                          <AiOutlineCheckCircle color='green' size={24} />
                                        ) : schedulesDoneList[sector.name].done === null ? (
                                          <AiOutlineLoading3Quarters
                                            style={{ animation: "rotate 1.5s linear infinite" }}
                                            color='#527c9e'
                                            size={21}
                                          />
                                        ) : (
                                          <AiOutlineCloseCircle color='red' size={24} />
                                        )}
                                      </div>
                                    </td>
                                    <td>
                                      <Button
                                        style={{ margin: 0 }}
                                        onClick={() =>
                                          showModal(
                                            schedulesChanges["Transporte"]?.reports?.map((report: any, i: any) => (
                                              <p key={i}>
                                                nº {report.n_responsavel}
                                                {` - `}
                                                {new Date(report.data).getUTCDate()}/
                                                {new Date(report.data).getMonth() + 1 < 10
                                                  ? "0" + (new Date(report.data).getMonth() + 1)
                                                  : new Date(report.data).getMonth() + 1}
                                                {` : `}
                                                {new Date(report.hora).getHours() + 3}:{new Date(report.hora).getMinutes()}
                                                hr
                                              </p>
                                            ))
                                          )
                                        }
                                      >
                                        <AiOutlineFileSearch color='#aeaeae' size={30} />
                                      </Button>
                                    </td>
                                    {/* <td className='col__schedule__alterations'>
                                      <>
                                        <div className='reportChange'>
                                          {schedulesChanges["Transporte"]?.reports?.map((report: any, i: any) => (
                                            <p key={i}>
                                              nº {report.n_responsavel}
                                              {` - `}
                                              {new Date(report.data).getUTCDate()}/
                                              {new Date(report.data).getMonth() + 1 < 10
                                                ? "0" + (new Date(report.data).getMonth() + 1)
                                                : new Date(report.data).getMonth() + 1}
                                              {` : `}
                                              {new Date(report.hora).getHours() + 3}:{new Date(report.hora).getMinutes()}
                                              hr
                                            </p>
                                          ))}
                                        </div>
                                      </>
                                    </td> */}
                                  </>
                                ) : sector.name === "Controle_De_Perdas" ? (
                                  <>
                                    <td
                                      className='col__schedule__done'
                                      style={{
                                        fontSize: 16,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div>
                                        {schedulesDoneList[sector.name]?.done === true ? (
                                          <AiOutlineCheckCircle color='green' size={24} />
                                        ) : schedulesDoneList[sector.name].done === null ? (
                                          <AiOutlineLoading3Quarters
                                            style={{ animation: "rotate 1.5s linear infinite" }}
                                            color='#527c9e'
                                            size={21}
                                          />
                                        ) : (
                                          <AiOutlineCloseCircle color='red' size={24} />
                                        )}
                                      </div>
                                    </td>
                                    <td>
                                      <Button
                                        style={{ margin: 0 }}
                                        onClick={() =>
                                          showModal(
                                            schedulesChanges["Controle De Perdas"]?.reports?.map((report: any, i: any) => (
                                              <p key={i}>
                                                nº {report.n_responsavel}
                                                {` - `}
                                                {new Date(report.data).getUTCDate()}/
                                                {new Date(report.data).getMonth() + 1 < 10
                                                  ? "0" + (new Date(report.data).getMonth() + 1)
                                                  : new Date(report.data).getMonth() + 1}
                                                {` : `}
                                                {new Date(report.hora).getHours() + 3}:{new Date(report.hora).getMinutes()}
                                                hr
                                              </p>
                                            ))
                                          )
                                        }
                                      >
                                        <AiOutlineFileSearch color='#aeaeae' size={30} />
                                      </Button>
                                    </td>
                                    {/* <td className='col__schedule__alterations'>
                                      <>
                                        <div className='reportChange'>
                                          {schedulesChanges["Controle De Perdas"]?.reports?.map((report: any, i: any) => (
                                            <p key={i}>
                                              nº {report.n_responsavel}
                                              {` - `}
                                              {new Date(report.data).getUTCDate()}/
                                              {new Date(report.data).getMonth() + 1 < 10
                                                ? "0" + (new Date(report.data).getMonth() + 1)
                                                : new Date(report.data).getMonth() + 1}
                                              {` : `}
                                              {new Date(report.hora).getHours() + 3}:{new Date(report.hora).getMinutes()}
                                              hr
                                            </p>
                                          ))}
                                        </div>
                                      </>
                                    </td> */}
                                  </>
                                ) : (
                                  <>
                                    <td className='col__schedule__done' style={{ fontSize: 16 }}>
                                      <div>
                                        <span>Oper: </span>
                                        {schedulesDoneList[sector.name.replaceAll(" ", "_").replaceAll("_/_", "_")]?.Operacional ===
                                        true ? (
                                          <AiOutlineCheckCircle color='green' size={20} />
                                        ) : schedulesDoneList[sector.name.replaceAll(" ", "_").replaceAll("_/_", "_")]?.Operacional ===
                                          null ? (
                                          <AiOutlineLoading3Quarters
                                            style={{ animation: "rotate 1.5s linear infinite" }}
                                            color='#527c9e'
                                            size={21}
                                          />
                                        ) : (
                                          <AiOutlineCloseCircle color='red' size={20} />
                                        )}
                                      </div>
                                      <div>
                                        <span>ETA: </span>
                                        {schedulesDoneList[sector.name.replaceAll(" ", "_").replaceAll("_/_", "_")]?.ETA === true ? (
                                          <AiOutlineCheckCircle color='green' size={20} />
                                        ) : schedulesDoneList[sector.name.replaceAll(" ", "_").replaceAll("_/_", "_")]?.ETA === null ? (
                                          <AiOutlineLoading3Quarters
                                            style={{ animation: "rotate 1.5s linear infinite" }}
                                            color='#527c9e'
                                            size={21}
                                          />
                                        ) : (
                                          <AiOutlineCloseCircle color='red' size={20} />
                                        )}
                                      </div>
                                    </td>
                                    <td>
                                      <Button
                                        style={{ margin: 0 }}
                                        onClick={() => {
                                          const operacionalReports = schedulesChanges["Operacional - " + sector.name]?.reports || [];
                                          const etaReports = schedulesChanges["ETA - " + sector.name]?.reports || [];

                                          const allReports = [...operacionalReports, ...etaReports];

                                          showModal(
                                            allReports.map((report: any, i: any) => (
                                              <p key={i}>
                                                nº {report.n_responsavel}
                                                {` - `}
                                                {new Date(report.data).getUTCDate()}/
                                                {(new Date(report.data).getMonth() + 1).toString().padStart(2, "0")}
                                                {` : `}
                                                {new Date(report.hora).getHours() + 3}:{new Date(report.hora).getMinutes()}hr (
                                                {report.setor.split(" - ")[0] === "Operacional" ? "Oper" : "ETA"})
                                              </p>
                                            ))
                                          );
                                        }}
                                      >
                                        <AiOutlineFileSearch color='#aeaeae' size={30} />
                                      </Button>
                                    </td>
                                    {/* <td className='col__schedule__alterations'>
                                      <>
                                        <div className='reportChange'>
                                          {schedulesChanges["Operacional - " + sector.name]?.reports?.map((report: any, i: any) => (
                                            <p key={i}>
                                              nº {report.n_responsavel}
                                              {` - `}
                                              {new Date(report.data).getUTCDate()}/
                                              {new Date(report.data).getMonth() + 1 < 10
                                                ? "0" + (new Date(report.data).getMonth() + 1)
                                                : new Date(report.data).getMonth() + 1}
                                              {` : `}
                                              {new Date(report.hora).getHours() + 3}:{new Date(report.hora).getMinutes()}
                                              hr ({report.setor.split(" - ")[0] === "Operacional" ? "Oper" : "ETA"})
                                            </p>
                                          ))}
                                          {schedulesChanges["ETA - " + sector.name]?.reports?.map((report: any, i: any) => (
                                            <p key={i}>
                                              nº {report.n_responsavel}
                                              {` - `}
                                              {new Date(report.data).getUTCDate()}/
                                              {new Date(report.data).getMonth() + 1 < 10
                                                ? "0" + (new Date(report.data).getMonth() + 1)
                                                : new Date(report.data).getMonth() + 1}
                                              {` : `}
                                              {new Date(report.hora).getHours() + 3}:{new Date(report.hora).getMinutes()}
                                              hr ({report.setor.split(" - ")[0] === "Operacional" ? "Oper" : "ETA"})
                                            </p>
                                          ))}
                                        </div>
                                      </>
                                    </td> */}
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <td className='col__schedule__done' style={{ textAlign: "center" }}>
                                  <p></p>
                                </td>
                                <td className='col__schedule__alterations'>
                                  <h3></h3>
                                </td>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal open={isModalVisible} onClose={handleCancel} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
          <Box sx={style}>
            <Typography id='modal-modal-title' style={{ fontSize: 18 }}>
              Logs De Alterações
            </Typography>
            <AlterationsLogs>
              {logs?.map((log, index) => (
                <li key={index} style={{ backgroundColor: `${index % 2 === 0 ? "#dce7eb" : "#ccd9dd"}` }}>
                  {log}
                </li>
              ))}
            </AlterationsLogs>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
};

export default Historic;
