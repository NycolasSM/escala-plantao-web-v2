import Calendar from "@/components/Calendar";
import { Filters } from "@/components/Header/styles";
import ScheduleTable from "@/components/ScheduleTable";
import { FlexContainer, Column, BoxContainer, Container, SectionTitle, Header, Buttons, CreateSchedule } from "@/styles/pages/schedules";
import React from "react";
import Select from "react-select";
import BatchCreateSchedule from "@/components/BatchCreateSchedule";
import { ScheduleProvider } from "@/context/ScheduleContext";
import AvailableSchedulesContext from "@/context/AvailableSchedulesContext";

const Schedules = () => {
  const { year, setYear, monthNumber, setMonthNumber, setLocalChosen, setPlantaoChosen, availableDays, availableDaysData } = React.useContext(AvailableSchedulesContext);

  const plantaoOptions = [
    { value: "Operacional", label: "Operacional" },
    { value: "ETA", label: "ETA" },
    { value: "Transporte", label: "Transporte" },
    { value: "Manutenção", label: "Manutenção" },
    { value: "Controle De Perdas", label: "Controle De Perdas" },
  ];

  const localOptions = [
    { value: "Apiaí", label: "Apiaí" },
    { value: "Barra do Chapéu", label: "Barra do Chapéu" },
    { value: "São Lourenço", label: "São Lourenço" },
    { value: "Juquitiba", label: "Juquitiba" },
    { value: "Registro / Sete Barras", label: "Registro / Sete Barras" },
    { value: "Registro", label: "Registro" },
    { value: "Sete Barras", label: "Sete Barras" },
    { value: "Barra do Turvo", label: "Barra do Turvo" },
    { value: "Cajati", label: "Cajati" },
    { value: "Cajati / Jacupiranga", label: "Cajati / Jacupiranga" },
    { value: "Eldorado", label: "Eldorado" },
    { value: "Iporanga", label: "Iporanga" },
    { value: "Jacupiranga", label: "Jacupiranga" },
    { value: "Cananéia", label: "Cananéia" },
    { value: "Iguape", label: "Iguape" },
    { value: "Iguape / Ilha Comprida", label: "Iguape / Ilha Comprida" },
    { value: "Ilha Comprida", label: "Ilha Comprida" },
    { value: "Ilha Comprida / Pedrinhas", label: "Ilha Comprida / Pedrinhas" },
    { value: "Pariquera-Açu", label: "Pariquera-Açu" },
    { value: "Itariri", label: "Itariri" },
    { value: "Juquiá", label: "Juquiá" },
    { value: "Miracatu", label: "Miracatu" },
    { value: "Pedro de Toledo", label: "Pedro de Toledo" },
    { value: "Tapiraí", label: "Tapiraí" },
    { value: "Itaoca", label: "Itaoca" },
    { value: "Itapirapuã Paulista", label: "Itapirapuã Paulista" },
    { value: "Ribeira", label: "Ribeira" },
    { value: "Ribeira / Itapirapuã Paulista", label: "Ribeira / Itapirapuã Paulista" },
  ];

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

  return (
    <ScheduleProvider>
      <Container>
        <Header>
          <Filters>
            <Select
              className='react-select-container'
              styles={customStyles}
              options={plantaoOptions}
              placeholder='Plantão'
              onChange={(e) => setPlantaoChosen(e?.value || '')}
            />
            <Select
              className='react-select-container'
              styles={customStyles}
              options={localOptions}
              placeholder='Local'
              onChange={(e) => setLocalChosen(e?.value || '')}
            />
          </Filters>
          <Buttons>
            <button>Visualizar Escala</button>
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
    </ScheduleProvider>
  );
};

export default Schedules;
