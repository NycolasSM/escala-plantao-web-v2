type sectorType = {
  name: string;
  sector?: boolean;
  manutencao?: boolean;
  parentId?: number;
};

export const data: sectorType[] = [
  {
    name: 'Operacional',
    sector: true,
  },
  {
    name: 'ETA',
    sector: true,
  },
  {
    name: 'Transporte',
  },
  {
    name: 'Controle_De_Perdas',
  },
  {
    name: 'Manutenção',
    sector: true,
  },
  {
    name: 'Almoxarifado',
    parentId: 2,
    manutencao: true,
  },
  {
    name: 'Apiaí',
    parentId: 2,
    manutencao: true,
  },
  {
    name: 'Automação',
    parentId: 2,
    manutencao: true,
  },
  {
    name: 'Cananéia',
    parentId: 2,
    manutencao: true,
  },
  {
    name: 'Eletromecânica',
    parentId: 2,
    manutencao: true,
  },
  {
    name: 'Iguape',
    parentId: 2,
    manutencao: true,
  },
  {
    name: 'Informatica',
    parentId: 2,
    manutencao: true,
  },
  {
    name: 'Técnico',
    parentId: 2,
    manutencao: true,
  },
  {
    name: 'Juquitiba / São Lourenço',
    parentId: 2,
    manutencao: true,
  },
  {
    name: 'Setor 2',
    sector: true,
  },
  {
    name: 'Juquitiba',
    parentId: 3,
  },
  {
    name: 'Registro',
    parentId: 3,
  },
  {
    name: 'São Lourenço',
    parentId: 3,
  },
  {
    name: 'Sete Barras',
    parentId: 3,
  },
  {
    name: 'Registro / Sete Barras',
    parentId: 3,
  },
  {
    name: 'Setor 3',
    sector: true,
  },
  {
    name: 'Barra do Turvo',
    parentId: 8,
  },
  {
    name: 'Cajati',
    parentId: 8,
  },
  {
    name: 'Eldorado',
    parentId: 8,
  },
  {
    name: 'Iporanga',
    parentId: 8,
  },
  {
    name: 'Jacupiranga',
    parentId: 8,
  },
  {
    name: 'Cajati / Jacupiranga',
    parentId: 8,
  },
  {
    name: 'Setor 4',
    sector: true,
  },
  {
    name: 'Cananéia',
    parentId: 14,
  },
  {
    name: 'Iguape',
    parentId: 14,
  },
  {
    name: 'Ilha Comprida',
    parentId: 14,
  },
  {
    name: 'Pariquera-Açu',
    parentId: 14,
  },
  {
    name: 'Iguape / Ilha Comprida',
    parentId: 14,
  },
  {
    name: 'Ilha Comprida / Pedrinhas',
    parentId: 14,
  },
  {
    name: 'Setor 5',
    sector: true,
  },
  {
    name: 'Itariri',
    parentId: 19,
  },
  {
    name: 'Juquiá',
    parentId: 19,
  },
  {
    name: 'Miracatu',
    parentId: 19,
  },
  {
    name: 'Pedro de Toledo',
    parentId: 19,
  },
  {
    name: 'Tapiraí',
    parentId: 19,
  },
  {
    name: 'Setor 6',
    sector: true,
  },
  {
    name: 'Apiaí',
    parentId: 25,
  },
  {
    name: 'Barra do Chapéu',
    parentId: 25,
  },
  {
    name: 'Itaoca',
    parentId: 25,
  },
  {
    name: 'Itapirapuã Paulista',
    parentId: 25,
  },
  {
    name: 'Ribeira',
    parentId: 25,
  },
  {
    name: 'Ribeira / Itapirapuã Paulista',
    parentId: 25,
  },
  {
    name: 'Ribeira / Itaoca',
    parentId: 25,
  },
];
