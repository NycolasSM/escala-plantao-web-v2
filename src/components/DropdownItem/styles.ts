import styled from "styled-components";

export const DropdownItemContainer = styled.div.attrs({
  as: 'div', // Mudar isso para o tipo de componente que você precisa
})`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 60px;
  left: 0;
  height: 2.5rem;
  width: 100%;
  background: #6e99a6;
  border-radius: 0px 0px 6px 6px;
  z-index: -1;
  cursor: pointer;

  p {
    color: white;
    font-weight: 700;
    font-size: 0.8rem;
  }

  &:hover {
    filter: brightness(0.9);
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;
