import { Container } from "./styles";

const Header = () => {
  return (
    <Container>
      <h3>Dia</h3>
      <h3 className="employee_name">Nome do Colaborador</h3>
      <h3>24hrs</h3>
      <h3>Início</h3>
      <div className="break" style={{ minWidth: "150px" }}>
        <h3 style={{ alignSelf: "center" }}>Intervalo</h3>
        <div className="break-hours">
          <h3>dás</h3>
          <h3>às</h3>
        </div>
      </div>
      <h3>Término</h3>
      <h3 style={{ maxWidth: "138px" }}>Total de horas de plantão</h3>
    </Container>
  );
};

export default Header;
