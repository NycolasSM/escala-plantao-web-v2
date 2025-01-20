export function getDayOfTheWeek(day: number, year: number, monthNumber: number) {
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