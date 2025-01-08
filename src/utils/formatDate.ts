export function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date: Date) {
  let dateUTC = new Date(date.setHours(date.getHours() + 3));

  let dateConverted = new Date(dateUTC);

  if (date != null && date != undefined) {
    return [
      padTo2Digits(dateConverted.getDate()),
      padTo2Digits(dateConverted.getMonth() + 1),
      dateConverted.getFullYear(),
    ].join('/');
  } else {
    ('');
  }
}

export function formatDateWithHours(date: Date) {
  let dateUTC = new Date(date.setHours(date.getHours() + 3));

  let dateConverted = new Date(dateUTC);

  let finalDate = [];

  if (date != null && date != undefined) {
    finalDate.push();
    return [
      [
        padTo2Digits(dateConverted.getDate()),
        padTo2Digits(dateConverted.getMonth() + 1),
        dateConverted.getFullYear(),
      ].join('/'),
      ['  '],
      [
        padTo2Digits(dateConverted.getHours()),
        padTo2Digits(dateConverted.getMinutes()),
        padTo2Digits(dateConverted.getSeconds()),
      ].join(':'),
    ];
  } else {
    ('');
  }
}
