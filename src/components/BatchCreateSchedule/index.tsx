import React, { useState } from "react";
import Select from "react-select";
import { useSchedules } from "@/context/ScheduleContext";

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

const BatchCreateSchedule = () => {
  const { addSchedules } = useSchedules();
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [selectedFromTime, setSelectedFromTime] = useState(null);
  const [selectedToTime, setSelectedToTime] = useState(null);

  const daysOptions = [
    { value: "1 - SAB", label: "1 - SAB" },
    { value: "2 - DOM", label: "2 - DOM" },
    { value: "3 - TER", label: "3 - TER" },
    { value: "4 - QUA", label: "4 - QUA" },
    { value: "5 - QUI", label: "5 - QUI" },
    { value: "6 - SEX", label: "6 - SEX" },
    { value: "7 - SAB", label: "7 - SAB" },
  ];

  const participantsOptions = [
    { value: "ALEXANDRE RIBEIRO", label: "ALEXANDRE RIBEIRO" },
    { value: "JOÃO SILVA", label: "JOÃO SILVA" },
    { value: "CARLOS PEREIRA", label: "CARLOS PEREIRA" },
    { value: "ANA COSTA", label: "ANA COSTA" },
  ];

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = String(Math.floor(i / 2)).padStart(2, "0");
    const minutes = i % 2 === 0 ? "00" : "30";
    return { value: `${hour}:${minutes}`, label: `${hour}:${minutes}` };
  });

  const handleCreate = () => {
    const newSchedules = selectedDays.map(day => ({
      day: day.value,
      name: selectedParticipants.map(participant => participant.value).join(", "),
      start: selectedStartTime.value,
      end: selectedEndTime.value,
      from: selectedFromTime?.value || "",
      to: selectedToTime?.value || "",
    }));
    addSchedules(newSchedules);
  };

  return (
    <div>
      <p>Selecione os dias</p>
      <Select
        isMulti
        options={daysOptions}
        value={selectedDays}
        onChange={setSelectedDays}
        placeholder="Selecione os dias"
        styles={customStyles}
      />
      <p>Selecione o Horário de Início</p>
      <Select
        options={timeOptions}
        value={selectedStartTime}
        onChange={setSelectedStartTime}
        placeholder="Selecione o horário de início"
        styles={customStyles}
      />
      <p>Selecione o Horário de Término</p>
      <Select
        options={timeOptions}
        value={selectedEndTime}
        onChange={setSelectedEndTime}
        placeholder="Selecione o horário de término"
        styles={customStyles}
      />
      <p>Selecione o Intervalo das</p>
      <Select
        options={timeOptions}
        value={selectedFromTime}
        onChange={setSelectedFromTime}
        placeholder="Selecione o intervalo das"
        styles={customStyles}
      />
      <p>Selecione o Intervalo às</p>
      <Select
        options={timeOptions}
        value={selectedToTime}
        onChange={setSelectedToTime}
        placeholder="Selecione o intervalo às"
        styles={customStyles}
      />
      <p>Selecione os Participantes</p>
      <Select
        isMulti
        options={participantsOptions}
        value={selectedParticipants}
        onChange={setSelectedParticipants}
        placeholder="Selecione os participantes"
        styles={customStyles}
      />
      <button style={{ marginTop: 20 }} onClick={handleCreate}>Criar</button>
    </div>
  );
};

export default BatchCreateSchedule;
