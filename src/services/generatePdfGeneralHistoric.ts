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

type LoadedHolidays = {
  id: number;
  data: string;
  lugar: string;
  descricao: string;
};

type ResponsibleList = {
  nome: string;
  municipio: string;
};

//TODO incluir varios meses caso a semana passe o mes atual

export async function generatePdfGeneralHistoric(
  sector: string,
  dayStart: number,
  dayEnd: number,
  monthStart: number,
  monthEnd: number,
  year: number,
  dismissLoadingNotify: () => void,
  notifyLoading: () => void
) {
  console.log(dayStart);
  console.log(dayEnd);

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  notifyLoading();
  // OBS: Lembrar de na coluna do banco cargo, quando for inserir um responsável em manuntenção deve colocar o prefixo MANUTENÇÃO
  let list: any = {
    APIAÍ: [],
    JUQUIÁ: [],
    JUQUITIBA: [],
    REGISTRO: [],
    SÃO_LOURENÇO: [],
    SETE_BARRAS: [],
    BARRA_DO_TURVO: [],
    CAJATI: [],
    ELDORADO: [],
    IPORANGA: [],
    JACUPIRANGA: [],
    CANANÉIA: [],
    IGUAPE: [],
    ILHA_COMPRIDA: [],
    PARIQUERA_AÇU: [],
    ITARIRI: [],
    MIRACATU: [],
    PEDRO_DE_TOLEDO: [],
    TAPIRAÍ: [],
    BARRA_DO_CHAPÉU: [],
    ITAOCA: [],
    ITAPIRAPUÃ_PAULISTA: [],
    RIBEIRA: [],
    TRANSPORTE: [],
    CONTROLE_DE_PERDAS: [],
    MANUTENÇÃO_APIAÍ: [],
    MANUTENÇÃO_AUTOMAÇÃO: [],
    MANUTENÇÃO_ELETROMECÂNICA: [],
    MANUTENÇÃO_JUQUITIBA_SÃO_LOURENÇO: [],
    MANUTENÇÃO_TÉCNICO: [],
    MANUTENÇÃO_ALMOXARIFADO: [],
    MANUTENÇÃO_CANANÉIA: [],
    MANUTENÇÃO_IGUAPE: [],
    MANUTENÇÃO_INFORMATICA: [],
  };

  let forms: LoadedForm[] = await api
    .get(
      `schedulesRegistered/?year=${year}&setor=${sector}&dayStart=${dayStart}&dayEnd=${dayEnd}&monthStart=${monthStart}&monthEnd=${monthEnd}`,
      { timeout: 100000 }
    )
    .then((resp) => {
      console.log('resp.data')
      console.log(resp.data)
      return resp.data;
    })
    .catch((err) => {
      console.log("err");
      console.log(err);
    });

  let lastDayOfMonth = new Date(year, monthStart, 0).getUTCDate();

  let FilterholidayMonthStart = monthStart;
  let FilterholidayMonthEnd = dayEnd > lastDayOfMonth ? monthEnd + 1 : monthEnd;
  let FilterholidayDayStart = dayStart;
  let FilterholidayDayEnd = dayEnd > lastDayOfMonth ? dayEnd - lastDayOfMonth : dayEnd;

  let holidays: LoadedHolidays[] = [];

  if (FilterholidayMonthEnd === 13) {
  } else {
    holidays = await api
      .get(
        `holidays?monthStart=${FilterholidayMonthStart}&monthEnd=${FilterholidayMonthEnd}&year=${year}&dayStart=${FilterholidayDayStart}&dayEnd=${
          FilterholidayDayEnd - 1 === 0 ? 31 : FilterholidayDayEnd - 1
        }
        `,
        { timeout: 100000 }
      )
      .then((resp) => {
        console.log(`holidays?monthStart=${FilterholidayMonthStart}&monthEnd=${FilterholidayMonthEnd}&year=${year}&dayStart=${FilterholidayDayStart}&dayEnd=${
          FilterholidayDayEnd - 1
        }
        `);
        return resp.data;
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  }

  let responsibleList: any = await api.get(`/responsible`).then((resp) => {
    const result = resp.data.map((responsible: ResponsibleList) => {
      // existe uma lista com os municipios que guardara os responsáveis das escalas, quando a lista vem da api, é feito um map e transformado o campo municipio para ficar do formato da chave do objeo da lista apra assim preencher com o nome do responsável

      // console.log(responsible);

      let item: string = responsible.municipio.replaceAll(" ", "_");

      list[item].push(responsible.nome);
    });

    return list;
  });

  const getMonthDayFormated = (date: Date) => {
    let month = "JANEIRO";
    let day = "1";

    switch (date.getMonth()) {
      case 0:
        month = "JANEIRO";
        break;
      case 1:
        month = "FEVEREIRO";
        break;
      case 2:
        month = "MARÇO";
        break;
      case 3:
        month = "ABRIL";
        break;
      case 4:
        month = "MAIO";
        break;
      case 5:
        month = "JUNHO";
        break;
      case 6:
        month = "JULHO";
        break;
      case 7:
        month = "AGOSTO";
        break;
      case 8:
        month = "SETEMBRO";
        break;
      case 9:
        month = "OUTUBRO";
        break;
      case 10:
        month = "NOVEMBRO";
        break;
      case 12:
        month = "DEZEMBRO";
        break;
    }

    if (date.getUTCDate() < 10) {
      day = "0" + date.getUTCDate();
    } else {
      day = date.getUTCDate().toString();
    }

    return `DIA ${day}/${month}`;
  };

  const drawHolidayDay = (holiday: LoadedHolidays) => {
    return `${getMonthDayFormated(new Date(holiday.data))} - ${holiday.descricao}`;
  };

  const dateNow = new Date();

  const getMonthName = (monthNumber: number) => {
    switch (monthNumber) {
      case 0:
        return "Janeiro";
      case 1:
        return "Fevereiro";
      case 2:
        return "Março";
      case 3:
        return "Abril";
      case 4:
        return "Maio";
      case 5:
        return "Junho";
      case 6:
        return "Julho";
      case 7:
        return "Agosto";
      case 8:
        return "Setembro";
      case 9:
        return "Outubro";
      case 10:
        return "Novembro";
      case 11:
        return "Dezembro";
    }
  };

  let responsibleOfSchedule: any = {
    // responsáveis pelas escalas, ao qual será informado no relatório
    // TODO atualmente estamos considerando que um responsável pelo municipio tem que escalar tanto para o operacional como para o ETA, caso isso for mudar talvez no banco devera gardadar a informção se é eta e se é operacional para assim criar essas chaves na lista
    // para cada um ele tenta puxar se existe nomes dentro da lista de responsáveis e faz um join para separar cada item, caso esteja vazio ele só preenche com uma string vazia
    // TODO atualmente os municipios que possuem mesmos responsáveis esta usando do municipio em comum
    Operacional_Apiaí: responsibleList.APIAÍ.join(", \n") ?? "",
    Operacional_Juquiá: responsibleList.JUQUIÁ.join(", \n") ?? "",
    Operacional_Juquitiba: responsibleList.JUQUITIBA.join(", \n") ?? "",
    Operacional_Registro: responsibleList.REGISTRO.join(", \n") ?? "",
    Operacional_São_Lourenço: responsibleList.SÃO_LOURENÇO.join(", \n") ?? "",
    Operacional_Sete_Barras: responsibleList.SETE_BARRAS.join(", \n") ?? "",
    Operacional_Barra_do_Turvo: responsibleList.BARRA_DO_TURVO.join(", \n") ?? "",
    Operacional_Cajati: responsibleList.CAJATI.join(", \n") ?? "",
    Operacional_Eldorado: responsibleList.ELDORADO.join(", \n") ?? "",
    Operacional_Iporanga: responsibleList.IPORANGA.join(", \n") ?? "",
    Operacional_Jacupiranga: responsibleList.JACUPIRANGA.join(", \n") ?? "",
    Operacional_Cananéia: responsibleList.CANANÉIA.join(", \n") ?? "",
    Operacional_Iguape: responsibleList.IGUAPE.join(", \n") ?? "",
    Operacional_Ilha_Comprida: responsibleList.ILHA_COMPRIDA.join(", \n") ?? "",
    Operacional_Pariquera_Açu: responsibleList.PARIQUERA_AÇU.join(", \n") ?? "",
    Operacional_Itariri: responsibleList.ITARIRI.join(", \n") ?? "",
    Operacional_Miracatu: responsibleList.MIRACATU.join(", \n") ?? "",
    Operacional_Pedro_de_Toledo: responsibleList.PEDRO_DE_TOLEDO.join(", \n") ?? "",
    Operacional_Tapiraí: responsibleList.TAPIRAÍ.join(", \n") ?? "",
    Operacional_Barra_do_Chapéu: responsibleList.APIAÍ.join(", \n") ?? "",
    Operacional_Itaoca: responsibleList.APIAÍ.join(", \n") ?? "",
    Operacional_Itapirapuã_Paulista: responsibleList.APIAÍ.join(", \n") ?? "",
    Operacional_Ribeira: responsibleList.APIAÍ.join(", \n") ?? "",
    ETA_Apiaí: responsibleList.APIAÍ.join(", \n") ?? "",
    ETA_Juquiá: responsibleList.JUQUIÁ.join(", \n") ?? "",
    ETA_Juquitiba: responsibleList.JUQUITIBA.join(", \n") ?? "",
    ETA_Registro: responsibleList.REGISTRO.join(", \n") ?? "",
    ETA_São_Lourenço: responsibleList.SÃO_LOURENÇO.join(", \n") ?? "",
    ETA_Sete_Barras: responsibleList.SETE_BARRAS.join(", \n") ?? "",
    ETA_Barra_do_Turvo: responsibleList.BARRA_DO_TURVO.join(", \n") ?? "",
    ETA_Cajati: responsibleList.CAJATI.join(", \n") ?? "",
    ETA_Eldorado: responsibleList.ELDORADO.join(", \n") ?? "",
    ETA_Iporanga: responsibleList.IPORANGA.join(", \n") ?? "",
    ETA_Jacupiranga: responsibleList.JACUPIRANGA.join(", \n") ?? "",
    ETA_Cananéia: responsibleList.CANANÉIA.join(", \n") ?? "",
    ETA_Iguape: responsibleList.IGUAPE.join(", \n") ?? "",
    ETA_Ilha_Comprida: responsibleList.ILHA_COMPRIDA.join(", \n") ?? "",
    ETA_Pariquera_Açu: responsibleList.PARIQUERA_AÇU.join(", \n") ?? "",
    ETA_Itariri: responsibleList.ITARIRI.join(", \n") ?? "",
    ETA_Miracatu: responsibleList.MIRACATU.join(", \n") ?? "",
    ETA_Pedro_de_Toledo: responsibleList.PEDRO_DE_TOLEDO.join(", \n") ?? "",
    ETA_Tapiraí: responsibleList.TAPIRAÍ.join(", \n") ?? "",
    ETA_Barra_do_Chapéu: responsibleList.APIAÍ.join(", \n") ?? "",
    ETA_Itaoca: responsibleList.APIAÍ.join(", \n") ?? "",
    ETA_Itapirapuã_Paulista: responsibleList.APIAÍ.join(", \n") ?? "",
    ETA_Ribeira: responsibleList.APIAÍ.join(", \n") ?? "",
    Transporte: responsibleList.TRANSPORTE.join(", \n") ?? "",
    Controle_De_Perdas: responsibleList.CONTROLE_DE_PERDAS.join(", \n") ?? "",
    Manutenção_Apiaí: responsibleList.MANUTENÇÃO_APIAÍ.join(", \n") ?? "",
    Manutenção_Automação: responsibleList.MANUTENÇÃO_AUTOMAÇÃO.join(", \n") ?? "",
    Manutenção_Eletromecânica: responsibleList.MANUTENÇÃO_ELETROMECÂNICA.join(", \n") ?? "",
    Manutenção_Juquitiba_São_Lourenço: responsibleList.MANUTENÇÃO_JUQUITIBA_SÃO_LOURENÇO.join(", \n") ?? "",
    Manutenção_Técnico: responsibleList.MANUTENÇÃO_TÉCNICO.join(", \n") ?? "",
    Manutenção_Almoxarifado: responsibleList.MANUTENÇÃO_ALMOXARIFADO.join(", \n") ?? "",
    Manutenção_Cananéia: responsibleList.MANUTENÇÃO_CANANÉIA.join(", \n") ?? "",
    Manutenção_Iguape: responsibleList.MANUTENÇÃO_IGUAPE.join(", \n") ?? "",
    Manutenção_Informatica: responsibleList.MANUTENÇÃO_INFORMATICA.join(", \n") ?? "",
  };

  let isEmptySchedule: any = {
    // de inicio todos os setores são informados que são vazio até passar pela verificação aí assim poder separar quem está vazio e quem não esta
  };

  let sectors: string[] = [
    // de inicio vem vazio pois sera populado pelo switch dependendo o setor que foi selecionado
  ];

  switch (sector) {
    case "":
      sectors = [
        "Operacional_Apiaí",
        "Operacional_Juquiá",
        "Operacional_Juquitiba",
        "Operacional_Registro",
        "Operacional_São_Lourenço",
        "Operacional_Sete_Barras",
        "Operacional_Barra_do_Turvo",
        "Operacional_Cajati",
        "Operacional_Eldorado",
        "Operacional_Iporanga",
        "Operacional_Jacupiranga",
        "Operacional_Cananéia",
        "Operacional_Iguape",
        "Operacional_Ilha_Comprida",
        "Operacional_Pariquera_Açu",
        "Operacional_Itariri",
        "Operacional_Miracatu",
        "Operacional_Pedro_de_Toledo",
        "Operacional_Tapiraí",
        "Operacional_Barra_do_Chapéu",
        "Operacional_Itaoca",
        "Operacional_Itapirapuã_Paulista",
        "Operacional_Ribeira",
        "ETA_Apiaí",
        "ETA_Juquiá",
        "ETA_Juquitiba",
        "ETA_Registro",
        "ETA_São_Lourenço",
        "ETA_Sete_Barras",
        "ETA_Barra_do_Turvo",
        "ETA_Cajati",
        "ETA_Eldorado",
        "ETA_Iporanga",
        "ETA_Jacupiranga",
        "ETA_Cananéia",
        "ETA_Iguape",
        "ETA_Ilha_Comprida",
        "ETA_Pariquera_Açu",
        "ETA_Itariri",
        "ETA_Miracatu",
        "ETA_Pedro_de_Toledo",
        "ETA_Tapiraí",
        "ETA_Barra_do_Chapéu",
        "ETA_Itaoca",
        "ETA_Itapirapuã_Paulista",
        "ETA_Ribeira",
        "Transporte",
        "Controle_De_Perdas",
        "Manutenção_Apiaí",
        "Manutenção_Automação",
        "Manutenção_Eletromecânica",
        "Manutenção_Juquitiba_São_Lourenço",
        "Manutenção_Técnico",
        "Manutenção_Almoxarifado",
        "Manutenção_Canenéia",
        "Manutenção_Iguape",
        "Manutenção_Informatica",
      ];

      isEmptySchedule = {
        Transporte: true,
        Controle_De_Perdas: true,
        Operacional_Apiaí: true,
        Operacional_Juquiá: true,
        Operacional_Juquitiba: true,
        Operacional_Registro: true,
        Operacional_São_Lourenço: true,
        Operacional_Sete_Barras: true,
        Operacional_Barra_do_Turvo: true,
        Operacional_Cajati: true,
        Operacional_Eldorado: true,
        Operacional_Iporanga: true,
        Operacional_Jacupiranga: true,
        Operacional_Cananéia: true,
        Operacional_Iguape: true,
        Operacional_Ilha_Comprida: true,
        Operacional_Pariquera_Açu: true,
        Operacional_Itariri: true,
        Operacional_Miracatu: true,
        Operacional_Pedro_de_Toledo: true,
        Operacional_Tapiraí: true,
        Operacional_Barra_do_Chapéu: true,
        Operacional_Itaoca: true,
        Operacional_Itapirapuã_Paulista: true,
        Operacional_Ribeira: true,
        ETA_Apiaí: true,
        ETA_Juquiá: true,
        ETA_Juquitiba: true,
        ETA_Registro: true,
        ETA_São_Lourenço: true,
        ETA_Sete_Barras: true,
        ETA_Barra_do_Turvo: true,
        ETA_Cajati: true,
        ETA_Eldorado: true,
        ETA_Iporanga: true,
        ETA_Jacupiranga: true,
        ETA_Cananéia: true,
        ETA_Iguape: true,
        ETA_Ilha_Comprida: true,
        ETA_Pariquera_Açu: true,
        ETA_Itariri: true,
        ETA_Miracatu: true,
        ETA_Pedro_de_Toledo: true,
        ETA_Tapiraí: true,
        ETA_Barra_do_Chapéu: true,
        ETA_Itaoca: true,
        ETA_Itapirapuã_Paulista: true,
        ETA_Ribeira: true,
        Manutenção_Apiaí: true,
        Manutenção_Automação: true,
        Manutenção_Eletromecânica: true,
        Manutenção_Juquitiba_São_Lourenço: true,
        Manutenção_Técnico: true,
        Manutenção_Almoxarifado: true,
        Manutenção_Cananéia: true,
        Manutenção_Iguape: true,
        Manutenção_Informatica: true,
      };
      break;
    case "Operacional":
      sectors = [
        "Transporte",
        "Controle_De_Perdas",
        "Operacional_Apiaí",
        "Operacional_Juquiá",
        "Operacional_Juquitiba",
        "Operacional_Registro",
        "Operacional_São_Lourenço",
        "Operacional_Sete_Barras",
        "Operacional_Barra_do_Turvo",
        "Operacional_Cajati",
        "Operacional_Eldorado",
        "Operacional_Iporanga",
        "Operacional_Jacupiranga",
        "Operacional_Cananéia",
        "Operacional_Iguape",
        "Operacional_Ilha_Comprida",
        "Operacional_Pariquera_Açu",
        "Operacional_Itariri",
        "Operacional_Miracatu",
        "Operacional_Pedro_de_Toledo",
        "Operacional_Tapiraí",
        "Operacional_Barra_do_Chapéu",
        "Operacional_Itaoca",
        "Operacional_Itapirapuã_Paulista",
        "Operacional_Ribeira",
      ];

      isEmptySchedule = {
        Transporte: true,
        Controle_De_Perdas: true,
        Operacional_Apiaí: true,
        Operacional_Juquiá: true,
        Operacional_Juquitiba: true,
        Operacional_Registro: true,
        Operacional_São_Lourenço: true,
        Operacional_Sete_Barras: true,
        Operacional_Barra_do_Turvo: true,
        Operacional_Cajati: true,
        Operacional_Eldorado: true,
        Operacional_Iporanga: true,
        Operacional_Jacupiranga: true,
        Operacional_Cananéia: true,
        Operacional_Iguape: true,
        Operacional_Ilha_Comprida: true,
        Operacional_Pariquera_Açu: true,
        Operacional_Itariri: true,
        Operacional_Miracatu: true,
        Operacional_Pedro_de_Toledo: true,
        Operacional_Tapiraí: true,
        Operacional_Barra_do_Chapéu: true,
        Operacional_Itaoca: true,
        Operacional_Itapirapuã_Paulista: true,
        Operacional_Ribeira: true,
      };

      break;
    case "ETA":
      sectors = [
        "ETA_Apiaí",
        "ETA_Juquiá",
        "ETA_Juquitiba",
        "ETA_Registro",
        "ETA_São_Lourenço",
        "ETA_Sete_Barras",
        "ETA_Barra_do_Turvo",
        "ETA_Cajati",
        "ETA_Eldorado",
        "ETA_Iporanga",
        "ETA_Jacupiranga",
        "ETA_Cananéia",
        "ETA_Iguape",
        "ETA_Ilha_Comprida",
        "ETA_Pariquera_Açu",
        "ETA_Itariri",
        "ETA_Miracatu",
        "ETA_Pedro_de_Toledo",
        "ETA_Tapiraí",
        "ETA_Barra_do_Chapéu",
        "ETA_Itaoca",
        "ETA_Itapirapuã_Paulista",
        "ETA_Ribeira",
      ];

      isEmptySchedule = {
        ETA_Apiaí: true,
        ETA_Juquiá: true,
        ETA_Juquitiba: true,
        ETA_Registro: true,
        ETA_São_Lourenço: true,
        ETA_Sete_Barras: true,
        ETA_Barra_do_Turvo: true,
        ETA_Cajati: true,
        ETA_Eldorado: true,
        ETA_Iporanga: true,
        ETA_Jacupiranga: true,
        ETA_Cananéia: true,
        ETA_Iguape: true,
        ETA_Ilha_Comprida: true,
        ETA_Pariquera_Açu: true,
        ETA_Itariri: true,
        ETA_Miracatu: true,
        ETA_Pedro_de_Toledo: true,
        ETA_Tapiraí: true,
        ETA_Barra_do_Chapéu: true,
        ETA_Itaoca: true,
        ETA_Itapirapuã_Paulista: true,
        ETA_Ribeira: true,
      };
      break;
    case "Transporte":
      sectors = ["Transporte"];
    case "Controle De Perdas":
      sectors = ["Controle_De_Perdas"];

      isEmptySchedule = {
        Transporte: true,
        Controle_De_Perdas: true,
      };
      break;
    case "Manutenção":
      sectors = [
        "Manutenção_Apiaí",
        "Manutenção_Automação",
        "Manutenção_Eletromecânica",
        "Manutenção_Juquitiba_São_Lourenço",
        "Manutenção_Técnico",
        "Manutenção_Almoxarifado",
        "Manutenção_Cananéia",
        "Manutenção_Iguape",
        "Manutenção_Informatica",
      ];

      isEmptySchedule = {
        Manutenção_Apiaí: true,
        Manutenção_Automação: true,
        Manutenção_Eletromecânica: true,
        Manutenção_Juquitiba_São_Lourenço: true,
        Manutenção_Técnico: true,
        Manutenção_Almoxarifado: true,
        Manutenção_Cananéia: true,
        Manutenção_Iguape: true,
        Manutenção_Informatica: true,
      };
      break;
    default:
      sectors = [];
      isEmptySchedule = {};
  }

  for (let schedule of forms) {
    // verificar se existem escalas feitas em municipios juntos para não mostra-los como escala não feita
    let scheduleName = schedule.escala_participante
      .replaceAll(" - ", "_")
      .replaceAll(" / ", "_")
      .replaceAll("-", "_")
      .replaceAll(" ", "_")
      .replace("ETA_", "")
      .replace("Operacional_", "")
      .replace("Manutenção_", "");

    if (scheduleName === "Registro_Sete_Barras") {
      isEmptySchedule.ETA_Registro = false;
      isEmptySchedule.Operacional_Registro = false;
      isEmptySchedule.ETA_Sete_Barras = false;
      isEmptySchedule.Operacional_Sete_Barras = false;
    }

    if (scheduleName === "Juquitiba_São_Lourenço") {
      isEmptySchedule.ETA_Juquitiba = false;
      isEmptySchedule.Operacional_Juquitiba = false;
      isEmptySchedule.ETA_São_Lourenço = false;
      isEmptySchedule.Operacional_São_Lourenço = false;
    }

    if (scheduleName === "Cajati_Jacupiranga") {
      isEmptySchedule.ETA_Cajati = false;
      isEmptySchedule.Operacional_Cajati = false;
      isEmptySchedule.ETA_Jacupiranga = false;
      isEmptySchedule.Operacional_Jacupiranga = false;
    }

    if (scheduleName === "Ilha_Comprida_Pedrinhas") {
      isEmptySchedule.ETA_Ilha_Comprida = false;
      isEmptySchedule.Operacional_Ilha_Comprida = false;
    }

    if (scheduleName === "Ribeira_Itapirapuã_Paulista") {
      isEmptySchedule.ETA_Ribeira = false;
      isEmptySchedule.Operacional_Ribeira = false;
      isEmptySchedule.ETA_Itapirapuã_Paulista = false;
      isEmptySchedule.Operacional_Itapirapuã_Paulista = false;
    }

    if (scheduleName === "Iguape_Ilha_Comprida") {
      isEmptySchedule.ETA_Iguape = false;
      isEmptySchedule.Operacional_Iguape = false;
      isEmptySchedule.ETA_Ilha_Comprida = false;
      isEmptySchedule.Operacional_Ilha_Comprida = false;
    }

    // verifica se existe escalas feitas nos setores informados acima, caso sim ele seta falta no isEmptySchedule

    let scheduleConverted = schedule.escala_participante
      .replaceAll(" - ", "_")
      .replaceAll(" / ", "_")
      .replaceAll("-", "_")
      .replaceAll(" ", "_");

    let value = new RegExp(sectors.join("|")).test(scheduleConverted);

    if (value === true) {
      isEmptySchedule = {
        ...isEmptySchedule,
        [scheduleConverted]: false,
      };
    }
  }

  if (forms.length === 0 && sector != "Transporte" && sector != "Controle_De_Perdas" && sector != "Manutenção") {
    dismissLoadingNotify();
    throw new Error("vazio");
  }

  const usersInfo = await api.get("/employeesInfo").then((resp) => resp.data);

  // gradiente de cores das linhas
  let rowGradient = true;

  // o body só sera utilizado após todas as linhas serem finalizadas
  const body: any[] = [];

  // [ Plantao ] > [ Municipio ] > [ Funcionario ] > [ Data ] > [ Horarios ]
  let schedulesGroup = new Map();

  // Guarda as informações do funcionário
  let employeeInfo = new Map();

  // Seta as informações dos responsáveis (o método usado será temporário)
  employeeInfo.set("FERNANDO LUIZ RIBAS DE ANDRADE", {
    endereco: "Rua Azenir Ribas dos Santos, 15, Vila Ribas – Itaoca",
    telefone_1: "(15) 3557 2100",
    telefone_2: "99752 5028",
  });
  employeeInfo.set("GENIVALDO DE OLIVEIRA", {
    endereco: "Rua Bertolino Candido de Abreu, 392 – Barra do Turvo",
    telefone_1: "(15) 99736 3922 ",
    telefone_2: "98100 2220",
  });
  employeeInfo.set("SERGIO RICARDO COSTA", {
    endereco: "Rua Xiririca, 60 – Centro – Sete Barras",
    telefone_1: "(13) 98100 4446",
    telefone_2: null,
  });
  employeeInfo.set("VIKTOR PONTES KERSCHBAUM", {
    endereco: "R. Clodovel José de Lima, 134 – Morro São João – Cananéia",
    telefone_1: "(13) 98100 7445",
    telefone_2: "(13) 981004555",
  });
  employeeInfo.set("YURGIS KAIRYS", {
    endereco: "sem endereço",
    telefone_1: "(13) 98100 4544",
    telefone_2: null,
  });
  employeeInfo.set("LUIZ FERNANDO ALMEIDA LISBOA", {
    endereco: "RUA : ESTER YOUNG DA SILVA , 130 GUARICANA - IGUAPE",
    telefone_1: "(13) 98111 3453",
    telefone_2: null,
  });
  employeeInfo.set("TONI PECCA", {
    endereco: "Av Júlio Franco,1089, Rocio",
    telefone_1: "(13) 98100 4567",
    telefone_2: "13 38421112",
  });
  employeeInfo.set("GILBERTO ALVES DA SILVA", {
    endereco: "Rua Firmino Batista da Costa, 119 – Iporanga",
    telefone_1: "(15) 99758 4348",
    telefone_2: "(15) 98100 2221",
  });
  employeeInfo.set("FERNANDO LUIZ RIBAS DE ANDRADE", {
    endereco: "Rua Azenir Ribas dos Santos, 15, Vila Ribas – Itaoca",
    telefone_1: "(15) 3557 2100 ",
    telefone_2: "99752 5028",
  });
  employeeInfo.set("MOACYR RIBEIRO JUNIOR", {
    endereco: "Rua das Rosas, 84 – Vl Boa Esperança – Itariri",
    telefone_1: "99719 6667",
    telefone_2: "(13) 99718 4716",
  });
  employeeInfo.set("ARNALDO PEREIRA MENEGUETTI", {
    endereco: "Rua Nagir Dionisio Ferreira, 530 – Jd. São Carlos – Pariquera-Açu",
    telefone_1: "(13) 99708 8608",
    telefone_2: null,
  });
  employeeInfo.set("ANDERSON HENRIQUE RIBEIRO SOUZA", {
    endereco: "Av. Nossa Senhora Aparecida, 111 – Centro – Juquitiba",
    telefone_1: "(11) 94158 5214",
    telefone_2: "(11) 4681 4754",
  });
  employeeInfo.set("LEANDRO GONCALVES LOURENCO", {
    endereco: "sem endereço",
    telefone_1: "(11) 96345-3507",
    telefone_2: null,
  });
  employeeInfo.set("LAUDICI MESSIAS", {
    endereco: "R BENEDITO MOREIRA LEITE, 105 - JARDIM VOVÓ CLARINHA.",
    telefone_1: "(13) 99707 8438",
    telefone_2: null,
  });
  employeeInfo.set("SILVIO CESAR TEIXEIRA DE LIMA", {
    endereco: "R WASHINGTON LUÍS, 551 - VILA FORMOSA",
    telefone_1: "(15) 98100-2223",
    telefone_2: null,
  });
  employeeInfo.set("MOISES MARTINS TORRES", {
    endereco: "Rua Demi Chiodi, 120 - Cordeirópolis – Apiaí",
    telefone_1: "(15) 3552 2473",
    telefone_2: "99753 3119",
  });
  employeeInfo.set("LEANDRO ESTEVAM", {
    endereco: "Rua Padre Anchieta, 2798 – Peruíbe/SP",
    telefone_1: "(11) 95606 4497",
    telefone_2: "(13) 98100 4646",
  });
  employeeInfo.set("JOAO BATISTA SILVA", {
    endereco: "Rua   Jundiá, 105 – Jardim Caiçara II – Registro. ",
    telefone_1: "(13) 981004445",
    telefone_2: null,
  });
  employeeInfo.set("JOAO PEDRO MARQUES", {
    endereco: "sem endereço",
    telefone_1: "(13) 98110 2084",
    telefone_2: null,
  });
  employeeInfo.set("NATÁLIA MAXIMO DE SOUZA", {
    endereco: "Av. Centenário da Imigração Japonesa no Brasil, 315 - Centro ",
    telefone_1: "(15) 997784358",
    telefone_2: "(13) 981004664",
  });
  employeeInfo.set("REGINALDO DO NASCIMENTO DELFINO", {
    endereco: "R. Manoel Marques Patricio, 212 - Vl. Sanches - Juquiá",
    telefone_1: "(13) 98100-4666",
    telefone_2: null,
  });
  employeeInfo.set("REGINALDO DO NASCIMENTO DELFINO - JOSÉ CARLOS RIBEIRO", {
    endereco: "R. Manoel Marques Patricio, 212 - Vl. Sanches - Juquiá",
    telefone_1: "(13) 98100-4666, (13) 98100-4666",
    telefone_2: null,
  });
  employeeInfo.set("ADRIANO DE ALMEIDA DANTAS", {
    endereco: "",
    telefone_1: "13996745148",
    telefone_2: null,
  });
  employeeInfo.set("ERCIO GOULART SALES", {
    endereco: "sem endereço",
    telefone_1: "sem telefone",
    telefone_2: null,
  });
  employeeInfo.set("SEM INFORMACOES", {
    endereco: "",
    telefone_1: "",
    telefone_2: "",
  });

  for (let schedule of forms) {
    let done = false;

    let plantao = "";
    let municipio = "";
    let funcionario = schedule.funcionario;
    let data = schedule.data;

    // pegando o tipo de setor
    if (schedule.escala_participante != "Transporte" && schedule.escala_participante != "Controle_De_Perdas") {
      plantao = schedule.escala_participante.split(" -")[0];
      municipio = schedule.escala_participante.split(" -")[1]?.trim();
    } else {
      plantao = schedule.escala_participante;
      municipio = " ";
    }

    employeeInfo.set(funcionario, {
      endereco: usersInfo[schedule.n_pes_funcionario].endereco ?? "",
      telefone_1: usersInfo[schedule.n_pes_funcionario].telefone_1 ?? "",
      telefone_2: usersInfo[schedule.n_pes_funcionario].telefone_2 ?? "",
    });

    while (done === false) {
      // cria o primeiro Map [ Plantao ]
      if (schedulesGroup.has(plantao)) {
        // cria o segundo Map [ Municipio ]
        if (schedulesGroup.get(plantao).has(municipio)) {
          // cria o terceiro Map [ Funcionario ]
          if (schedulesGroup.get(plantao).get(municipio).has(funcionario)) {
            // cria o quarto Map [ Data ] e setando as horas
            if (schedulesGroup.get(plantao).get(municipio).get(funcionario).has(data)) {
              schedulesGroup.get(plantao).get(municipio).get(funcionario).get(data).push(schedule.horario);
              done = true;
            } else {
              schedulesGroup.get(plantao).get(municipio).get(funcionario).set(data, []);
            }
          } else {
            schedulesGroup.get(plantao).get(municipio).set(funcionario, new Map());
          }
        } else {
          schedulesGroup.get(plantao).set(municipio, new Map());
        }
      } else {
        schedulesGroup.set(plantao, new Map());
      }
    }
  }

  const generateETARows = () => {
    console.log("generating row ETA...");
    const rows = new Array();

    if (schedulesGroup.has("ETA")) {
      schedulesGroup.get("ETA").forEach((funcionario: Map<string, Map<string, string[]>>, municipio: "string") => {
        funcionario.forEach((data: Map<string, string[]>, funcionario: string) => {
          let employeeName: string = "";
          let scheduleOfDays: string[] = [];
          const row = new Array();

          let dia: string;
          let mes: string;
          let horarioEntrada1: string | undefined;
          let horarioSaida1: string | undefined;
          let horarioEntrada2: string | undefined;
          let horarioSaida2: string | undefined;

          employeeName = funcionario;

          data.forEach((horarios: string[], data: string) => {
            horarioEntrada1 = horarios[0].split("/")[0].split("-")[0]?.trim();
            horarioSaida1 = horarios[0].split("/")[1].split("-")[1]?.trim();
            horarioEntrada2 = horarios[1] != undefined ? horarios[1].split("/")[0].split("-")[0]?.trim() : undefined;
            horarioSaida2 = horarios[1] != undefined ? horarios[1]?.split("/")[1].split("-")[1]?.trim() : undefined;

            horarioSaida2 = horarioSaida2 === "24:00" ? "24:00" : horarioSaida2;
            horarioSaida1 = horarioSaida1 === "24:00" ? "24:00" : horarioSaida1;

            if (horarioSaida2 != undefined) {
              if (parseInt(horarioSaida2) < parseInt(horarioSaida1)) {
                horarioEntrada2 = horarios[0].split("/")[0].split("-")[0]?.trim();
                horarioSaida2 = horarios[0].split("/")[1].split("-")[1]?.trim();
                horarioEntrada1 = horarios[1] != undefined ? horarios[1].split("/")[0].split("-")[0]?.trim() : undefined;
                horarioSaida1 = horarios[1] != undefined ? horarios[1]?.split("/")[1].split("-")[1]?.trim() : undefined;
              }
            }

            horarioSaida2 = horarioSaida2 === "24:00" ? "24:00" : horarioSaida2;
            horarioSaida1 = horarioSaida1 === "24:00" ? "24:00" : horarioSaida1;

            let date = new Date(data);
            let dateUTC = new Date(date.setDate(date.getDate() + 1));

            dia = dateUTC.getDate().toString();
            mes = (dateUTC.getMonth() + 1).toString();

            parseInt(dia) < 10 ? (dia = "0" + dia) : dia;
            parseInt(mes) < 10 ? (mes = "0" + mes) : mes;

            scheduleOfDays.push(
              `${dia}/${mes}     ${horarioEntrada1} ás ${horarioSaida1} ${
                horarioEntrada2 != undefined ? `/ ${horarioEntrada2} ás ${horarioSaida2}` : ""
              }`
            );
          });
          let lineDateSchedule = `${scheduleOfDays.map((schedule) => {
            return `${schedule}\n`;
          })}`;

          let lineWithoutComma = lineDateSchedule.replaceAll(",", "");

          row.push({
            text: `ETA - ${municipio}
            Data:      Horário
            ${lineWithoutComma}`,
            style: rowGradient === true ? "row1" : "row2",
          });
          row.push({
            text: employeeName,
            style: rowGradient === true ? "rowEmployee1" : "rowEmployee2",
          });
          row.push({
            text: `${getEmployeeInfo(funcionario).endereco}\n${getEmployeeInfo(funcionario).telefone_1}${
              getEmployeeInfo(funcionario).telefone_2 != null ? "  -  " + getEmployeeInfo(funcionario).telefone_2 : ""
            }`,
            style: rowGradient === true ? "rowAddress1" : "rowAddress2",
          });

          rows.push(row);
        });
      });

      rows.forEach((row) => {
        body.push(row);
      });
    } else {
      console.log("without row to ETA");
    }
  };

  const generateOperacionalRows = () => {
    console.log("generating row Operacional...");
    const rows = new Array();

    if (schedulesGroup.has("Operacional")) {
      schedulesGroup.get("Operacional").forEach((funcionario: Map<string, Map<string, string[]>>, municipio: "string") => {
        funcionario.forEach((data: Map<string, string[]>, funcionario: string) => {
          let employeeName: string = "";
          let scheduleOfDays: string[] = [];
          const row = new Array();

          let dia: string;
          let mes: string;
          let horarioEntrada1: string | undefined;
          let horarioSaida1: string | undefined;
          let horarioEntrada2: string | undefined;
          let horarioSaida2: string | undefined;

          employeeName = funcionario;

          data.forEach((horarios: string[], data: string) => {
            horarioEntrada1 = horarios[0].split("/")[0].split("-")[0]?.trim();
            horarioSaida1 = horarios[0].split("/")[1].split("-")[1]?.trim();
            horarioEntrada2 = horarios[1] != undefined ? horarios[1].split("/")[0].split("-")[0]?.trim() : undefined;
            horarioSaida2 = horarios[1] != undefined ? horarios[1]?.split("/")[1].split("-")[1]?.trim() : undefined;

            horarioSaida2 = horarioSaida2 === "24:00" ? "24:00" : horarioSaida2;
            horarioSaida1 = horarioSaida1 === "24:00" ? "24:00" : horarioSaida1;

            if (horarioSaida2 != undefined) {
              if (parseInt(horarioSaida2) < parseInt(horarioSaida1)) {
                horarioEntrada2 = horarios[0].split("/")[0].split("-")[0]?.trim();
                horarioSaida2 = horarios[0].split("/")[1].split("-")[1]?.trim();
                horarioEntrada1 = horarios[1] != undefined ? horarios[1].split("/")[0].split("-")[0]?.trim() : undefined;
                horarioSaida1 = horarios[1] != undefined ? horarios[1]?.split("/")[1].split("-")[1]?.trim() : undefined;
              }
            }

            horarioSaida2 = horarioSaida2 === "24:00" ? "24:00" : horarioSaida2;
            horarioSaida1 = horarioSaida1 === "24:00" ? "24:00" : horarioSaida1;

            let date = new Date(data);
            let dateUTC = new Date(date.setDate(date.getDate() + 1));

            dia = dateUTC.getDate().toString();
            mes = (dateUTC.getMonth() + 1).toString();

            parseInt(dia) < 10 ? (dia = "0" + dia) : dia;
            parseInt(mes) < 10 ? (mes = "0" + mes) : mes;

            scheduleOfDays.push(
              `${dia}/${mes}     ${horarioEntrada1} ás ${horarioSaida1} ${
                horarioEntrada2 != undefined ? `/ ${horarioEntrada2} ás ${horarioSaida2}` : ""
              }`
            );
          });
          let lineDateSchedule = `${scheduleOfDays.map((schedule) => {
            return `${schedule}\n`;
          })}`;

          let lineWithoutComma = lineDateSchedule.replaceAll(",", "");

          row.push({
            text: `Operacional - ${municipio}
            Data:      Horário
            ${lineWithoutComma}`,
            style: rowGradient === true ? "row1" : "row2",
          });
          row.push({
            text: employeeName,
            style: rowGradient === true ? "rowEmployee1" : "rowEmployee2",
          });
          row.push({
            text: `${getEmployeeInfo(funcionario).endereco}\n${getEmployeeInfo(funcionario).telefone_1}${
              getEmployeeInfo(funcionario).telefone_2 != null ? "  -  " + getEmployeeInfo(funcionario).telefone_2 : ""
            }`,
            style: rowGradient === true ? "rowAddress1" : "rowAddress2",
          });

          rows.push(row);
        });
      });

      rows.forEach((row) => {
        body.push(row);
      });
    } else {
      console.log("without row to Operacional");
    }
  };

  const generateManutençãoRows = () => {
    console.log("generating row Manutenção...");
    const rows = new Array();

    if (schedulesGroup.has("Manutenção")) {
      schedulesGroup.get("Manutenção").forEach((funcionario: Map<string, Map<string, string[]>>, municipio: "string") => {
        funcionario.forEach((data: Map<string, string[]>, funcionario: string) => {
          let employeeName: string = "";
          let scheduleOfDays: string[] = [];
          const row = new Array();

          let dia: string;
          let mes: string;
          let horarioEntrada1: string | undefined;
          let horarioSaida1: string | undefined;
          let horarioEntrada2: string | undefined;
          let horarioSaida2: string | undefined;

          employeeName = funcionario;

          data.forEach((horarios: string[], data: string) => {
            horarioEntrada1 = horarios[0].split("/")[0].split("-")[0]?.trim();
            horarioSaida1 = horarios[0].split("/")[1].split("-")[1]?.trim();
            horarioEntrada2 = horarios[1] != undefined ? horarios[1].split("/")[0].split("-")[0]?.trim() : undefined;
            horarioSaida2 = horarios[1] != undefined ? horarios[1]?.split("/")[1].split("-")[1]?.trim() : undefined;

            horarioSaida2 = horarioSaida2 === "24:00" ? "24:00" : horarioSaida2;
            horarioSaida1 = horarioSaida1 === "24:00" ? "24:00" : horarioSaida1;

            if (horarioSaida2 != undefined) {
              if (parseInt(horarioSaida2) < parseInt(horarioSaida1)) {
                horarioEntrada2 = horarios[0].split("/")[0].split("-")[0]?.trim();
                horarioSaida2 = horarios[0].split("/")[1].split("-")[1]?.trim();
                horarioEntrada1 = horarios[1] != undefined ? horarios[1].split("/")[0].split("-")[0]?.trim() : undefined;
                horarioSaida1 = horarios[1] != undefined ? horarios[1]?.split("/")[1].split("-")[1]?.trim() : undefined;
              }
            }

            horarioSaida2 = horarioSaida2 === "24:00" ? "24:00" : horarioSaida2;
            horarioSaida1 = horarioSaida1 === "24:00" ? "24:00" : horarioSaida1;

            let date = new Date(data);
            let dateUTC = new Date(date.setDate(date.getDate() + 1));

            dia = dateUTC.getDate().toString();
            mes = (dateUTC.getMonth() + 1).toString();

            parseInt(dia) < 10 ? (dia = "0" + dia) : dia;
            parseInt(mes) < 10 ? (mes = "0" + mes) : mes;

            scheduleOfDays.push(
              `${dia}/${mes}     ${horarioEntrada1} ás ${horarioSaida1} ${
                horarioEntrada2 != undefined ? `/ ${horarioEntrada2} ás ${horarioSaida2}` : ""
              }`
            );
          });
          let lineDateSchedule = `${scheduleOfDays.map((schedule) => {
            return `${schedule}\n`;
          })}`;

          let lineWithoutComma = lineDateSchedule.replaceAll(",", "");

          row.push({
            text: `Manutenção - ${municipio}
            Data:      Horário
            ${lineWithoutComma}`,
            style: rowGradient === true ? "row1" : "row2",
          });
          row.push({
            text: employeeName,
            style: rowGradient === true ? "rowEmployee1" : "rowEmployee2",
          });
          row.push({
            text: `${getEmployeeInfo(funcionario).endereco}\n${getEmployeeInfo(funcionario).telefone_1}${
              getEmployeeInfo(funcionario).telefone_2 != null ? "  -  " + getEmployeeInfo(funcionario).telefone_2 : ""
            }`,
            style: rowGradient === true ? "rowAddress1" : "rowAddress2",
          });

          rows.push(row);
        });
      });

      rows.forEach((row) => {
        body.push(row);
      });
    } else {
      console.log("without row to Manutenção");
    }
  };

  const generateControlePerdasRows = () => {
    console.log("generating row generateControlePerdasRows...");
    const rows = new Array();

    console.log('schedulesGroup')
    console.log(schedulesGroup)

    if (schedulesGroup.has("Controle De Perdas")) {
      schedulesGroup.get("Controle De Perdas").forEach((funcionario: Map<string, Map<string, string[]>>, municipio: "string") => {
        funcionario.forEach((data: Map<string, string[]>, funcionario: string) => {
          let employeeName: string = "";
          let scheduleOfDays: string[] = [];
          const row = new Array();

          let dia: string;
          let mes: string;
          let horarioEntrada1: string | undefined;
          let horarioSaida1: string | undefined;
          let horarioEntrada2: string | undefined;
          let horarioSaida2: string | undefined;

          employeeName = funcionario;

          data.forEach((horarios: string[], data: string) => {
            horarioEntrada1 = horarios[0].split("/")[0].split("-")[0]?.trim();
            horarioSaida1 = horarios[0].split("/")[1].split("-")[1]?.trim();
            horarioEntrada2 = horarios[1] != undefined ? horarios[1].split("/")[0].split("-")[0]?.trim() : undefined;
            horarioSaida2 = horarios[1] != undefined ? horarios[1]?.split("/")[1].split("-")[1]?.trim() : undefined;

            horarioSaida2 = horarioSaida2 === "24:00" ? "24:00" : horarioSaida2;
            horarioSaida1 = horarioSaida1 === "24:00" ? "24:00" : horarioSaida1;

            if (horarioSaida2 != undefined) {
              if (parseInt(horarioSaida2) < parseInt(horarioSaida1)) {
                horarioEntrada2 = horarios[0].split("/")[0].split("-")[0]?.trim();
                horarioSaida2 = horarios[0].split("/")[1].split("-")[1]?.trim();
                horarioEntrada1 = horarios[1] != undefined ? horarios[1].split("/")[0].split("-")[0]?.trim() : undefined;
                horarioSaida1 = horarios[1] != undefined ? horarios[1]?.split("/")[1].split("-")[1]?.trim() : undefined;
              }
            }

            horarioSaida2 = horarioSaida2 === "24:00" ? "24:00" : horarioSaida2;
            horarioSaida1 = horarioSaida1 === "24:00" ? "24:00" : horarioSaida1;

            let date = new Date(data);
            let dateUTC = new Date(date.setDate(date.getDate() + 1));

            dia = dateUTC.getDate().toString();
            mes = (dateUTC.getMonth() + 1).toString();

            parseInt(dia) < 10 ? (dia = "0" + dia) : dia;
            parseInt(mes) < 10 ? (mes = "0" + mes) : mes;

            scheduleOfDays.push(
              `${dia}/${mes}     ${horarioEntrada1} ás ${horarioSaida1} ${
                horarioEntrada2 != undefined ? `/ ${horarioEntrada2} ás ${horarioSaida2}` : ""
              }`
            );
          });
          let lineDateSchedule = `${scheduleOfDays.map((schedule) => {
            return `${schedule}\n`;
          })}`;

          let lineWithoutComma = lineDateSchedule.replaceAll(",", "");

          row.push({
            text: `Controle De Perdas
            Data:      Horário
            ${lineWithoutComma}`,
            style: rowGradient === true ? "row1" : "row2",
          });
          row.push({
            text: employeeName,
            style: rowGradient === true ? "rowEmployee1" : "rowEmployee2",
          });
          row.push({
            text: `${getEmployeeInfo(funcionario).endereco}\n${getEmployeeInfo(funcionario).telefone_1}${
              getEmployeeInfo(funcionario).telefone_2 != null ? "  -  " + getEmployeeInfo(funcionario).telefone_2 : ""
            }`,
            style: rowGradient === true ? "rowAddress1" : "rowAddress2",
          });

          rows.push(row);
        });
      });

      rows.forEach((row) => {
        body.push(row);
      });
    } else {
      console.log("without row to Transporte");
    }
  };
  const generateTransporteRows = () => {
    console.log("generating row Trasporte...");
    const rows = new Array();

    if (schedulesGroup.has("Transporte")) {
      schedulesGroup.get("Transporte").forEach((funcionario: Map<string, Map<string, string[]>>, municipio: "string") => {
        funcionario.forEach((data: Map<string, string[]>, funcionario: string) => {
          let employeeName: string = "";
          let scheduleOfDays: string[] = [];
          const row = new Array();

          let dia: string;
          let mes: string;
          let horarioEntrada1: string | undefined;
          let horarioSaida1: string | undefined;
          let horarioEntrada2: string | undefined;
          let horarioSaida2: string | undefined;

          employeeName = funcionario;

          data.forEach((horarios: string[], data: string) => {
            horarioEntrada1 = horarios[0].split("/")[0].split("-")[0]?.trim();
            horarioSaida1 = horarios[0].split("/")[1].split("-")[1]?.trim();
            horarioEntrada2 = horarios[1] != undefined ? horarios[1].split("/")[0].split("-")[0]?.trim() : undefined;
            horarioSaida2 = horarios[1] != undefined ? horarios[1]?.split("/")[1].split("-")[1]?.trim() : undefined;

            horarioSaida2 = horarioSaida2 === "24:00" ? "24:00" : horarioSaida2;
            horarioSaida1 = horarioSaida1 === "24:00" ? "24:00" : horarioSaida1;

            if (horarioSaida2 != undefined) {
              if (parseInt(horarioSaida2) < parseInt(horarioSaida1)) {
                horarioEntrada2 = horarios[0].split("/")[0].split("-")[0]?.trim();
                horarioSaida2 = horarios[0].split("/")[1].split("-")[1]?.trim();
                horarioEntrada1 = horarios[1] != undefined ? horarios[1].split("/")[0].split("-")[0]?.trim() : undefined;
                horarioSaida1 = horarios[1] != undefined ? horarios[1]?.split("/")[1].split("-")[1]?.trim() : undefined;
              }
            }

            horarioSaida2 = horarioSaida2 === "24:00" ? "24:00" : horarioSaida2;
            horarioSaida1 = horarioSaida1 === "24:00" ? "24:00" : horarioSaida1;

            let date = new Date(data);
            let dateUTC = new Date(date.setDate(date.getDate() + 1));

            dia = dateUTC.getDate().toString();
            mes = (dateUTC.getMonth() + 1).toString();

            parseInt(dia) < 10 ? (dia = "0" + dia) : dia;
            parseInt(mes) < 10 ? (mes = "0" + mes) : mes;

            scheduleOfDays.push(
              `${dia}/${mes}     ${horarioEntrada1} ás ${horarioSaida1} ${
                horarioEntrada2 != undefined ? `/ ${horarioEntrada2} ás ${horarioSaida2}` : ""
              }`
            );
          });
          let lineDateSchedule = `${scheduleOfDays.map((schedule) => {
            return `${schedule}\n`;
          })}`;

          let lineWithoutComma = lineDateSchedule.replaceAll(",", "");

          row.push({
            text: `Transporte - ${municipio}
            Data:      Horário
            ${lineWithoutComma}`,
            style: rowGradient === true ? "row1" : "row2",
          });
          row.push({
            text: employeeName,
            style: rowGradient === true ? "rowEmployee1" : "rowEmployee2",
          });
          row.push({
            text: `${getEmployeeInfo(funcionario).endereco}\n${getEmployeeInfo(funcionario).telefone_1}${
              getEmployeeInfo(funcionario).telefone_2 != null ? "  -  " + getEmployeeInfo(funcionario).telefone_2 : ""
            }`,
            style: rowGradient === true ? "rowAddress1" : "rowAddress2",
          });

          rows.push(row);
        });
      });

      rows.forEach((row) => {
        body.push(row);
      });
    } else {
      console.log("without row to Transporte");
    }
  };

  const getEmployeeInfo = (employeeName: string) => {
    if (employeeName) {
      return employeeInfo.get(employeeName.replace(",", " -").replace(", ", " -").replace("\n", ""));
    }
  };

  generateControlePerdasRows();
  generateTransporteRows();
  generateETARows();
  generateOperacionalRows();
  generateManutençãoRows();

  dismissLoadingNotify();

  for (let schedule in isEmptySchedule) {
    const rows = new Array();

    let responsibleName = responsibleOfSchedule[schedule];

    if (getEmployeeInfo(responsibleName) === undefined) {
      responsibleName = "SEM INFORMACOES";
    }

    if (isEmptySchedule[schedule] === true && schedule != "Transporte" && schedule != "Controle De Perdas") {
      rows.push({
        text: `${schedule.replace("_", " - ").replace("_São", " / São ").replace("_", " ").replace("_", " ")}\nsem escala`,
        style: rowGradient === true ? "row1" : "row2",
      });
      rows.push({
        text: `${responsibleOfSchedule[schedule]}`,
        style: rowGradient === true ? "rowEmployee1" : "rowEmployee2",
      });
      rows.push({
        // text: ``,
        text: `${getEmployeeInfo(responsibleName)?.endereco}\n${getEmployeeInfo(responsibleName)?.telefone_1}${
          getEmployeeInfo(responsibleName)?.telefone_2 != null ? "  -  " + getEmployeeInfo(responsibleName).telefone_2 : ""
        }`,
        style: "rowAddress1",
      });
      body.push(rows);
      rowGradient = !rowGradient;
    }
  }

  if (isEmptySchedule.Transporte === true) {
    const rows = new Array();
    rows.push({
      text: `Transporte\nsem escala`,
      style: rowGradient === true ? "row1" : "row2",
    });
    rows.push({
      text: `${responsibleOfSchedule.Transporte}`,
      style: rowGradient === true ? "rowEmployee1" : "rowEmployee2",
    });
    rows.push({
      text: ``,
      style: "rowAddress1",
    });
    body.unshift(rows);
    rowGradient = !rowGradient;
  }

  if (isEmptySchedule.CONTROLE_DE_PERDAS === true) {
    const rows = new Array();
    rows.push({
      text: `Controle de Perdas\nsem escala`,
      style: rowGradient === true ? "row1" : "row2",
    });
    rows.push({
      text: `${responsibleOfSchedule.CONTROLE_DE_PERDAS}`,
      style: rowGradient === true ? "rowEmployee1" : "rowEmployee2",
    });
    rows.push({
      text: ``,
      style: "rowAddress1",
    });
    body.unshift(rows);
    rowGradient = !rowGradient;
  }

  body.sort(function (a, b) {
    let x = a[0].text.toLowerCase();
    let y = b[0].text.toLowerCase();

    if (y == "transporte\nsem escala") {
      return 0;
    }

    if (y == "Controle De Perdas\nsem escala") {
      return 0;
    }

    if (x == "transporte\nsem escala") {
      return 0;
    }

    if (x == "Controle De Perdas\nsem escala") {
      return 0;
    }

    if (y.includes("transporte")) {
      return 0;
    }

    if (y.includes("Controle De Perdas")) {
      return 0;
    }

    // if (y.includes("operacional")) {
    //   return 0;
    // }

    if (y.includes("manutenção")) {
      return 1;
    }

    if (x.includes("manutenção")) {
      return 1;
    }

    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });

  // reaplicar o gradient de cores por conta do sort que foi feito em ordem alfabética
  let rowGradient2: boolean = false;
  for (let schedule of body) {
    if (rowGradient2 === true) {
      schedule[0].style = "row1";
      schedule[1].style = "rowEmployee1";
      schedule[2].style = "rowAddress1";
      rowGradient2 = false;
    } else {
      schedule[0].style = "row2";
      schedule[1].style = "rowEmployee2";
      schedule[2].style = "rowAddress2";
      rowGradient2 = true;
    }
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

  const addPadding = (number: number) => {
    if (number < 10) {
      return "0" + number;
    } else {
      return JSON.stringify(number);
    }
  };

  let totalDaysOfMonth = new Date(year, monthStart, 0).getDate(); // total de dias do mês

  const endDate = dayEnd - 1 > totalDaysOfMonth ? dayEnd - 1 - totalDaysOfMonth : dayEnd - 1;

  const docDefinitions: TDocumentDefinitions = {
    pageSize: "A4",
    pageMargins: [30, 60, 30, 40],
    header: {
      margin: [30, 10, 30, 20],
      table: {
        widths: [70, "*", 140],
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
              text: `UNIDADE DE NEGÓCIO VALE DO RIBEIRA - RR\n Escala de plantão Semanal`,
              style: "headerTitle",
            },
            {
              text: `Invervalo de Dias:       Mês/Ano: ${
                addPadding(dayStart) +
                "/" +
                addPadding(monthStart) +
                " - " +
                addPadding(endDate) +
                "/" +
                addPadding(dayEnd - 1 > totalDaysOfMonth ? (monthEnd + 1 > 12 ? 1 : monthEnd + 1) : monthEnd)
              }              ${("00" + monthStart).slice(-2)}/${year}`, // adiciona 0 (zeros) a esquerca caso se
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
                text: `Página: ${currentPage} de ${pageCount} - ${sector} : ${monthStart}/${year}`,
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
                text: `${sector === "Transporte" ? "Transporte" : sector === "Controle_De_Perdas" ? "Controle De Perdas" : `PLANTÃO ${sector.toLocaleUpperCase()}`}`,
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
          widths: [150, 120, "*"],
          body: [
            [
              {
                text: "PLANTÃO",
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
          widths: [151, 120, "*"],
          body: [...body],
          dontBreakRows: true,
        },
      },
      {
        style: "footer",
        height: 50,
        margin: [0, 20, 0, 0],
        unbreakable: true,
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: "",
                style: "footerTitle",
                border: [false, false, false, false],
                // pageBreak: 'before',
              },
            ],
          ],
        },
      },
      {
        style: "footer",
        margin: [0, 0, 0, 0],
        unbreakable: true,
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: "Acionar somente a CAU, através dos telefones",
                style: "footerTitle",
                border: [true, true, true, false],
                // pageBreak: 'before',
              },
            ],
            [
              {
                text: "(11) 5683-3222 ou (11) 5683-3111",
                style: "footerInfo",
                border: [true, false, true, false],
              },
            ],
            [
              {
                text: "CAU aciona o Plantão Técnico, que aciona o plantonista da Eletromecânica e/ou Automação.",
                style: "footerInfo",
                border: [true, false, true, false],
              },
            ],
            [
              {
                text: holidays.length > 0 ? "obs:" : "",
                style: "footerObs",
                border: holidays.length > 0 ? [true, false, true, false] : [true, false, true, false],
              },
            ],
            [
              holidays.map((holiday) => {
                return {
                  text: drawHolidayDay(holiday),
                  style: "holidays",
                  border: [true, false, true, false],
                };
              }),
            ],
            [
              {
                text: "Acionamento do Plantão",
                style: "footerTitle",
                border: [true, false, true, false],
              },
            ],
            [
              {
                text: "- O CCO aciona o platonista (Operacional, ETA, Transportes, Controle De Perdas, Automação ou Eletromecânica) e comunica a ocorrência ao Gerente e Encarregado da respectiva unidade.",
                style: "footerInfo",
                border: [true, false, true, false],
              },
            ],
            [
              {
                text: "- Ligar para os telefones no 3828-7701, 3828-7718 e celular (13) 99686-6224 (CCO - Centro de Controle Operacional), descrevendo o problema com detalhes",
                style: "footerInfo",
                border: [true, false, true, true],
              },
            ],
            [
              {
                text: `Registro, ${dateNow.getUTCDate()} de ${getMonthName(dateNow.getUTCMonth())} de ${dateNow.getUTCFullYear()}`,
                style: "footerInfo",
                border: [true, false, true, false],
                margin: [0, 2, 0, 5],
              },
            ],
            [
              {
                text: "Edson Rodrigues Calixto",
                style: "footerInfo",
                border: [true, false, true, false],
                bold: true,
              },
            ],
            [
              {
                text: "Gestão de Recursos Humanos",
                style: "footerInfo",
                border: [true, false, true, false],
              },
            ],
            [
              {
                text: "RRA^650",
                style: "footerInfo",
                border: [true, false, true, false],
              },
            ],
            [
              {
                text: "VIA OUTLOOK",
                style: "footerInfoUnderline",
                border: [true, false, true, true],
                italics: true,
                bold: true,
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
        margin: [3, 7, 3, 5],
        lineHeight: 1.2,
        fillColor: "#d3e3eb",
      },
      row2: {
        fontSize: 8,
        alignment: "left",
        margin: [3, 7, 3, 5],
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
      rowAddress1: {
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
      footer: {
        margin: [0, 0, 0, 0],
      },
      footerTitle: {
        fontSize: 9,
        decoration: "underline",
        margin: [0, 2, 0, 0],
      },
      footerInfo: {
        fontSize: 8,
        margin: [3, 0, 10, 3],
      },
      footerInfoUnderline: {
        fontSize: 8,
        margin: [3, 0, 10, 3],
        decoration: "underline",
      },
      footerObs: {
        fontSize: 8,
        margin: [0, 0, 0, 0],
      },
      holidaysTitle: {
        fontSize: 8,
        alignment: "left",
        margin: [0, 5, 0, 1],
      },
      holidays: {
        fontSize: 8,
        alignment: "left",
        margin: [0, 3, 0, 3],
      },
    },
  };
  pdfMake.createPdf(docDefinitions).open();
}
