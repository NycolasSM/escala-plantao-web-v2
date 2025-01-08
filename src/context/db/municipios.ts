export type DivisaoType = {
  municipio: string;
  divisao: string;
  setor: string;
  cod_atc: string;
};

type DivisoesType = {
  divisao_rr: DivisaoType[];
  divisao_ra: DivisaoType[];
};

// ordenação por setor e ordem alfabética

export const municipios: DivisoesType = {
  divisao_rr: [
    {
      municipio: 'JUQUITIBA - 410',
      setor: 'RRDO2',
      divisao: 'RRDO',
      cod_atc: '410',
    },
    {
      municipio: 'REGISTRO - 574',
      setor: 'RRDO2',
      divisao: 'RRDO',
      cod_atc: '574',
    },
    {
      municipio: 'SAO LOURENCO DA SERRA - 772',
      setor: 'RRDO2',
      divisao: 'RRDO',
      cod_atc: '772',
    },
    {
      municipio: 'SETE BARRAS - 665',
      setor: 'RRDO2',
      divisao: 'RRDO',
      cod_atc: '665',
    },
    {
      municipio: 'BARRA DO TURVO - 203',
      setor: 'RRDO3',
      divisao: 'RRDO',
      cod_atc: '203',
    },
    {
      municipio: 'CAJATI - 726',
      setor: 'RRDO3',
      divisao: 'RRDO',
      cod_atc: '726',
    },
    {
      municipio: 'ELDORADO - 296',
      setor: 'RRDO3',
      divisao: 'RRDO',
      cod_atc: '296',
    },
    {
      municipio: 'IPORANGA - 360',
      setor: 'RRDO3',
      divisao: 'RRDO',
      cod_atc: '360',
    },
    {
      municipio: 'JACUPIRANGA - 394',
      setor: 'RRDO3',
      divisao: 'RRDO',
      cod_atc: '394',
    },
    {
      municipio: 'CANANEIA - 248',
      setor: 'RRDO4',
      divisao: 'RRDO',
      cod_atc: '248',
    },
    {
      municipio: 'IGUAPE - 351',
      setor: 'RRDO4',
      divisao: 'RRDO',
      cod_atc: '351',
    },
    {
      municipio: 'ILHA COMPRIDA - 728',
      setor: 'RRDO4',
      divisao: 'RRDO',
      cod_atc: '728',
    },
    {
      municipio: 'PARIQUERA-ACU - 510',
      setor: 'RRDO4',
      divisao: 'RRDO',
      cod_atc: '510',
    },
    {
      municipio: 'ITARIRI - 381',
      setor: 'RRDO5',
      divisao: 'RRDO',
      cod_atc: '381',
    },
    {
      municipio: 'JUQUIA - 409',
      setor: 'RRDO5',
      divisao: 'RRDO',
      cod_atc: '409',
    },
    {
      municipio: 'MIRACATU - 448',
      setor: 'RRDO5',
      divisao: 'RRDO',
      cod_atc: '448',
    },
    {
      municipio: 'PEDRO DE TOLEDO - 520',
      setor: 'RRDO5',
      divisao: 'RRDO',
      cod_atc: '520',
    },

    {
      municipio: 'TAPIRAI - 682',
      setor: 'RRDO5',
      divisao: 'RRDO',
      cod_atc: '682',
    },
    {
      municipio: 'APIAI - 176',
      setor: 'RRDO6',
      divisao: 'RRDO',
      cod_atc: '176',
    },
    {
      municipio: 'BARRA DO CHAPEU - 750',
      setor: 'RRDO6',
      divisao: 'RRDO',
      cod_atc: '750',
    },
    {
      municipio: 'ITAOCA - 753',
      setor: 'RRDO6',
      divisao: 'RRDO',
      cod_atc: '753',
    },
    {
      municipio: 'ITAPIRAPUA PAULISTA - 751',
      setor: 'RRDO6',
      divisao: 'RRDO',
      cod_atc: '751',
    },
    {
      municipio: 'RIBEIRA - 576',
      setor: 'RRDO6',
      divisao: 'RRDO',
      cod_atc: '576',
    },
  ],
  divisao_ra: [
    {
      municipio: 'ARANDU - 180',
      setor: 'RADA1',
      divisao: 'RADA',
      cod_atc: '180',
    },
    {
      municipio: 'AVARE - 194',
      setor: 'RADA1',
      divisao: 'RADA',
      cod_atc: '194',
    },
    {
      municipio: 'AGUAS DE STA BARBARA - 607',
      setor: 'RADA3',
      divisao: 'RADA',
      cod_atc: '607',
    },
    {
      municipio: 'BERNARDINO DE CAMPOS - 212',
      setor: 'RADA3',
      divisao: 'RADA',
      cod_atc: '212',
    },
    {
      municipio: 'FARTURA - 302',
      setor: 'RADA3',
      divisao: 'RADA',
      cod_atc: '302',
    },
    {
      municipio: 'IARAS - 742',
      setor: 'RADA3',
      divisao: 'RADA',
      cod_atc: '742',
    },
    {
      municipio: 'OLEO - 486',
      setor: 'RADA3',
      divisao: 'RADA',
      cod_atc: '486',
    },
    {
      municipio: 'SARUTAIA - 659',
      setor: 'RADA3',
      divisao: 'RADA',
      cod_atc: '659',
    },
    {
      municipio: 'TEJUPA - 689',
      setor: 'RADA3',
      divisao: 'RADA',
      cod_atc: '689',
    },
    {
      municipio: 'TIMBURI - 693',
      setor: 'RADA3',
      divisao: 'RADA',
      cod_atc: '693',
    },
    {
      municipio: 'PIRAJU - 537',
      setor: 'RADA3',
      divisao: 'RADA',
      cod_atc: '537',
    },
    {
      municipio: 'ESPIRITO STO TURVO - 724',
      setor: 'RADA4',
      divisao: 'RADA',
      cod_atc: '724',
    },
    {
      municipio: 'ALVINLANDIA - 164',
      setor: 'RADA4',
      divisao: 'RADA',
      cod_atc: '164',
    },
    {
      municipio: 'DUARTINA - 781',
      setor: 'RADA4',
      divisao: 'RADA',
      cod_atc: '781',
    },
    {
      municipio: 'FERNAO - 765',
      setor: 'RADA4',
      divisao: 'RADA',
      cod_atc: '765',
    },
    {
      municipio: 'GALIA - 314',
      setor: 'RADA4',
      divisao: 'RADA',
      cod_atc: '314',
    },
    {
      municipio: 'LUCIANOPOLIS - 423',
      setor: 'RADA4',
      divisao: 'RADA',
      cod_atc: '423',
    },
    {
      municipio: 'LUPERCIO - 426',
      setor: 'RADA4',
      divisao: 'RADA',
      cod_atc: '426',
    },
    {
      municipio: 'PAULISTANIA - 768',
      setor: 'RADA4',
      divisao: 'RADA',
      cod_atc: '768',
    },
    {
      municipio: 'RIBEIRAO DO SUL - 580',
      setor: 'RADA4',
      divisao: 'RADA',
      cod_atc: '580',
    },
    {
      municipio: 'UBIRAJARA - 702',
      setor: 'RADA4',
      divisao: 'RADA',
      cod_atc: '702',
    },
    {
      municipio: 'STA.CRUZ DO R.PARDO - 612',
      setor: 'RADA4',
      divisao: 'RADA',
      cod_atc: '612',
    },
    {
      municipio: 'BURI - 229',
      setor: 'RADI1',
      divisao: 'RADI',
      cod_atc: '229',
    },
    {
      municipio: 'GUAPIARA - 324',
      setor: 'RADI1',
      divisao: 'RADI',
      cod_atc: '324',
    },
    {
      municipio: 'ITAPEVA - 372',
      setor: 'RADI1',
      divisao: 'RADI',
      cod_atc: '372',
    },
    {
      municipio: 'NOVA CAMPINA - 754',
      setor: 'RADI1',
      divisao: 'RADI',
      cod_atc: '754',
    },
    {
      municipio: 'TAQUARIVAI - 756',
      setor: 'RADI1',
      divisao: 'RADI',
      cod_atc: '756',
    },
    {
      municipio: 'RIBEIRAO BRANCO - 578',
      setor: 'RADI1',
      divisao: 'RADI',
      cod_atc: '578',
    },
    {
      municipio: 'BOM SUCESSO ITARARE - 767',
      setor: 'RADI5',
      divisao: 'RADI',
      cod_atc: '767',
    },
    {
      municipio: 'BARAO DE ANTONINA - 199',
      setor: 'RADI5',
      divisao: 'RADI',
      cod_atc: '199',
    },
    {
      municipio: 'ITAPORANGA - 376',
      setor: 'RADI5',
      divisao: 'RADI',
      cod_atc: '376',
    },
    {
      municipio: 'RIVERSUL - 583',
      setor: 'RADI5',
      divisao: 'RADI',
      cod_atc: '583',
    },
    {
      municipio: 'ITARARE - 783',
      setor: 'RADI5',
      divisao: 'RADI',
      cod_atc: '783',
    },
    {
      municipio: 'CORONEL MACEDO - 274',
      setor: 'RADI6',
      divisao: 'RADI',
      cod_atc: '274',
    },
    {
      municipio: 'ITABERA - 365',
      setor: 'RADI6',
      divisao: 'RADI',
      cod_atc: '365',
    },
    {
      municipio: 'ITAI - 366',
      setor: 'RADI6',
      divisao: 'RADI',
      cod_atc: '366',
    },
    {
      municipio: 'TAGUAI - 677',
      setor: 'RADI6',
      divisao: 'RADI',
      cod_atc: '677',
    },
    {
      municipio: 'TAQUARITUBA - 685',
      setor: 'RADI6',
      divisao: 'RADI',
      cod_atc: '685',
    },
    {
      municipio: 'ALAMBARI - 749',
      setor: 'RADT1',
      divisao: 'RADT',
      cod_atc: '749',
    },
    {
      municipio: 'CAMPINA DO MONTE ALEGRE - 727',
      setor: 'RADT1',
      divisao: 'RADT',
      cod_atc: '727',
    },
    {
      municipio: 'GUAREI - 333',
      setor: 'RADT1',
      divisao: 'RADT',
      cod_atc: '333',
    },
    {
      municipio: 'ITAPETININGA - 371',
      setor: 'RADT1',
      divisao: 'RADT',
      cod_atc: '371',
    },
    {
      municipio: 'PARANAPANEMA - 506',
      setor: 'RADT1',
      divisao: 'RADT',
      cod_atc: '506',
    },
    {
      municipio: 'SARAPUI - 658',
      setor: 'RADT1',
      divisao: 'RADT',
      cod_atc: '658',
    },
    {
      municipio: 'ANGATUBA - 171',
      setor: 'RADT1',
      divisao: 'RADT',
      cod_atc: '171',
    },
    {
      municipio: 'PILAR DO SUL - 527',
      setor: 'RADT3',
      divisao: 'RADT',
      cod_atc: '527',
    },
    {
      municipio: 'RIBEIRAO GRANDE - 755',
      setor: 'RADT3',
      divisao: 'RADT',
      cod_atc: '755',
    },
    {
      municipio: 'SAO MIGUEL ARCANJO - 650',
      setor: 'RADT3',
      divisao: 'RADT',
      cod_atc: '650',
    },
    {
      municipio: 'CAPAO BONITO - 251',
      setor: 'RADT3',
      divisao: 'RADT',
      cod_atc: '251',
    },
  ],
};