import Calendar from "@/components/Calendar";
import { Filters } from "@/components/Header/styles";
import ScheduleTable from "@/components/ScheduleTable";
import { FlexContainer, Column, BoxContainer, Container, SectionTitle, Header, Buttons, CreateSchedule } from "@/styles/pages/schedules";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import BatchCreateSchedule from "@/components/BatchCreateSchedule";
import { ScheduleProvider } from "@/context/ScheduleContext";
import AvailableSchedulesContext from "@/context/AvailableSchedulesContext";
import { BiError } from "react-icons/bi";
import FormContext from "@/context/formContext";
import { EmptyFieldError, LoadingContainer } from "./styles";
import { localOptions, permissoes } from "./mocked";
import { useRouter } from "next/router";
import { Slide, ToastContainer } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";

type selectedOption = {
  plantaoSelected: string;
  localSelected: string;
};

const Schedules = () => {
  const { plantaoAvailable, plantaoChosen, localChosen, setPlantaoChosen, setLocalChosen, setAvailableDaysData, setMonthNumber } =
    React.useContext(AvailableSchedulesContext);

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

  const router = useRouter();

  const [selectedOptions, setSelectedOptions] = useState<selectedOption>({
    plantaoSelected: "",
    localSelected: "",
  });

  const plantaoOptions = plantaoAvailable?.map((plantao) => {
    return {
      value: plantao,
      label: plantao,
    };
  });

  const localOptions = permissoes.has(selectedOptions.plantaoSelected)
    ? permissoes
        .get(selectedOptions.plantaoSelected)!
        .sort()
        .map((local: string) => {
          return {
            value: local,
            label: local,
          };
        })
    : [];

  const [showLocationOptions, setShowLocationOptions] = useState<boolean>(false);

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

  function handleChangeSetor(plantao: string) {
    setPlantaoChosen(plantao);
    setSelectedOptions({ ...selectedOptions, ["plantaoSelected"]: plantao });

    if (plantao === "Transporte" || plantao === "Controle De Perdas") {
      setLocalChosen("");
      setSelectedOptions({
        plantaoSelected: plantao,
        localSelected: "",
      });
      setShowLocationOptions(false);
      setHaveEmptyField(false);
    } else {
      setHaveEmptyField(false);
      setShowLocationOptions(true);
    }
    if (localChosen != "") {
      setIsLoadingRegisters(true);
    }
  }

  useEffect(() => {
    setIsLoadingRegisters(true);
    setPlantaoChosen(selectedOptions.plantaoSelected);
    setLocalChosen(selectedOptions.localSelected);
    // window.history.pushState({}, document.title, "/" + "");
    if (router.query.Plantao != undefined) {
      setIsLoadingRegisters(true);

      setSelectedOptions({
        plantaoSelected: router.query.Plantao as string,
        localSelected: router.query.Local as string,
      });

      setPlantaoChosen(router.query.Plantao as string);
      setLocalChosen(router.query.Local as string);

      if (router.query.Mes != undefined) {
        setMonthNumber(parseInt(router.query.Mes as string));
      }
    }
  }, []);

  const handleChangeLocal = (local: string) => {
    setIsLoadingRegisters(true);
    setPlantaoChosen(selectedOptions.plantaoSelected);
    setLocalChosen(local);
    setSelectedOptions({ ...selectedOptions, ["localSelected"]: local });
  };

  return (
    <ScheduleProvider>
      {haveEmptyField ? (
        <EmptyFieldError>
          <BiError size={24} />
          <span>Existem campos vazios a serem preenchidos</span>
        </EmptyFieldError>
      ) : null}
      <Container>
        <Header>
          <Filters>
            <Select
              className='react-select-container'
              styles={customStyles}
              options={plantaoOptions}
              placeholder='Plantão'
              onChange={(e) => handleChangeSetor(e?.value || "")}
            />
            {showLocationOptions && (
              <Select
                className='react-select-container'
                styles={customStyles}
                options={localOptions}
                placeholder='Local'
                onChange={(e) => handleChangeLocal(e?.value || "")}
              />
            )}
          </Filters>
          <Buttons>
            <button>Visualizar Escala</button>
          </Buttons>
        </Header>
        <FlexContainer>
          <Column>
            <BoxContainer style={{ padding: "0px" }}>
              {isLoadingRegisters ? (
                <Container>
                  <ToastContainer autoClose={2500} transition={Slide} />
                  <Header />
                  <LoadingContainer>
                    <TailSpin height='100' width='100' color='#2faee0a2' ariaLabel='loading' />;
                  </LoadingContainer>
                </Container>
              ) : (
                <ScheduleTable />
              )}
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
    </ScheduleProvider>
  );
};

export default Schedules;
