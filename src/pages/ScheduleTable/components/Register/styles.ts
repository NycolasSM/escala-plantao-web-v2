import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 1.2rem;
  gap: 2.1rem;
  padding: 0.15rem;

  .register__button--unlock {
    background-color: #df862d;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 4px;
    opacity: 0.8;
    margin-right: -35px;
    margin-left: -22px;

    &:hover {
      cursor: pointer;
      transition: all ease 0.2s;
      filter: brightness(0.87);
      opacity: 1;
    }

    :active {
      filter: brightness(0.7);
    }
  }

  @media (max-width: 520px) {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 2.9rem;
    width: 1000px;
  }

  /* animação desativada por causa de um bug com os inputs se sobrepondo */
  /* animation: showRegister 0.1s forwards; */
  /* opacity: 0.1; */

  @keyframes showRegister {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .button__options__container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .checkbox {
    height: 31px;
    width: 31px;
    cursor: pointer;
  }

  @media (max-width: 550px) {
    .checkbox {
      height: 20px;
      width: 20px;
    }
  }

  select {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
    border-radius: 5px;
    font-size: 16px;
    border: none;
    text-align: center;
    padding: 0 0.3rem;
    height: 37px;
    outline: 2px solid #c1c1c1;

    option {
      font-size: 1.1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const SelectDays = styled.select`
  display: flex;
  width: 15%;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 15;
`;
