import React, { useContext, useEffect, useState } from "react";
import Select, { SingleValue, MultiValue } from "react-select";
import { Container, Row, Button } from "./styles";
import FormContext from "../../context/formContext";
import AvailableSchedulesContext from "../../context/availableSchedulesContext";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    minHeight: "29px",
    height: "29px",
    fontSize: "12px",
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
    fontSize: "12px",
    padding: "8px 10px",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100px",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100px",
  }),
};

type OptionType = { value: string; label: string };

const BatchCreateSchedule = () => {
  const { monthNumber, year, availableEmployees } = useContext(AvailableSchedulesContext);

  const [selectedDays, setSelectedDays] = useState<MultiValue<OptionType>>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<MultiValue<OptionType>>([]);
  const [selectedStartTime, setSelectedStartTime] = useState<SingleValue<OptionType>>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<SingleValue<OptionType>>(null);
  const [selectedFromTime, setSelectedFromTime] = useState<SingleValue<OptionType>>(null);
  const [selectedToTime, setSelectedToTime] = useState<SingleValue<OptionType>>(null);

  const [allDays, setAllDays] = useState<any[]>([]);

  let totalOfDays = new Date(year, monthNumber, 0).getDate();

  useEffect(() => {
    setAllDays(Array.from({ length: totalOfDays }, (v, k) => k + 1));
  }, [monthNumber, year]);

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
    registersIndex,
    setRegistersIndex,
  } = useContext(FormContext);

  const daysOptions: OptionType[] = allDays.map((day) => {
    return { value: day, label: `${day} - ${getDayOfTheWeek(day)}` };
  });

  function getDayOfTheWeek(day: number) {
    let newDate = new Date(year, monthNumber - 1, day);
    if (newDate.getDay() == 0) {
      return "DOM";
    }
    if (newDate.getDay() == 1) {
      return "SEG";
    }
    if (newDate.getDay() == 2) {
      return "TER";
    }
    if (newDate.getDay() == 3) {
      return "QUA";
    }
    if (newDate.getDay() == 4) {
      return "QUI";
    }
    if (newDate.getDay() == 5) {
      return "SEX";
    }
    if (newDate.getDay() == 6) {
      return "SAB";
    }
  }

  const participantsOptions: any[] = availableEmployees.map((employ: any) => {
    return {
      label: `${employ.nome} | n_pes: ${employ.n_pes}`,
      value: {
        nome: employ.nome,
        n_pes: employ.n_pes,
        endereco: employ.endereco,
        telefone_1: employ.telefone_1,
        telefone_2: employ.telefone_2,
      },
    }
  });

  const timeOptions: OptionType[] = Array.from({ length: 48 }, (_, i) => {
    const hour = String(Math.floor(i / 2)).padStart(2, "0");
    const minutes = i % 2 === 0 ? "00" : "30";
    return { value: `${hour}:${minutes}`, label: `${hour}:${minutes}` };
  });

  const handleCreate = () => {
    const newEntries = selectedDays.map((day, index) => ({
      day: day.value,
      id: crypto.randomUUID(),
      employees: selectedParticipants.map((participant) => ({
        label: participant.label,
        value: {
          nome: participant.label,
          n_pes: `EMP-${Math.random().toString().slice(2, 8)}`, // Exemplo para ID aleatório
        },
      })),
      scheduleHour: [
        selectedStartTime?.value || "00:00",
        selectedEndTime?.value || "00:00",
        selectedFromTime?.value || "00:00",
        selectedToTime?.value || "24:00",
      ],
      action: "create",
    }));

    console.log("newEntries", newEntries);
    console.log("selectedStartTime", selectedStartTime);

    // Atualizando o estado registers com os novos registros
    setRegisters((prevRegisters: Map<string, any>) => {
      const updatedRegisters = new Map(prevRegisters);
      newEntries.forEach((entry, idx) => {
        updatedRegisters.set((prevRegisters.size + idx).toString(), entry);
      });

      setRegistersIndex(registersIndex + 1);

      return updatedRegisters;
    });

    // Limpa os estados selecionados
    setSelectedDays([]);
    setSelectedParticipants([]);
    setSelectedStartTime(null);
    setSelectedEndTime(null);
    setSelectedFromTime(null);
    setSelectedToTime(null);
  };

  return (
    <Container>
      <p>Selecione os dias</p>
      <Select
        isMulti
        options={daysOptions}
        value={selectedDays}
        onChange={setSelectedDays}
        placeholder='Selecione os dias'
        styles={customStyles}
      />
      <Row>
        <div>
          <p>Início</p>
          <Select
            options={timeOptions}
            value={selectedStartTime}
            onChange={setSelectedStartTime}
            placeholder='horário de início'
            styles={customStyles}
          />
        </div>
        <div>
          <p>Término</p>
          <Select
            options={timeOptions}
            value={selectedEndTime}
            onChange={setSelectedEndTime}
            placeholder='Selecione o horário de término'
            styles={customStyles}
          />
        </div>
      </Row>
      <Row>
        <div>
          <p>Intervalo das</p>
          <Select
            options={timeOptions}
            value={selectedFromTime}
            onChange={setSelectedFromTime}
            placeholder='Selecione o intervalo das'
            styles={customStyles}
          />
        </div>
        <div>
          <p>Intervalo às</p>
          <Select
            options={timeOptions}
            value={selectedToTime}
            onChange={setSelectedToTime}
            placeholder='Selecione o intervalo às'
            styles={customStyles}
          />
        </div>
      </Row>
      <p>Selecione os Participantes</p>
      <Select
        isMulti
        options={participantsOptions}
        value={selectedParticipants}
        onChange={setSelectedParticipants}
        placeholder='Selecione os participantes'
        styles={customStyles}
      />
      <Button style={{ marginTop: 20 }} onClick={handleCreate}>
        Criar
      </Button>
    </Container>
  );
};

export default BatchCreateSchedule;
