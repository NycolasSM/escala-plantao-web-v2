// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { default as SelectAsync } from "react-select/async";
import Select from "react-select";
import { 
  Container, 
  SectionTitle, 
  FormColumn, 
  FormButtons, 
  LinkButton 
} from "../../styles/pages/editManager";
import AvailableSchedulesContext from "../context/availableSchedulesContext2";
import { api } from "../services/api";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    minHeight: "35px",
    fontSize: "14px",
    minWidth: "250px",
  }),
};

const customStyles2 = {
  control: (provided: any) => ({
    ...provided,
    minHeight: "35px",
    fontSize: "14px",
    minWidth: "300px",
  }),
};

const Parameters = () => {
  const [divisoes, setDivisoes] = useState([]);
  const [responsaveisData, setResponsaveisData] = useState({});
  const [selectedDivisao, setSelectedDivisao] = useState(null);
  const [selectedResponsavel, setSelectedResponsavel] = useState(null);
  const { availableEmployees } = useContext(AvailableSchedulesContext);

  // 🔹 Buscar divisões e responsáveis ao carregar a página
  useEffect(() => {
    fetchResponsaveis();
  }, []);

  const fetchResponsaveis = async () => {
    try {
      const response = await api.get("/divisao_responsavel");
      setResponsaveisData(response.data);

      // Converter as chaves (divisões) para options do Select
      const divisaoOptions = Object.keys(response.data).map((divisao) => ({
        value: divisao,
        label: divisao,
      }));
      setDivisoes(divisaoOptions);
    } catch (error) {
      console.error("Erro ao buscar responsáveis:", error);
    }
  };

  // 🔹 Atualiza o responsável ao selecionar a divisão
  const handleDivisaoChange = (selected: any) => {
    setSelectedDivisao(selected);

    // Buscar responsável correspondente no JSON
    const responsavelNome = responsaveisData[selected.value];
    if (responsavelNome) {
      setSelectedResponsavel({
        value: responsavelNome,
        label: responsavelNome,
      });
    } else {
      setSelectedResponsavel(null);
    }
  };

  // 🔹 Buscar funcionários disponíveis para serem responsáveis
  const filterEmployees = (inputValue: string) => {
    return availableEmployees
      .map((employ: any) => ({
        label: `${employ.nome} | n_pes: ${employ.n_pes}`,
        value: employ.nome,
      }))
      .filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const promiseOptions = async (inputValue: string): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterEmployees(inputValue));
      }, 10);
    });
  };

  // 🔹 Atualizar responsável
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
        {/* 🔹 Quando selecionar a divisão, buscar responsável atual */}
        <Select 
          styles={customStyles} 
          options={divisoes} 
          placeholder='Divisão' 
          value={selectedDivisao}
          onChange={handleDivisaoChange} 
        />

        {/* 🔹 Select assíncrono para funcionários */}
        <SelectAsync
          styles={customStyles2}
          defaultOptions
          loadOptions={promiseOptions}
          value={selectedResponsavel}
          placeholder='Responsável'
          onChange={setSelectedResponsavel}
        />

        <FormButtons>
          <LinkButton onClick={handleSave}>Salvar</LinkButton>
        </FormButtons>
      </FormColumn>
    </Container>
  );
};

export default Parameters;
