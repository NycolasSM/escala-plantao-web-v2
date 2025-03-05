// @ts-nocheck

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Title, Container, Table, Section, MonthSelect, IconGuide, ButtonGenerateXLS } from "../../styles/pages/historic";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";

// Icons
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineLoading3Quarters } from "react-icons/ai";

// Services
import { generatePdfSchedule } from "../services/generatePdfSchedule";

import Header from "../components/Header";
import { useAuthContext } from "../context/AuthContext";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { data } from "../data/sectorsData";
import { generatePdfGeneralHistoric } from "../services/generatePdfGeneralHistoric";
import Link from "next/link";
import { api } from "../services/api";
import FormContext from "../context/formContext";
import AvailableSchedulesContext from "../context/availableSchedulesContext";
import axios from "axios";
import { SelectVisualizeReport } from "../components/SelectVisualizeReport";
import Router from "next/router";

const HistoricoCCO = () => {
  const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false);
  const { userInfo } = useAuthContext();
  const { loadedForms, registers, setRegisters } = useContext(FormContext);
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

  const handleSeeMonth = async (sector: string) => {
    try {
      await generatePdfGeneralHistoric(sector, 1, 31, month, month, year, dismissLoadingNotify, notifyLoading);
    } catch (err: any) {
      if (err.message === "Cannot read properties of undefined (reading 'push')") {
        notify("Erro Interno (município) Tente novamente em alguns minutos");
      } else {
        notify("Não Foram encontrado escalas com esses parâmetros");
      }
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
        {/* <Header
          //openMenuMobile={openMenuMobile}
          setOpenMenuMobile={setOpenMenuMobile}
        /> */}
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

  return (
    <>
      <Header
        //openMenuMobile={openMenuMobile}
        setOpenMenuMobile={setOpenMenuMobile}
      />
      <ToastContainer autoClose={2500} transition={Slide} />
      <Container>
        <Section>
          {/* <VisualizeAll>
            <h3>Visualização Geral</h3>
            <div>
              <button onClick={() => handleSeeMonth("")}>
                Visualizar Mensal
              </button>
              {month === currentMonth ? (
                <button
                  className="button__view__Week"
                  onClick={() => handleSeeWeek("")}
                >
                  Visualizar Semanal
                </button>
              ) : (
                <button disabled className="button__view__Week disable">
                  Visualizar Semanal
                </button>
              )}
            </div>
          </VisualizeAll> */}

          <div>
            <ButtonGenerateXLS onClick={() => generateXLSFile()}>Gerar Arquivo .xls</ButtonGenerateXLS>
          </div>

          <Title>Histórico de Escalas</Title>
          <MonthSelect>
            <h4>Mês / Ano:</h4>
            <div>
              <button onClick={() => handleIncrementMonth()}>
                <IoIosArrowUp />
              </button>
              <span className='month'>{("0" + month).slice(-2)}</span>
              <button onClick={() => handleDecrementMonth()}>
                <IoIosArrowDown />
              </button>
            </div>
            <span>/</span>
            <div>
              <button onClick={() => setYear(year + 1)}>
                {" "}
                <IoIosArrowUp />
              </button>
              <span className='year'>{year}</span>
              <button onClick={() => setYear(year - 1)}>
                {" "}
                <IoIosArrowDown />
              </button>
            </div>
          </MonthSelect>
        </Section>
        <Table>
          <thead>
            <tr className='table__header'>
              <th colSpan={2}>Visualização Semanal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Semana</td>
              <td className='weeks'>
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
                          <button key={i} onClick={() => handleSeeWeek("", day)}>
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
                              handleSeeWeek("", day, daysOfSaturday[i] - day + 1);
                            }}
                          >
                            {day < 10 ? "0" : ""}
                            {day}/{month < 10 ? "0" + month : month} - {daysOfSaturday[i] < 10 ? "0" : ""}
                            {daysOfSaturday[i]}/{month < 10 ? "0" + month : month}
                            {/* para cada dia ele irá atribuir o (0) caso seja menor que 10 */}
                          </button>
                        ) : (
                          <button key={i} onClick={() => handleSeeWeek("", day)}>
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
              </td>
            </tr>
          </tbody>
        </Table>
        <br />
        <br />
        <br />
        <br />
      </Container>
    </>
  );
};

export default HistoricoCCO;
