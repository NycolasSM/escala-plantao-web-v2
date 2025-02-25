import { useContext, useEffect, useState } from "react";
import GlobalStyle from "../../../styles/globals";
import Calendar from "../../components/Calendar";
import ScheduleTable from "../../components/ScheduleTable";
import {
  Buttons,
  Section,
  FormSendMessage,
  HomeContainer,
  FlexContainer,
  Column,
  BoxContainer,
  Container,
  SectionTitle,
  Header,
} from "../../../styles/pages/dashboard";
import TableOptions from "../../components/TableOptions";
import AvailableSchedulesContext from "../../context/availableSchedulesContext.tsx";
import FormContext from "../../context/formContext";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { generatePdfSchedule } from "../../services/generatePdfSchedule";
import { generatePdfGeneral } from "../../services/generatePdfGeneral";
import { generatePdfGeneralMaintenance } from "../../services/generatePdfGeneralMaintenance";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { EmptyFieldError, LoadingContainer } from "./styles";

import { Filters } from "../../components/Header/styles";
import Select from "react-select";
import BatchCreateSchedule from "../../components/BatchCreateSchedule";
import { BiError } from "react-icons/bi";
import { localOptions, permissoes } from "./mocked.ts";
import { Slide, ToastContainer } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

type SectorOptionType = {
  setor: string;
  local: string;
};

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

const Dashboard = () => {
  const { loadedForms } = useContext(FormContext);
  const { plantaoChosen, localChosen, monthNumber, year, observationForm } = useContext(AvailableSchedulesContext);
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

  const { userInfo } = useAuthContext();

  const [isEmptyGeneralForms, setIsEmptyGeneralForms] = useState<boolean>(false);

  useEffect(() => {
    setIsEmptyGeneralForms(false);
  }, [monthNumber, year, localChosen, plantaoChosen]);

  const toastId = React.useRef(null);
  const notify = (text: string) => toast.warn(text);
  const notifyLoading = () => toast.info("Gerando Relatório..", { autoClose: false });
  const dismissLoadingNotify = () => toast.dismiss(toastId.current!);

  return (
    <Container>
      <Header>
        <TableOptions />
        <Buttons>
          <button
            onClick={() => {
              if (!localChosen || !plantaoChosen) {
                notify("Selecione o local e o plantão");
                return;
              }
              generatePdfSchedule(
                loadedForms,
                userInfo.nome,
                plantaoChosen,
                localChosen,
                monthNumber,
                year,
                observationForm,
                dismissLoadingNotify,
                notifyLoading
              );
            }}
          >
            Visualizar Escala
          </button>
        </Buttons>
      </Header>
      <FlexContainer>
        <Column>
          <BoxContainer style={{ padding: "0px" }}>
            <ScheduleTable />
          </BoxContainer>
        </Column>
        <Column style={{ maxWidth: 400 }}>
          <BoxContainer style={{ minHeight: "200px", padding: "0", alignItems: "center", justifyContent: "center" }}>
            <Calendar />
          </BoxContainer>
          <BoxContainer>
            <SectionTitle>Criar Escala em Lote</SectionTitle>
            <BatchCreateSchedule />
          </BoxContainer>
        </Column>
      </FlexContainer>
    </Container>
  );

  return (
    <HomeContainer>
      {/* <TableOptions /> */}
      <Section>
        <Calendar />
      </Section>
      <ScheduleTable />
      <Buttons>
        {/* TODO precisa confirmar se é para desativa o botão da manutenção */}
        {plantaoChosen != "Manutenção2" ? (
          <>
            {loadedForms.length != 0 ? (
              <button
                onClick={() => {
                  generatePdfSchedule(
                    loadedForms,
                    userInfo.nome,
                    plantaoChosen,
                    localChosen,
                    monthNumber,
                    year,
                    observationForm,
                    dismissLoadingNotify,
                    notifyLoading
                  );
                }}
                style={{ margin: "0 60px 0 0" }}
              >
                Visualizar Escala
              </button>
            ) : (
              <button className='disable' disabled style={{ margin: "0 60px 0 0" }}>
                Visualizar Escala
              </button>
            )}
          </>
        ) : (
          <>
            {loadedForms.length != 0 ? (
              <>
                <button
                  onClick={() => {
                    generatePdfSchedule(
                      loadedForms,
                      userInfo.nome,
                      plantaoChosen,
                      localChosen,
                      monthNumber,
                      year,
                      observationForm,
                      dismissLoadingNotify,
                      notifyLoading
                    );
                  }}
                  style={{ margin: "0 60px 0 0" }}
                >
                  Visualizar Escala
                </button>
                <button
                  onClick={async () => {
                    (await generatePdfGeneralMaintenance(plantaoChosen, monthNumber, year)) === false
                      ? setIsEmptyGeneralForms(true)
                      : setIsEmptyGeneralForms(false);
                  }}
                  style={{ margin: "0 60px 0 0" }}
                  className='general__report'
                >
                  Relatório Manutenção
                </button>
              </>
            ) : (
              <>
                <button className='disable' disabled style={{ margin: "0 80px 0 0" }}>
                  Visualizar Escala
                </button>
                <button className='disable' disabled style={{ margin: "0 80px 0 0", backgroundColor: "#79ca9e" }}>
                  Relatório Manutenção
                </button>
              </>
            )}

            <span style={{ alignSelf: "center" }}>{isEmptyGeneralForms ? "Sem escalas registradas" : ""}</span>
          </>
        )}
      </Buttons>
    </HomeContainer>
  );
};

export default Dashboard;
