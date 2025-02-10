import { TableCell, TDocumentDefinitions } from "pdfmake/interfaces";
import pdfMake, { tableLayouts } from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { api } from "./api";
import { table } from "console";

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

export async function generatePdfGeneralMaintenance(
  sector: string,
  month: number,
  year: number
) {
  // pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.vfs = pdfFonts['Roboto-Regular.ttf'];

  let dateNow = new Date();

  let registers = new Map();

  let forms: LoadedForm[] = await api
    .get(`schedulesRegistered/?year=2022&month=${month}&setor=${sector}`, { timeout: 100000 })
    .then((resp) => {
      return resp.data;
    });

  forms.map((register) => {
    let date = new Date(register.data);
    let scheduleHour = register?.horario // transforma o horario em um array de 4 posições
      .trim()
      .replace(/ /g, "")
      .split(/[\-\/]/);

    // cria uma variavel que irá buscar se existe alguma escala disponivel no funcionário caso não ele cria um array vazio para ficar concatenando novas escalas
    let schedules =
      registers?.get(register.funcionario)?.escalas != undefined
        ? registers.get(register.funcionario).escalas
        : [];
    schedules.push({
      data: `${date.getUTCDate()}/${
        date.getUTCMonth() + 1
      }/${date.getUTCFullYear()}`,
      horario: `Dás ${scheduleHour[0]} às ${
        scheduleHour[3] === "24:00" ? "24:00" : scheduleHour[3]
      }`,
    }),
      // foi feito dessa forma para que as informações sejam separadas e não repetidas, tipo os dias e os horarios do endereço e os numeros
      registers.set(`${register.funcionario}`, {
        endereco: register.endereco,
        telefone_1: register.telefone_1,
        telefone_2: register.telefone_2,
        escala_participante: register.escala_participante,
        escalas: schedules,
      });
  });

  if (forms.length === 0) {
    return false;
  }

  const body: any[] = [];

  registers.forEach((value: any, key: any) => {
    let horarios = value.escalas.map((escala: any) => {
      return `Data: ${escala.data}  -  ${escala.horario} \n`;
    });

    body.push(
      {
        style: "registersHeader",
        table: {
          widths: [150, 140, "*"],
          dontBreakRows: true,
          body: [
            [
              {
                text: `${value.escala_participante}`,
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
          widths: [150, 140, "*"],
          dontBreakRows: true,
          body: [
            [
              {
                text: horarios,
                style: "rowHour",
              },
              {
                text: key,
                style: "row",
              },
              {
                text: `${value.endereco} \n ${value.telefone_1} - ${value.telefone_2}`,
                style: "rowAddress",
              },
            ],
          ],
        },
      }
    );
  });

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
              image: await getBase64ImageFromURL(
                "https://upload.wikimedia.org/wikipedia/commons/7/77/Sabesp.svg"
              ),
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
                text: "PLANTÃO MANUTENÇÃO",
                style: "headerSectorTitle",
              },
            ],
          ],
        },
        alignment: "center",
      },
      ...body,
      {
        table: {
          body: [
            [
              {
                text: "Acionar somente a CAU, através dos telefones",
                style: "footerListTitle",
                decoration: "underline",
              },
            ],
            [
              {
                text: [
                  { text: "•  ", fontSize: 12, bold: true },
                  "(11) 5683-3222 ou (11) 5683-3111",
                  { text: "\n", fontSize: 8, bold: true },
                  { text: "•  ", fontSize: 12, bold: true },
                  "CAU aciona o Plantão Técnico, que aciona o plantonista da Eletromecânica e/ou Automação.",
                  { text: "\n", fontSize: 8, bold: true },
                ],
                style: "footerListItem",
              },
            ],
          ],
        },
        id: "mySecondId",

        layout: "noBorders",
      },
      {
        table: {
          body: [
            [
              {
                text: "Acionamento do Plantão",
                style: "footerListTitle",
                decoration: "underline",
              },
            ],
            [
              {
                text: [
                  { text: "•  ", fontSize: 12, bold: true },
                  "Ligar para os telefones no ",
                  { text: "3828-7701, 3828-7718 ", fontSize: 8, bold: true },
                  "e celular ",
                  { text: "(13) 99686-6224 ", fontSize: 8, bold: true },
                  "(CCO Centro de Controle Operacional). Descrevendo o problema com detalhes.\n",
                  { text: "•  ", fontSize: 12, bold: true },
                  "O CCO aciona o platonista (Operacional, ETA, Transportes, Controle De Perdas, Automação ou Eletromecânica) e comunica a ocorrência ao Gerente e Encarregado da respectiva unidade.",
                ],
                style: "footerListItem",
              },
            ],
          ],
        },
        id: "myid",
        layout: "noBorders",
      },

      // {
      //   text: `Registro, ${dateNow.getUTCDate()} de ${
      //     dateNow.getUTCMonth() + 1
      //   } de ${dateNow.getUTCFullYear()}`,
      //   style: "footerDataDate",
      // },
      // {
      //   text: "Edson Rodrigues Calixto (estático)",
      //   style: "footerDataUser",
      // },
      // {
      //   text: "Gestão de Recursos Humanos",
      //   style: "footerData",
      // },
      // {
      //   text: "RRA^650",
      //   style: "footerData",
      // },
      // {
      //   text: "VIA NOTES",
      //   style: "footerDataVia",
      //   decoration: "underline",
      // },
    ],
    pageBreakBefore: function (
      currentNode,
      followingNodesOnPage,
      nodesOnNextPage,
      previousNodesOnPage
    ) {
      //Here you can change the criteria of pageBreak according to your requirement
      if (
        currentNode.id === "myid" &&
        (currentNode.pageNumbers.length != 1 ||
          currentNode.pageNumbers[0] != currentNode.pages)
      ) {
        return true;
      }
      //Here you can change the criteria of pageBreak according to your requirement
      else if (
        currentNode.id === "mySecondid" &&
        currentNode.pageNumbers.length != 1
      ) {
        return true;
      }
      return false;
    },
    styles: {
      header: {
        fontSize: 10,
        bold: true,
        alignment: "center",
        margin: [0, 10, 0, -2],
      },
      headerTitle: {
        fontSize: 13,
        bold: true,
        color: "#1d7fa3",
        alignment: "center",
        margin: [0, 10, 0, -4],
        lineHeight: 1.1,
      },
      headerSectorTitle: {
        fontSize: 10,
        bold: true,
        alignment: "center",
        margin: [0, 3, 0, 1],
        lineHeight: 1.1,
        fillColor: "#a5d6e8",
      },
      headerLogo: {
        alignment: "center",
        margin: [0, 8, 0, -4],
      },
      headerDate: {
        fontSize: 9,
        bold: true,
        alignment: "center",
        margin: [0, 8, 0, 4],
      },
      coloumnsTitle: {
        fontSize: 8,
        bold: true,
        alignment: "center",
        margin: [0, 3, 0, 3],
      },
      registersHeader: {
        fillColor: "#a5d6e8",
        margin: [0, 5, 0, 0],
      },
      row: {
        fontSize: 8,
        alignment: "center",
        margin: [4, 8, 4, 0],
      },
      rowAddress: {
        fontSize: 8,
        alignment: "center",
        margin: [4, 8, 4, -4],
      },
      rowHour: {
        fontSize: 8,
        alignment: "left",
        margin: [3, 3, 3, 1],
        lineHeight: 1.4,
        fillColor: "#dfe9ed",
      },
      footerListTitle: {
        margin: [25, 9, 0, 2],
        bold: true,
        fontSize: 9,
      },
      footerListItem: {
        margin: [45, 2, 10, 2],
        fontSize: 8,
      },
      footerData: {
        fontSize: 8,
        alignment: "center",
      },
      footerDataUser: {
        fontSize: 8,
        alignment: "center",
        bold: true,
      },
      footerDataDate: {
        margin: [0, 6, 0, 6],
        fontSize: 8,
        alignment: "center",
        bold: true,
      },
      footerDataVia: {
        margin: [0, 3, 0, 3],
        fontSize: 8,
        alignment: "center",
        background: "#fce572",
      },
    },
  };

  pdfMake.createPdf(docDefinitions).open();
}
