import Calendar from "@/components/Calendar";
import { Filters } from "@/components/Header/styles";
import ScheduleTable from "@/components/ScheduleTable";
import { FlexContainer, Column, BoxContainer, Container, SectionTitle, Header, Buttons, CreateSchedule } from "@/styles/pages/schedules";
import React from "react";
import Select from "react-select";

const History = () => {

  const monthOptions = [
    { value: "Janeiro", label: "Janeiro" },
    { value: "Fevereiro", label: "Fevereiro" },
    { value: "Março", label: "Março" },
    { value: "Abril", label: "Abril" },
    { value: "Maio", label: "Maio" },
    { value: "Junho", label: "Junho" },
    { value: "Julho", label: "Julho" },
    { value: "Agosto", label: "Agosto" },
    { value: "Setembro", label: "Setembro" },
    { value: "Outubro", label: "Outubro" },
    { value: "Novembro", label: "Novembro" },
    { value: "Dezembro", label: "Dezembro" }
  ];

  const yearOptions = [
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
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
    <Container>
      <Header>
        <Filters>
          <Select className='react-select-container' styles={customStyles} options={monthOptions} placeholder='Mês' />
          <Select className='react-select-container' styles={customStyles} options={yearOptions} placeholder='Ano' />
        </Filters>
        <Buttons>
          <button>Gerar Arquivo .xls</button>
        </Buttons>
      </Header>
      <FlexContainer>
        <Column>
          <BoxContainer style={{ padding: "0px" }}>
            <div style={{ height: 200 }}></div>
            {/* <ScheduleTable /> */}
          </BoxContainer>
        </Column>
        {/* <Column style={{ maxWidth: 400 }}>
          <BoxContainer style={{ minHeight: "200px", padding: "0", alignItems: "center", justifyContent: "center" }}>
            <Calendar />
          </BoxContainer>
          <BoxContainer>
            <SectionTitle>Criar Escala em Lote</SectionTitle>
            <CreateSchedule>
              <p>Selecione os dias</p>
              <p>Selecione o Horário</p>
              <p>Selecione os Participantes</p>
              <button>Criar</button>
            </CreateSchedule>
          </BoxContainer>
        </Column> */}
      </FlexContainer>
    </Container>
  );
};

export default History;
