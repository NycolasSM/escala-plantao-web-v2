import { TableCell, TDocumentDefinitions } from "pdfmake/interfaces";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { api } from "./api";

type LoadedForm = {
  data: Date;
  endereco: string | null;
  escala_participante: string;
  funcionario: string;
  horario: string;
  id: string;
  n_pes_funcionario: string;
  n_pes_responsavel: string;
  responsavel: string;
  telefone_1: string | null;
  telefone_2: string | null;
  total_horas: string;
};

export async function generatePdfSchedule(
  forms: LoadedForm[],
  issuer: string,
  sector: string,
  local: string,
  month: number,
  year: number,
  observation: string,
  dismissLoadingNotify: () => void,
  notifyLoading: () => void
) {
  notifyLoading();

  console.log("forms", forms)

  if (forms.length === 0) {
    dismissLoadingNotify();
    throw new Error("vazio");
  }

  // pdfMake.vfs = pdfFonts.pdfMake.vfs;

  let Issuers = new Set();

  const body: any[] = [];

  let rowGradient = true;

  let scheduleMap = new Map();

  for (let schedule of forms) {
    Issuers.add(schedule.responsavel);

    if (!scheduleMap.has(schedule.funcionario)) {
      scheduleMap.set(schedule.funcionario, [schedule]);
    } else {
      scheduleMap.get(schedule.funcionario).push(schedule);
    }
  }

  const getTotalScheduleHour = (mapKey: string) => {
    let total = 0;

    scheduleMap.get(mapKey).map((schedule: LoadedForm) => {
      // console.log(schedule.total_horas);
      total = total + parseFloat(schedule.total_horas);
    });

    return total;
  };

  scheduleMap.forEach((value: any, key: string) => {
    let sizeOfSpan = value.length;
    let dataRowGradient = false;

    scheduleMap.get(key).map((schedule: LoadedForm) => {
      const scheduleHour = schedule.horario
        .trim()
        .replace(/ /g, "")
        .split(/[\-\/]/);

      const totalScheduleHour = getTotalScheduleHour(key)
        .toString()
        .replace(".5", ":30");
      // console.log(parseInt(totalScheduleHour));

      const rows = new Array();
      rows.push({
        rowSpan: sizeOfSpan,
        text: schedule.funcionario,
        style: rowGradient === true ? "row1" : "row2",
      });
      rows.push({
        rowSpan: sizeOfSpan,
        text: schedule.n_pes_funcionario,
        style: rowGradient === true ? "row1" : "row2",
      });
      rows.push({
        text: new Date(schedule.data).getUTCDate(),
        style: dataRowGradient === true ? "row2" : "row1",
      });
      rows.push({
        text: scheduleHour[0],
        style: dataRowGradient === true ? "row2" : "row1",
      });
      rows.push({
        text: scheduleHour[1] === "00:00" ? "--" : scheduleHour[1],
        style: dataRowGradient === true ? "row2" : "row1",
      });
      rows.push({
        text: scheduleHour[2] === "00:00" ? "--" : scheduleHour[2],
        style: dataRowGradient === true ? "row2" : "row1",
      });
      rows.push({
        text: scheduleHour[3] === "24:00" ? "24:00" : scheduleHour[3],
        style: dataRowGradient === true ? "row2" : "row1",
      });
      rows.push({
        rowSpan: sizeOfSpan,
        text: totalScheduleHour + "hrs",
        style: rowGradient === true ? "row1" : "row2",
      });
      rows.push({
        rowSpan: sizeOfSpan,
        text: "",
        style: rowGradient === true ? "row1" : "row2",
      });
      body.push(rows);
      dataRowGradient = !dataRowGradient;
    });
    rowGradient = !rowGradient;
  });

  // console.log(scheduleMap)

  async function getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }

  let sectorSelected: string = "";

  if (sector === 'ETA') {
    sectorSelected = "ETA";
  } else {
    switch (local) {
      case "Juquitiba":
      case "São Lourenço":
      case "Registro / Sete Barras":
        sectorSelected = "RRDO2";
        break;
      case "Registro":
        if (sector === "ETA") {
          sectorSelected = "ETARegistro";
        } else {
          sectorSelected = "RRDO2";
        }
        break;
      case "Jacupiranga":
      case "Cajati":
      case "Barra do Turvo":
      case "Eldorado":
      case "Cajati / Jacupiranga":
        sectorSelected = "RRDO3";
        break;
      case "Iporanga":
        sectorSelected = "Iporanga";
        break;
      case "Sete Barras":
          sectorSelected = "Sete_Barras";
          break;
      case "Cananéia":
      case "Iguape":
      case "Ilha Comprida":
      case "Pariquera Açu":
      case "Pariquera-Açu":
      case "Ilha Comprida / Pedrinhas":
      case "Iguape / Ilha Comprida":
        sectorSelected = "RRDO4";
        break;
      case "Itariri":
      case "Juquiá":
      case "Miracatu":
      case "Pedro de Toledo":
      case "Tapiraí":
        sectorSelected = "RRDO5";
        break;
      case "Apiaí":
      case "Barra do Chapéu":
      case "Itaoca":
      case "Itapirapuã Paulista":
      case "Ribeira":
      case "Ribeira / Itapirapuã Paulista":
      case "Ribeira / Itaoca":
        sectorSelected = "RRDO6";
        break;
    }
  }

  switch (sector) {
    case "Manutenção":
      sectorSelected = "Manutenção";
      break;
    case "Transporte":
      sectorSelected = "Transporte";
      break;
    case "Controle De Perdas":
      sectorSelected = "Controle_De_Perdas";
      break;
  }

  let responsible: any = {
    RRDO2: "PABLO ROGERIO ALVES",
    RRDO3: "ADRIANO DE ALMEIDA DANTAS", 
    RRDO4: "ADRIANO DE ALMEIDA DANTAS",
    RRDO5: "PABLO ROGERIO ALVES", 
    RRDO6: "MILLER DIAS SANTOS",
    Iporanga: "MILLER DIAS SANTOS",
    Sete_Barras: "PABLO ROGERIO ALVES",
    // ETARegistro: "NELSON COLOMBO JUNIOR",
    ETARegistro: "MARCOS ROBERTO DA SILVA",
    Manutenção: "DANIEL DE MELLO SILVA",
    Transporte: "CARLOS GOMES PINTO",
    Controle_De_Perdas: "",
    ETA: "EDUARDO DE CAMPOS LEITE"
  };

  dismissLoadingNotify();

  const docDefinitions: TDocumentDefinitions = {
    pageSize: "A4",
    pageMargins: [30, 30, 30, 50],
    footer: function (currentPage, pageCount) {
      return {
        margin: 10,
        columns: [
          {
            fontSize: 9,
            text: [
              {
                text: "sistema de gestão de escala digital v1.0 - LocalSIG",
                margin: [0, 20],
              },
            ],
            alignment: "center",
          },
          {
            fontSize: 9,
            text: [
              {
                text:
                  "Página: " +
                  `${currentPage} de ${pageCount} : ${sector} ${
                    local === "" ? "" : "-"
                  } ${local} : ${month}/${year}`,
                margin: [0, 20],
              },
            ],
            alignment: "center",
          },
        ],
      };
    },
    content: [
      {
        table: {
          // heights: function (row) {
          //   return (row + 1) * 25;
          // },
          // heights: [20, 50, 70],
          widths: [50, "*", 95],
          headerRows: 2,
          body: [
            [
              {
                image: await getBase64ImageFromURL(
                  "https://upload.wikimedia.org/wikipedia/commons/7/77/Sabesp.svg"
                ),
                width: 30,
                style: "headerLogo",
                rowSpan: 2,
              },
              {
                text: `Escala de Plantão Digital\n Plantão: ${sector}`,
                style: "headerTitle",
                rowSpan: 2,
              },
              {
                text: `Mês/Ano: ${("00" + month).slice(-2)}/${year}`, // adiciona 0 (zeros) a esquerca caso se
                style: "headerDate",
                rowSpan: 1,
              },
            ],
            [
              { text: "", style: "header" },
              { text: "", style: "header" },
              {
                text: `Local: ${local ? local : "Registro"}`,
                style: "headerLocal",
              },
            ],
          ],
        },
      },
      {
        style: "registersHeader",
        table: {
          widths: [120, 39, 25, 34, 34, 34, 34, 38, "*"],
          headerRows: 2,
          body: [
            [
              {
                rowSpan: 2,
                text: "Nome do Colaborador",
                style: "coloumnsTitle",
              },
              {
                rowSpan: 2,
                text: "Matrícula",
                style: "coloumnsTitle",
              },
              {
                rowSpan: 2,
                text: "Dia",
                style: "coloumnsTitle",
              },
              {
                rowSpan: 2,
                text: "Início",
                style: "coloumnsTitle",
              },
              {
                rowSpan: 1,
                colSpan: 2,
                text: "Intervalo",
                style: "coloumnsTitleBreak",
              },
              {
                rowSpan: 1,
                text: "",
                style: "coloumnsTitleBreak",
              },
              {
                rowSpan: 2,
                text: "Término",
                style: "coloumnsTitle2",
              },
              {
                rowSpan: 2,
                text: "Total de Horas",
                style: "coloumnsTitleEndTotalHour",
              },
              {
                rowSpan: 2,
                text: "Visto do Colaborador",
                style: "coloumnsTitleEndSignature",
              },
            ],
            [
              {
                rowSpan: 2,
                text: "Nome do Colaborador",
                style: "coloumnsTitle",
              },
              {
                rowSpan: 2,
                text: "n_pes",
                style: "coloumnsTitle",
              },
              {
                rowSpan: 2,
                text: "Dia",
                style: "coloumnsTitle",
              },
              {
                rowSpan: 1,
                text: "",
                style: "coloumnsTitle",
              },
              {
                rowSpan: 1,
                text: "Início",
                style: "coloumnsTitleBreak",
              },
              {
                rowSpan: 1,
                text: "Término",
                style: "coloumnsTitleBreak",
              },
              {
                rowSpan: 1,
                text: "",
                style: "coloumnsTitle",
              },
              {
                rowSpan: 2,
                text: "Total de Horas",
                style: "coloumnsTitleEndTotalHour",
              },
              {
                rowSpan: 2,
                text: "Visto do Colaborador",
                style: "coloumnsTitleEndSignature",
              },
            ],
          ],
        },
      },
      {
        table: {
          widths: [120, 39, 25, 34, 34, 34, 34, 38, "*"],
          dontBreakRows: true,
          body: [...body],
        },
      },
      {
        table: {
          widths: ["*"],
          heights: [10],
          body: [
            [
              {
                text: "Observações",
                style: "observationTitle",
                border: [true, true, true, false],
              },
            ],
          ],
        },
      },
      {
        table: {
          widths: ["*"],
          heights: [50],
          body: [
            [
              {
                text: `${observation ?? ""}`,
                style: "observation",
                border: [true, false, true, true],
              },
            ],
          ],
        },
      },
      {
        table: {
          widths: ["*", "*", "*"],
          heights: [60],
          body: [
            [
              {
                text: `Emitente: ${Array.from(Issuers).join(",\n")}`,
                style: "observationIssuers",
              },
              {
                text: `Gerente da Divisão: ${responsible[sectorSelected]}`,
                style: "observation",
              },
              {
                text: "Aprovação:",
                style: "observation",
              },
            ],
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 10,
        bold: true,
        alignment: "center",
        margin: [0, 2, 0, -2],
      },
      headerTitle: {
        fontSize: 12,
        bold: true,
        alignment: "center",
        margin: [0, 4, 0, -4],
        lineHeight: 1.1,
      },
      headerLogo: {
        alignment: "center",
      },
      headerDate: {
        fontSize: 9,
        bold: true,
        alignment: "center",
        margin: [0, 4, 0, 4],
      },
      headerLocal: {
        fontSize: 9,
        bold: true,
        alignment: "center",
        margin: [0, 2, 0, 2],
      },
      coloumnsTitle: {
        fontSize: 9,
        bold: true,
        alignment: "center",
        margin: [0, 8, 0, -8],
      },
      coloumnsTitle2: {
        fontSize: 9,
        bold: true,
        alignment: "center",
        margin: [0, 8, 0, -8],
      },
      coloumnsTitleBreak: {
        fontSize: 9,
        bold: true,
        alignment: "center",
      },
      coloumnsTitleEndTotalHour: {
        fontSize: 9,
        bold: true,
        alignment: "center",
        margin: [0, 3, 0, -3],
      },
      coloumnsTitleEndSignature: {
        fontSize: 9,
        bold: true,
        alignment: "center",
        margin: [0, 8, 0, -3],
      },
      registersHeader: {
        fillColor: "#a5d6e8",
      },
      row1: {
        fontSize: 8,
        alignment: "center",
        margin: [0, 4, 0, 5],
        fillColor: "#d3e3eb",
      },
      row2: {
        fontSize: 8,
        alignment: "center",
        margin: [0, 4, 0, 5],
      },
      observationTitle: {
        fontSize: 10,
        bold: true,
      },
      observation: {
        fontSize: 9,
        margin: [3, 0, 3, 3],
      },
      observationIssuers: {
        fontSize: 9,
        margin: [3, 0, 3, 55],
      },
    },
  };

  pdfMake.createPdf(docDefinitions).open();
}
