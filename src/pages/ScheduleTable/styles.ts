import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e6e6e6;
  width: 100%;
  max-width: 1350px;
  min-height: 300px;
  margin: 5px auto 0 auto;
  border-radius: 10px;
  padding: 1.4rem 3.5rem 0rem 24px;
  transition: all ease 0.4s;
  justify-content: space-between;

  overflow-x: scroll;

  @media (max-width: 520px) {
    padding: 1rem;
  }

  .edit {
    outline: solid 6px #d1d1d1bb;
    background-color: #d1d1d1aa;
    pointer-events: none;
  }

  .delete {
    outline: solid 6px #ff000055;
    background-color: #ff000055;
    pointer-events: none;
  }

  span {
    margin-left: 1.2rem;
  }
`;

export const DEVLOGS = styled.div`
  display: flex;
  position: absolute;
  margin: 40px auto;
  width: 1190px;
  justify-content: center;

  border: 2px solid green;

  button {
    padding: 2px;
    border-radius: 4px;
    background-color: #b5fbcb;
    cursor: pointer;
  }
`;

export const EmptyFieldError = styled.div`
  background-color: #ffb366;
  height: 35px;
  margin-bottom: -30px;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all ease;
  visibility: hidden;
  opacity: 1;
  animation: show 1s forwards;

  @keyframes show {
    0% {
      height: 10px;
      visibility: hidden;
      opacity: 0;
    }
    100% {
      visibility: visible;
      opacity: 1;
      height: 35px;
    }
  }

  span {
    margin-left: 20px;
  }
`;

export const EmptyRegistersMessage = styled.div`
  background-color: #f5f8fa;
  width: 400px;
  display: flex;
  align-items: center;
  margin: 10px auto 10px auto;
  gap: 50px;
  border-radius: 6px;
  animation: showMessage 0.8s forwards cubic-bezier(0.215, 0.61, 0.355, 1);
  opacity: 0;
  box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.1);

  h3 {
    font-weight: 500;
  }

  @media (max-width: 520px) {
    width: 20rem;

    h3 {
      font-size: 0.8rem;
      font-weight: 500;
    }
  }

  div {
    height: 100%;
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #cacaca;
    border-radius: 6px 0px 0px 6px;
  }

  @keyframes showMessage {
    0% {
      opacity: 0;
      height: 46px;
    }
    100% {
      opacity: 1;
      height: 52px;
    }
  }
`;

export const AddRegisters = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  background-color: #c5e2e9;
  font-size: 40px;
  color: #84b7caaa;
  border: none;
  transition: all ease 0.2s;
  box-shadow: 0px 4px 8px -3px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  margin-top: 30px;
  margin-bottom: 45px;
  outline: #b3d8e1 1px solid;

  ::after {
    content: "+";
  }

  :hover {
    cursor: pointer;
    transform: translateY(-1px);
    box-shadow: 0px 6px 14px -3px rgba(0, 0, 0, 0.17);
    filter: brightness(0.9) contrast(1.15);
  }
`;

export const Registers = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 520px) {
    width: 100%;
  }

  .register__line {
    display: flex;
    align-items: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;

    border: 2px solid red;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 100;
  transform: translate(35px, -8px);

  .border {
    position: absolute;
    z-index: 0;
    margin-left: -5px;
    height: 46px;
    width: 54px;
    background-color: #f4f4f4;
    padding: 6px;
    border-radius: 10px;
    transition: all ease 0.35s;
    display: flex;
    justify-content: flex-end;

    span {
      transform: translateX(3px);
    }
  }

  .register__button--delete {
    background-color: #fe6929;
  }

  .register__button--cancel {
    background-color: #fd2b2b;
  }

  .register__button--restore {
    background-color: #fb3411;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fd3e3e;
    border: none;
    border-radius: 4px;
    opacity: 0.8;

    &:hover {
      cursor: pointer;
      transition: all ease 0.2s;
      filter: brightness(0.87);
      opacity: 1;
    }
  }

  .button--hide {
    margin: 0 auto;
    visibility: hidden;
  }

  .edit__button:focus-within ~ .buttons__container {
    width: 135px;
  }

  .edit__button:focus-within ~ .border {
    width: 135px;
  }

  .buttons__container {
    z-index: 11;
    overflow: hidden;
    position: absolute;
    display: flex;
    align-items: center;
    gap: 5px;
    width: 30px;
    padding-left: 37px;
    z-index: 0;
    transition: all ease 0.4s;
    border: none;

    button {
      border: solid 1px gray;
      height: 35px;
      width: 35px;
      z-index: 11;

      div {
        z-index: 0;
      }
    }

    button:nth-child(1) {
      background-color: transparent;
      border: none;
    }

    button:nth-child(2) {
      border-radius: 5px;
      border: none;
      background: #97d9a9;
    }

    button:nth-child(3) {
      border: none;
      border-radius: 5px;
      background: #fa4041;
    }
  }

  .buttons__container button {
    border: none;
    height: 35px;
    width: 35px;
    padding: 1px;
    border-radius: 50%;
    z-index: 11;
  }

  .buttons__container button:nth-child(1) {
    background-color: transparent;
    height: 0px;
    width: 0px;
    border: none;
  }

  .buttons__container button:nth-child(2) {
    background-color: #58c75b;
    height: 32px;
    width: 32px;
  }

  .buttons__container button:nth-child(3) {
    background-color: #fd3e3e;
    height: 32px;
    width: 32px;
  }

  button:hover {
    cursor: pointer;
    transition: all ease 0.2s;
    filter: brightness(0.92);
  }

  button div {
    z-index: 0;
  }
`;

export const PenIconContainer = styled.svg`
  cursor: pointer;
`;

export const PlusIconContainer = styled.svg`
  cursor: pointer;
`;

export const CloseIconContainer = styled.svg`
  cursor: pointer;
`;

export const ObservationSection = styled.div`
  display: flex;
  flex-direction: column;

  gap: 3px;
  transition: all ease 0.2s;
  width: 100%;
  margin: 0 auto;

  label {
    margin: 0 auto;
  }

  textarea {
    height: 8.5rem;
    margin: 0 auto;
    padding: 6px 9px;
    font-size: 1rem;
    border: 1px solid #818181;
    border-radius: 4px;
    resize: none;
    overflow-y: auto;
    overflow-x: hidden;
  }

  textarea:focus {
    outline: 1px solid #646464;
  }

  @media (max-width: 520px) {
    width: fit-content;

    textarea {
      width: 100%;
    }
  } ;
`;

export const LoadingContainer = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
