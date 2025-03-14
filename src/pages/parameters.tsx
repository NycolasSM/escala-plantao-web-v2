import React from "react";
import { Container, LinkButton, SectionTitle } from "../../styles/pages/parameters";
import { MdOpenInNew } from "react-icons/md";
import Link from "next/link";

const Parameters = () => {
  return (
    <Container>
      <SectionTitle>
        <h1>Gerenciamento de Escalas e Locais</h1>
        <p>Adicione novos tipos de escalas e novos locais.</p>
      </SectionTitle>

      <div>
        <Link href={"/editSchedulesLocations"}>
          {/* @ts-ignore */}
          <LinkButton onClick={() => console.log("teste")}>
            <span>Acessar</span>
            <MdOpenInNew size={18} />
          </LinkButton>
        </Link>
      </div>
    </Container>
  );
};

export default Parameters;
