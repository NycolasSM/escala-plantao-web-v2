import React, { useContext } from "react";

import { Container, UserButton, UserOptions } from "./styles"; // Importando componentes estilizados
import { CgProfile } from "react-icons/cg"; // Importando ícone de perfil
import { useRouter } from "next/router"; // Importando hook do Next.js para roteamento
import Link from "next/link"; // Importando componente Link do Next.js para navegação entre páginas
import { UserContext } from "../../context/User"; // Importando contexto de usuário
import { MdLogout } from "react-icons/md"; // Importando ícone de logout
import Select, { components, PlaceholderProps } from "react-select"; // Importando componente Select do react-select
import { FiltersContext } from "@/context/Filters"; // Importando contexto de filtros
import "react-datepicker/dist/react-datepicker.css"; // Importando estilos do react-datepicker
import { addLocale } from "primereact/api"; // Adicionando localização para o primereact
import { FaRegUser } from "react-icons/fa6";

addLocale("pt", {
  today: "Hoje",
  clear: "Limpar",
  //@ts-ignore
  closeText: "Fechar",
  prevText: "Anterior",
  nextText: "Próximo",
  currentText: "Começo",
  monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
  monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
  weekHeader: "Semana",
  firstDay: 0,
  isRTL: false,
  showMonthAfterYear: false,
  yearSuffix: "",
  timeOnlyTitle: "Só Horas",
  timeText: "Tempo",
  hourText: "Hora",
  minuteText: "Minuto",
  secondText: "Segundo",
  ampm: false,
  month: "Mês",
  week: "Semana",
  day: "Dia",
  allDayText: "Todo o Dia",
});

const Header = () => {
  const router = useRouter();
  const { userInfo } = useContext(UserContext);
  const { setFilter, municipioFilter } = useContext(FiltersContext);

  const getHeaderTitle = () => {
    switch (router.asPath) {
      case "/":
        return "Escalas";
      case "/schedules":
        return "Gerenciamento";
      case "/history":
        return "Histórico de Escalas";
      case "/users":
        return "Usuários";
    }
  };

  let HeaderTitle = getHeaderTitle();

  return (
    <Container>
      <div style={{ display: "flex", gap: 14, paddingTop: 12 }}>
        <span>Escala De Plantão Digital </span>
        <span>{">"}</span>
        <h3>{HeaderTitle}</h3>
      </div>
      <UserButton>
        <FaRegUser size={17} color='#505050' />
      </UserButton>
    </Container>
  );
};

export default Header;
