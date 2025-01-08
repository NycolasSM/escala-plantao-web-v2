export const getSetor = (municipio: string) => {
  switch (municipio) {
    case 'JUQUITIBA':
    case 'REGISTRO':
    case 'SETE BARRAS':
    case 'SAO LOURENCO DA SERRA':
      return 'RRDO2';
    case 'BARRA DO TURVO':
    case 'CAJATI':
    case 'ELDORADO':
    case 'IPORANGA':
    case 'JACUPIRANGA':
      return 'RRDO3';
    case 'IGUAPE':
    case 'ILHA COMPRIDA':
    case 'CANANEIA':
    case 'PARIQUERA-ACU':
      return 'RRDO4';
    case 'ITARIRI':
    case 'MIRACATU':
    case 'PEDRO DE TOLEDO':
    case 'JUQUIA':
    case 'TAPIRAI':
      return 'RRDO5';
    case 'RIBEIRA':
    case 'APIAI':
    case 'BARRA DO CHAPEU':
    case 'ITAOCA':
    case 'ITAPIRAPUA PAULISTA':
      return 'RRDO6';
    default:
      return '-';
  }
};
