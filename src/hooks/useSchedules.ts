import { useState } from "react";

export const useSchedules = () => {
  const [schedules, setSchedules] = useState([]);

  const addSchedules = (newSchedules: any[]) => {
    setSchedules((prevSchedules) => [...prevSchedules, ...newSchedules]);
  };

  return {
    schedules,
    addSchedules,
  };
};
