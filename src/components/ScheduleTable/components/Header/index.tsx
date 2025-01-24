import { RiDeleteBin7Line } from "react-icons/ri";
import { Thead } from "./styles";

const Header = () => {
  return (
    <Thead>
      <tr style={{ height: 35 }}>
        <th colSpan={3}>Escala</th>
        <th colSpan={4}>Intervalo</th>
        <th rowSpan={2} style={{ width: 100 }}>
          Total horas de plantão
        </th>
        <th style={{ width: 55, borderRight: "none" }} rowSpan={2}>
          <RiDeleteBin7Line size={23} color='#808080' />
        </th>
      </tr>
      <tr>
        <th style={{ width: 95 }}>Dia</th>
        <th>Nome do Colaborador</th>
        <th style={{ width: 50, fontSize: 13 }}>24hrs</th>
        <th style={{ width: 90 }}>Início</th>
        <th style={{ width: 90 }}>dás</th>
        <th style={{ width: 90 }}>às</th>
        <th style={{ width: 90 }}>Término</th>
      </tr>
    </Thead>
  );
};

export default Header;
