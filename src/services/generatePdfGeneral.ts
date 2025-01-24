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

export async function generatePdfGeneral(sector: string, month: number, year: number) {
  // pdfMake.vfs = pdfFonts.pdfMake.vfs;

  let forms: LoadedForm[] = await api.get(`schedulesRegistered/?year=2022&month=${month}&setor=${sector}`, { timeout: 100000 }).then((resp) => {
    return resp.data;
  });

  if (forms.length === 0) {
    return false;
  }

  const body = [];

  let rowGradient = true;

  for (let schedule of forms) {
    const rows = new Array();
    rows.push({
      text: `${schedule.escala_participante.replace("ETA -", "").replace("Operacional - ", "")}\nData: ${new Date(schedule.data).getUTCDate()}/${new Date(schedule.data).getUTCMonth() + 1}/${new Date(schedule.data).getUTCFullYear()}\nHorário: ${schedule.horario}`,
      style: rowGradient === true ? "row1" : "row2",
    });
    rows.push({
      text: schedule.funcionario,
      style: rowGradient === true ? "rowEmployee1" : "rowEmployee2",
    });
    rows.push({
      text: `${schedule.endereco}\n${schedule.telefone_1} ${schedule.telefone_2 ? "  -  " : ""} ${schedule.telefone_2}`,
      style: rowGradient === true ? "rowAddress" : "rowAddress2",
    });
    body.push(rows);
    rowGradient = !rowGradient;
  }

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

  const docDefinitions: TDocumentDefinitions = {
    pageSize: "A4",
    pageMargins: [30, 60, 30, 50],
    header: {
      margin: [30, 10, 30, 20],
      table: {
        widths: [70, "*", 70],
        body: [
          [
            {
              image: await getBase64ImageFromURL("https://upload.wikimedia.org/wikipedia/commons/7/77/Sabesp.svg"),
              width: 30,
              style: "headerLogo",
            },
            {
              text: `UNIDADE DE NEGÓCIO VALE DO RIBEIRA - RR\n Escala de plantão Mensal`,
              style: "headerTitle",
            },
            {
              text: `Mês/Ano: ${("00" + month).slice(-2)}/${year}`, // adiciona 0 (zeros) a esquerca caso se
              style: "headerDate",
            },
          ],
        ],
      },
      layout: "noBorders",
    },
    footer: function (currentPage, pageCount) {
      return {
        margin: 10,
        columns: [
          {
            fontSize: 9,
            text: [
              {
                text: "sistema de gestão de escala digital v2.0 - LocalSIG",
                margin: [0, 20],
              },
            ],
            alignment: "center",
          },
          {
            fontSize: 9,
            text: [
              {
                text: `Página: ${currentPage} de ${pageCount} - ${sector} : ${month}/${year}`,
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
        margin: [60, 20, 60, 0],
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: `${sector === "Transporte" ? "Transporte" : sector === "Controle De Perdas" ? "Controle De Perdas" : `PLANTÃO ${sector.toLocaleUpperCase()}`}`,
                style: "headerSectorTitle",
              },
            ],
          ],
        },
        alignment: "center",
      },
      {
        style: "registersHeader",
        table: {
          widths: [140, 120, "*"],
          body: [
            [
              {
                text: "PLANTÃO OPERACIONAL",
                style: "coloumnsTitle",
              },
              {
                text: "PLATONISTA",
                style: "coloumnsTitle",
              },
              {
                text: "ENDEREÇO / FONE",
                style: "coloumnsTitle",
              },
            ],
          ],
        },
      },
      {
        table: {
          widths: [140, 120, "*"],
          body: [...body],
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
        fontSize: 13,
        bold: true,
        color: "#1d7fa3",
        alignment: "center",
        margin: [0, 4, 0, -4],
        lineHeight: 1.1,
      },
      headerSectorTitle: {
        fontSize: 11,
        bold: true,
        alignment: "center",
        margin: [0, 6, 0, 3],
        lineHeight: 1.1,
        fillColor: "#a5d6e8",
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
        fontSize: 11,
        bold: true,
        alignment: "center",
        margin: [0, 8, 0, 8],
      },
      coloumnsTitle2: {
        fontSize: 9,
        bold: true,
        alignment: "center",
        margin: [0, 8, 0, -8],
      },
      registersHeader: {
        fillColor: "#a5d6e8",
      },
      row1: {
        fontSize: 8,
        alignment: "left",
        margin: [4, 7, 4, 5],
        lineHeight: 1.2,
        fillColor: "#d3e3eb",
      },
      row2: {
        fontSize: 8,
        alignment: "left",
        margin: [4, 7, 4, 5],
      },
      rowEmployee1: {
        fontSize: 8,
        alignment: "left",
        margin: [4, 15, 4, 7],
        fillColor: "#d3e3eb",
      },
      rowEmployee2: {
        fontSize: 8,
        alignment: "left",
        margin: [4, 15, 4, 7],
      },
      rowAddress: {
        fontSize: 8,
        alignment: "left",
        margin: [5, 13, 5, 7],
        fillColor: "#d3e3eb",
      },
      rowAddress2: {
        fontSize: 8,
        alignment: "left",
        margin: [5, 13, 5, 7],
      },
    },
  };

  pdfMake.createPdf(docDefinitions).open();
}
