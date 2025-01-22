import styled from "styled-components";

export const Thead = styled.thead`

  @media (max-width: 520px) {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 2.8rem;

    margin-bottom: 0.5rem;
  }

  .employee_name {
    @media (min-width: 1000px) {
      min-width: 330px;
    }
  }

  .break {
    display: flex;
    flex-direction: column;

    .break-hours {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  @media (max-width: 520px) {
    width: fit-content;
  } ;
`;
