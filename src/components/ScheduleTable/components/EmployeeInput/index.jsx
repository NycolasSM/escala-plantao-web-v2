import React, { useContext, useState } from 'react';
import { customStyles, EmployeeInputContainer } from './styles';
import Select from 'react-select/async';
import FormContext from '../../../../context/formContext';
import AvailableSchedulesContext from '../../../../context/availableSchedulesContext';

const customStyles2 = {
  control: (provided) => ({
    ...provided,
    minHeight: "29px",
    height: "29px",
    fontSize: "12px",
    margin: 0
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (provided) => ({
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "30px",
  }),
  option: (provided) => ({
    ...provided,
    fontSize: "12px",
    padding: "8px 10px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100px",
  }),
  placeholder: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100px",
  }),
};

const EmployeeInput = ({ index }) => {
  const { availableEmployees } = useContext(AvailableSchedulesContext);
  const { registers, setRegisters } = useContext(FormContext);

  const filterEmployees = (inputValue) => {
    const lowerInput = inputValue.toLowerCase();
  
    return availableEmployees
      .map((employ) => ({
        label: `${employ.nome} | n_pes: ${employ.n_pes}`,
        value: {
          nome: employ.nome,
          n_pes: employ.n_pes,
          endereco: employ.endereco,
          telefone_1: employ.telefone_1,
          telefone_2: employ.telefone_2,
        },
      }))
      .filter((item) => item.label.toLowerCase().includes(lowerInput));
  };

  const promiseOptions = async (inputValue) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterEmployees(inputValue));
        setIsLoading(false)
      }, 10);
    });
  };

  const [isLoading, setIsLoading] = useState(true);

  // const loadOptions = async () => {
  //   const options: any[] = [];
  //   availableEmployees.forEach((employ: any) => {
  //     options.push({
  //       label: `${employ.nome} | n_pes: ${employ.n_pes} `,
  //       value: {
  //         nome: employ.nome,
  //         n_pes: employ.n_pes,
  //         endereco: employ.endereco,
  //         telefone_1: employ.telefone_1,
  //         telefone_2: employ.telefone_2,
  //       }, // talvez para poder inserir no formulário da para usar o código no funcionario
  //     });
  //   });
  //   return options;
  // };

  const updateRegister = (value) => {
    let employessList = [];

    for (let i = 0; i < value.length; i++) {
      employessList.push({
        label: value[i].label,
        value: {
          nome: value[i].value.nome,
          n_pes: value[i].value.n_pes,
          endereco: value[i].value.endereco,
          telefone_1: value[i].value.telefone_1,
          telefone_2: value[i].value.telefone_2,
        },
      });
    }

    setRegisters(
      (map) =>
        new Map(
          map.set(index.toString(), {
            ...registers.get(index.toString()),
            employees: employessList,
          })
        )
    );
  };

  return (
    <EmployeeInputContainer
      style={{ zIndex: `${index + 900}`, overflow: isLoading ? 'hidden' : '' }}
    >
      <Select
        placeholder='Colaboradores'
        defaultOptions={true}
        loadOptions={promiseOptions}
        onChange={(e) => updateRegister(e)}
        isOptionSelected={(option, selectValue) =>
          selectValue.some((i) => i.value.nome === option.value.nome)
        }
        value={registers.get(index.toString())?.employees?.map((employee) => {
          return {
            label: employee.label,
            value: {
              nome: employee.value.nome,
              n_pes: employee.value.n_pes,
              endereco: employee.value.endereco,
              telefone_1: employee.value.telefone_1,
              telefone_2: employee.value.telefone_2,
            },
          };
        })}
        isMulti
        styles={{...customStyles2, ...customStyles}}
        // styles={{ ...customStyles }}
      />
    </EmployeeInputContainer>
  );
};

export default EmployeeInput;
