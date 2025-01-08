export function mask_decimal(input: string | number) {
  if (typeof input === "undefined" || input == null) return "0";

  let valor = "";

  if (typeof input !== "undefined" && typeof input !== "number") {
    valor = input;
  } else {
    valor = input.toString();
  }

  if (valor.length == 2) return valor;

  let v = valor;
  v = v.replace(/\D/g, "");
  v = v.replace(/(\d{1,2})$/, ",$1");
  v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return v;
}

export function formatarData(str: any) {
  let meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  let dateParts = str.split("/");

  let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  let mes = meses[dateObject.getMonth()];

  return mes.slice(0, 3).toLocaleUpperCase() + "/" + dateObject.getFullYear();
}
