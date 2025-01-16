import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;
  gap: 2.4rem;
  margin-bottom: 1.5rem;

  /* padding: 0.5rem; */
  padding-left: 55px;

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

  h3 {
    width: fit-content;

    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 18px;

    @media (max-width: 520px) {
      font-size: 1rem;
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
