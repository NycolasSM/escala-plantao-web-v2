import React, { useState, useEffect } from "react";
import AvailableSchedulesContext from "@/context/availableSchedulesContext";
import { Container, Header, Month, Buttons, Line, Weeks, Days, HolidaysNameList, CalendarContainer, Content, SectionTitle } from "./styles";

// estou passando valores por padrão mas essas informações deveram ser enviadas para o calendario quando o usuário escolher o setor
const Calendar = () => {
  const { year, setYear, monthNumber, setMonthNumber, availableDays, availableDaysData } = React.useContext(AvailableSchedulesContext);

  const [monthName, setMonthName] = useState<string>("");

  let date = new Date(year, monthNumber, 1);
  let newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  let totalOfDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  let allDays = Array.from({ length: totalOfDays }, (v, k) => k + 1);

  const setDays = () => {
    date = new Date(year, monthNumber, 1);
    newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    totalOfDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    allDays = Array.from({ length: totalOfDays }, (v, k) => k + 1);
  };

  useEffect(() => {
    displayMonth();
    setDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthNumber]);

  function getWeekName(weekNumber: number) {
    switch (weekNumber) {
      case 0:
        return "sunday";
      case 1:
        return "monday";
      case 2:
        return "tuesday";
      case 3:
        return "wednesday";
      case 4:
        return "thursday";
      case 5:
        return "friday";
      case 6:
        return "saturday";
    }
  }

  function displayMonth() {
    switch (monthNumber) {
      case 1:
        setMonthName("Janeiro");
        break;
      case 2:
        setMonthName("Fevereiro");
        break;
      case 3:
        setMonthName("Março");
        break;
      case 4:
        setMonthName("Abril");
        break;
      case 5:
        setMonthName("Maio");
        break;
      case 6:
        setMonthName("Junho");
        break;
      case 7:
        setMonthName("Julho");
        break;
      case 8:
        setMonthName("Agosto");
        break;
      case 9:
        setMonthName("Setembro");
        break;
      case 10:
        setMonthName("Outubro");
        break;
      case 11:
        setMonthName("Novembro");
        break;
      case 12:
        setMonthName("Dezembro");
        break;
    }
  }

  function handleChangeMonth(operator: string) {
    if (operator === "+") {
      if (monthNumber === 12) {
        {
          setYear(year + 1);
          setMonthNumber(1);
        }
      } else {
        setMonthNumber(monthNumber + 1);
      }
    } else if (operator === "-") {
      if (monthNumber === 1) {
        {
          setYear(year - 1);
          setMonthNumber(12);
        }
      } else {
        setMonthNumber(monthNumber - 1);
      }
    }
  }

  return (
    <CalendarContainer>
      <Content>
        <Container>
          <Header>
            <Month>
              <h3>{monthName}</h3>
              <h3>{year}</h3>
            </Month>
            <Buttons>
              <button onClick={() => handleChangeMonth("-")}></button>
              <button onClick={() => handleChangeMonth("+")}></button>
            </Buttons>
          </Header>
          <Line></Line>
          <Weeks>
            <span>Seg</span>
            <span>Ter</span>
            <span>Qua</span>
            <span>Qui</span>
            <span>Sex</span>
            <span>Sab</span>
            <span>Dom</span>
          </Weeks>
          <Days>
            <div className={`starting-weekday-${getWeekName(newDate.getDay())}`}>
              {allDays.map((day) => (
                <button key={day} tabIndex={-1} className={availableDays.has(day) ? "highlight" : ""}>
                  <time dateTime={`${year}-${monthNumber}-${day}`}>{day}</time>
                </button>
              ))}
            </div>
          </Days>
        </Container>
        <HolidaysNameList>
          <SectionTitle>Feriados:</SectionTitle>
          {availableDays.size > 0 && (
            <>
              {Array.from(availableDaysData).map((holidayData, i) => (
                <li key={i}>
                  {holidayData.day} - {holidayData.holidayTitle}
                </li>
              ))}
            </>
          )}
        </HolidaysNameList>
      </Content>
    </CalendarContainer>
  );
};

export default Calendar;
