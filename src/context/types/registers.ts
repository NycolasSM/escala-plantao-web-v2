export type AccountStatementsType = {
  consumo: any;
  id: number;
  tipp: any;
  municipio: string;
  nome: string;
  setor: string;
  codigo: string;
  controle_nmr: string;
  data_de_emissao: string;
  index: number;
  nota_fiscal: string;
  registro_id: number;
  tipo: "BAIXA" | "ALTA";
  tipo2: string;
  valor_total_extrato: string | number;
  vencimento: string;
  mes_ref: string;
};

export type Data_per_Month = {
  unidade: any[];
  rrdo2: any[];
  rrdo3: any[];
  rrdo4: any[];
  rrdo5: any[];
  rrdo6: any[];
};

export type UCType = {
  cnpj: string;
  codigo: string;
  data_insercao: string;
  endereco: string;
  index: number;
  mes_insercao: string;
  municipio: string;
  nome: string;
  obs: string;
  tipo: string;
};
