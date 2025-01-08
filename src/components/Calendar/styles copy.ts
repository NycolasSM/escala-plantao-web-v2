import styled from "styled-components";

export const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* padding: 4px 8px; */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

export const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`;


export const Container = styled.div`
  /* padding: 8px 0px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3691ad;
  color: white;

  width: 100%;
  padding: 0 17px;

  gap: 1rem;
`;

export const Month = styled.div`
  left: 1rem;

  display: flex;
  font-size: 15px;
  gap: 6px;
  transform: translateY(-2px);

  h3 {
    margin: 0;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  right: 2rem;

  gap: 10px;

  margin-bottom: 0.3rem;
  padding: 0.2rem;
  padding-right: 0;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.2rem;
    border: none;
    border-radius: 0.3rem;
    height: 25px;
    width: 30px;
    font-size: 18px;
    background-color:rgb(53, 156, 187);
    color: white;
  }

  button:hover {
    cursor: pointer;
    transition: all ease 0.2s;
    filter: brightness(0.9);
  }

  button:nth-child(1)::after {
    content: "<";
  }

  button:nth-child(2)::after {
    content: ">";
  }

  @media (max-width: 520px) {
    right: 0;
    padding-bottom: 0.4rem;
  }
`;

export const Line = styled.div`
  width: 92%;
  height: 2px;
  background-color: #c1c1c1;
  box-shadow: 0px 2px 2px 1px rgba(92, 92, 92, 0.1);
`;

export const Weeks = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 90%;
  padding: 0.5rem 0 0.2rem 0;
  font-weight: 600;
  font-size: 13px;

  @media (max-width: 520px) {
    font-size: 0.9rem;
    gap: 0.4rem;
  }
`;

export const Days = styled.div`
  width: 90%;

  div {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  // aqui define a posição que irá iniciar
  .starting-weekday-monday {
    button:first-child {
      grid-column: 1;
    }
  }

  .starting-weekday-tuesday {
    button:first-child {
      grid-column: 2;
    }
  }

  .starting-weekday-wednesday {
    button:first-child {
      grid-column: 3;
    }
  }

  .starting-weekday-thursday {
    button:first-child {
      grid-column: 4;
    }
  }

  .starting-weekday-friday {
    button:first-child {
      grid-column: 5;
    }
  }

  .starting-weekday-saturday {
    button:first-child {
      grid-column: 6;
    }
  }

  .starting-weekday-sunday {
    button:first-child {
      grid-column: 7;
    }
  }

  button {
    border: 0;
    width: 25px;
    height: 25px;
    background-color: transparent;
    transition: all ease 0.2s;
    border-radius: 5px;
    margin-top: 2px;
    padding-left: 3px;
  }

  .highlight {
    background-color: #55bee6bb;
  }

  .highlight:hover {
    background-color: #55bee6cc;
    filter: brightness(0.9);
  }

  button:hover {
    cursor: pointer;
    outline: none;
    background-color: #c0c0c015;
  }

  * {
    font-size: 14px;
    color: var(--blue-grey-400);
    font-weight: 600;
    letter-spacing: 0.1em;
    font-variant: small-caps;
    text-align: center;
  }

  @media (max-width: 520px) {
    width: 100%;
    padding: 0.6rem;
  }
`;

export const HolidaysNameList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  margin: 0;

  white span {
    margin-bottom: 5px;
  }

  li {
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
  }

  @media (max-width: 520px) {
    margin-bottom: 1rem;
  }
`;
