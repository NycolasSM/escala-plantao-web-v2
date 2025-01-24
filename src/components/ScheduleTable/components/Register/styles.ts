import styled from "styled-components";

export const Container = styled.tr`
  border-bottom: 1px solid #aaaaaa !important;

  .register__button--unlock {
    background-color: #df862d;
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
    height: 20px;
    width: 20px;
    cursor: pointer;
  }

  select {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 13px;
    border: none;
    text-align: center;
    height: 30px;
    outline: 2px solid #c1c1c1;
    width: 100%;

    option {
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const SelectDays = styled.select`
  /* display: flex;
  width: 15%;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 13px; */

  font-size: 11px !important;

  option {
    font-size: 8px !important;
  }
`;
