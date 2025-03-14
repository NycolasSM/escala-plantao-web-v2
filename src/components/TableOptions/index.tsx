import React, { useState, useEffect, useContext, useCallback, lazy } from "react";
import AvailableSchedulesContext from "../../context/availableSchedulesContext2";
import FormContext from "../../context/formContext";
import { OptionsContainer, Container, OptionTitle, Inputs, InputCheckBox, InputCheckBoxChecked } from "./styles";
import { useRouter } from "next/router";
import Select from "react-select";

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

type selectedOption = {
  plantaoSelected: string;
  localSelected: string;
};

const TableOptions = (context: any) => {
  const { plantaoAvailable, plantaoChosen, localChosen, setPlantaoChosen, setLocalChosen, setAvailableDaysData, setMonthNumber, optionsEscalas } =
    React.useContext(AvailableSchedulesContext);

  const { setHaveEmptyField, setRegisters, setIsLoadingRegisters, loadedForms } = useContext(FormContext);

  const [showLocationOptions, setShowLocationOptions] = useState<boolean>(false);

  const [selectedOptions, setSelectedOptions] = useState<selectedOption>({
    plantaoSelected: "",
    localSelected: "",
  });

  const router = useRouter();

  // permissões poderão vir ou de outro contexto ou fazer uma requisição aqui para saber de qual escala ele pode fazer

  // na primeira versão o usuário poderá fazer de todos os setores porém os que não tivermos a relação de funcionário, deverá trazer todos

  let permissoes: Map<string, string[]> = optionsEscalas;

  console.log("permissoes", permissoes)

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
    // na primeira renderizaçao ira verificar se existem parâmetros, caso sim ele seta nos valores padrões para poder editar o que o usuário desejar
    window.history.pushState({}, document.title, "/" + "");
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

  useEffect(() => {
    if (selectedOptions.plantaoSelected === "Transporte" || selectedOptions.plantaoSelected === "Controle De Perdas") {
      setShowLocationOptions(false);
    } else {
      setShowLocationOptions(true);
    }
  }, [plantaoChosen]);

  const plantaoOptions = plantaoAvailable?.map((plantao: string, index) => {
    return {
      label: plantao,
      value: plantao,
    };
  });

  const localOptions = permissoes.has(selectedOptions.plantaoSelected)
    ? permissoes
        .get(selectedOptions.plantaoSelected)!
        .sort()
        .map((local: string) => {
          const isSpecial = local === "Técnico" || local === "Almoxarifado" || local === "Informatica";

          return {
            label: local + (isSpecial ? " (Especial)" : ""),
            value: local + (isSpecial ? " (Especial)" : ""),
          };
        })
    : [];

  return (
    <Container>
      <Select
        className='react-select-container'
        styles={customStyles}
        options={plantaoOptions}
        placeholder='Plantão'
        onChange={(e) => handleChangeSetor(e?.value || "")}
        value={plantaoOptions?.find((option) => option.value === selectedOptions.plantaoSelected)}
      />
      {showLocationOptions === true && plantaoChosen != "Transporte" && plantaoChosen != "Controle De Perdas" && (
        <Select
          className='react-select-container'
          styles={customStyles}
          options={localOptions}
          placeholder='Local'
          onChange={(e) => handleChangeLocal(e?.value || "")}
          value={localOptions?.find((option) => option.value === selectedOptions.localSelected)}
        />
      )}

      {/* <OptionsContainer>
        <OptionTitle>Plantão</OptionTitle>
        <Inputs>
          {plantaoAvailable!.map((plantao: string, index) => (
            <div key={index}>
              {plantao === selectedOptions.plantaoSelected ? (
                <>
                  <InputCheckBoxChecked
                    onClick={() => {
                      handleChangeSetor(plantao);
                    }}
                  >
                    <div></div>
                  </InputCheckBoxChecked>
                  <span>{plantao}</span>
                </>
              ) : (
                <>
                  <InputCheckBox
                    onClick={() => {
                      handleChangeSetor(plantao);
                    }}
                  ></InputCheckBox>
                  <span>{plantao}</span>
                </>
                // <div>
                //   <input
                //     checked
                //     onChange={() => {
                //       handleChangeSetor(plantao);
                //     }}
                //     type="radio"
                //     name="setor"
                //   />
                //   <span>{plantao}</span>
                // </div>

                // <div key={plantao}>
                //   <input
                //     onChange={() => {
                //       handleChangeSetor(plantao);
                //     }}
                //     type="radio"
                //     name="setor"
                //   />
                //   <span>{plantao}</span>
                // </div>
              )}
            </div>
          ))}
        </Inputs>
        {showLocationOptions === true && plantaoChosen != "Transporte" && plantaoChosen != "Controle De Perdas" ? (
          // caso exista um Local nos parametros da query ele ira marcar a caixa equivalente ao que estiver nos parâmetros
          <>
            <OptionTitle>Local:</OptionTitle>
            <Inputs>
              <select
                defaultValue={selectedOptions.localSelected != undefined ? selectedOptions.localSelected : ""}
                name='local'
                id='local'
                onChange={(e) => {
                  handleChangeLocal(e.target.value);
                  setIsLoadingRegisters(true);
                }}
              >
                <option selected={true} disabled value=''>
                  Selecione o Local
                </option>
                {permissoes.has(selectedOptions.plantaoSelected)
                  ? permissoes
                      .get(selectedOptions.plantaoSelected)!
                      .sort()
                      .map((local: string) => (
                        <>
                          {local === "Técnico" || local === "Almoxarifado" || local === "Informatica" ? (
                            <option key={local} value={local}>
                              {local} (Especial)
                            </option>
                          ) : (
                            <option key={local} value={local}>
                              {local}
                            </option>
                          )}
                        </>
                      ))
                  : null}
              </select>
            </Inputs>
          </>
        ) : null}
      </OptionsContainer> */}
    </Container>
  );
};

export default TableOptions;
