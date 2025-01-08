import React, { createContext, useContext, useState } from "react";
import { schedulesMocked } from "./db/schedulesMocked";

const ScheduleContext = createContext<any>(null);

export const ScheduleProvider = ({ children }: { children: React.ReactNode }) => {
  const [schedules, setSchedules] = useState(schedulesMocked);

  const addSchedules = (newSchedules: any[]) => {
    setSchedules((prevSchedules) => [...prevSchedules, ...newSchedules]);
  };

  return (
    <ScheduleContext.Provider value={{ schedules, addSchedules }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedules = () => {
  return useContext(ScheduleContext);
};
