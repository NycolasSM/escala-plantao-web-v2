import React, { useContext, useEffect, useState } from "react";
import { default as SelectAsync } from "react-select/async";
import Select from "react-select";
import { Container, SectionTitle, FormColumn, FormButtons, LinkButton } from "../../styles/pages/editManager";
import AvailableSchedulesContext from "../context/availableSchedulesContext2";
import { api } from "../services/api";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    minHeight: "30px",
    height: "35px",
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

const customStyles2 = {
  control: (provided: any) => ({
    ...provided,
    minHeight: "30px",
    height: "35px",
    fontSize: "13px",
    minWidth: "300px",
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

const Parameters = () => {
  const divisoes = [
    {
      label: "RRDO2",
      value: "RRDO2",
    },
    {
      label: "RRDO3",
      value: "RRDO3",
    },
    {
      label: "RRDO4",
      value: "RRDO4",
    },
    {
      label: "RRDO5",
      value: "RRDO5",
    },
    {
      label: "RRDO6",
      value: "RRDO6",
    },
  ];

  const [selectedDivisao, setSelectedDivisao] = useState(null);
  const [selectedResponsavel, setSelectedResponsavel] = useState(null);

  const { availableEmployees } = useContext(AvailableSchedulesContext);

  const filterEmployees = (inputValue) => {
    const lowerInput = inputValue.toLowerCase();

    return availableEmployees
      .map((employ: any) => ({
        label: `${employ.nome} | n_pes: ${employ.n_pes}`,
        value: employ.nome,
      }))
      .filter((item) => item.label.toLowerCase().includes(lowerInput));
  };

  const promiseOptions = async (inputValue: any): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterEmployees(inputValue));
      }, 10);
    });
  };

  const handleSave = async () => {
    if (!selectedDivisao || !selectedResponsavel) {
      alert("Selecione uma divisão e um responsável!");
      return;
    }

    try {
      await api.post("/divisao_responsavel", {
        divisao: selectedDivisao.value,
        responsavel: selectedResponsavel.value,
      });

      alert("Responsável atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar responsável:", error);
      alert("Erro ao atualizar responsável");
    }
  };

  return (
    <Container>
      <SectionTitle>
        <h1>Gerenciamento de Gerentes da Divisão</h1>
        <p>Selecione a divisão e o responsável</p>
      </SectionTitle>

      <FormColumn>
        <Select styles={customStyles} options={divisoes} placeholder='Divisão' onChange={setSelectedDivisao} />
        <SelectAsync
          styles={customStyles2}
          defaultOptions={true}
          loadOptions={promiseOptions}
          // options={responsaveis}
          placeholder='Responsável'
          onChange={setSelectedResponsavel}
        />
        <FormButtons>
          {/* @ts-ignore */}
          <LinkButton onClick={handleSave}>Salvar</LinkButton>
        </FormButtons>
      </FormColumn>
    </Container>
  );
};

export default Parameters;
