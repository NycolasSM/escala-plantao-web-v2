import { RiDeleteBin7Line } from "react-icons/ri";
import { Thead } from "./styles";

const Header = () => {
  return (
    <Thead>
      <tr style={{ height: 35 }}>
        <th colSpan={3}>Escala</th>
        <th colSpan={4}>Intervalo</th>
        <th rowSpan={2} style={{ minWidth: 75 }}>
          Total Plantão
        </th>
        <th style={{ minWidth: 55, borderRight: "none" }} rowSpan={2}>
          <RiDeleteBin7Line size={23} color='#808080' />
        </th>
      </tr>
      <tr>
        <th style={{ minWidth: 95 }}>Dia</th>
        <th>Nome do Colaborador</th>
        <th style={{ minWidth: 30, fontSize: 13 }}>24hrs</th>
        <th style={{ minWidth: 85 }}>Início</th>
        <th style={{ minWidth: 85 }}>dás</th>
        <th style={{ minWidth: 85 }}>às</th>
        <th style={{ minWidth: 85 }}>Término</th>
      </tr>
    </Thead>
  );
};

export default Header;
