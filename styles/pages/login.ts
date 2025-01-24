import styled, { keyframes } from "styled-components";

const FadeAnimation = keyframes`
    to {transform: translateX(0)};
    from {transform: translateX(100%)};
`;

export const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  /* flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh; */

  @media (max-width: 1400px) {
    margin-top: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 25rem;
    border-radius: 8px;
    padding: 1.3rem 30px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
    border-top: 14px solid #3691ad;
    padding-top: 40px;
    margin: auto;
    background-color:rgb(236, 236, 236);

    input {
      cursor: pointer;
      background-color:rgb(224, 224, 224);
    }

    footer {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      gap: 40px;
      padding-bottom: 10px;
      width: 100%;

      .login__buttons {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 100%;
        gap: 15px;
        padding-top: 5px;
      }

      .recommendation {
        width: 95%;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        padding-right: 15px;

        span {
          text-align: center;
          font-size: 14px;
          color: #313131;
          pointer-events: none;
        }
      }
      .checkbox-container {
        display: flex;
        padding-left: 5px;

        label {
          cursor: pointer;
          font-size: 14px;
          margin-left: 0.3rem;
        }

        input {
          cursor: pointer;
        }
      }

      button {
        height: 50px;
        width: 10rem;
        color: #fff;
        border: 0;
        outline: none;
        cursor: pointer;
        background: #3691ad;
        border-radius: 4px;
        font-weight: 400;
        font-size: 1rem;
        transition: all ease 0.2s;
        width: 100%;

        &:hover {
          filter: brightness(0.9);
        }
      }
    }
  }

  @media (max-width: 520px) {
    height: 70vh;
    margin-top: 2rem;
    gap: 1rem;

    form {
      height: 100%;
      width: 100%;

      footer {
        margin-top: 4rem;

        padding: 0.5rem;
        display: flex;
        flex-direction: column-reverse;
        gap: 2rem;

        .checkbox-container {
          label {
            font-size: 1rem;
          }
        }

        button {
          width: 70%;
        }
      }
    }
  }
`;

export const MessageErrorContainer = styled.div`
  width: 25rem;
  min-height: 3rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
  border-radius: 8px 0px 0px 8px;
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 9px;
    background-color: var(--red);
  }

  h1 {
    text-align: center;
    font-weight: 300;
    font-size: 18px;
  }

  @media (max-width: 520px) {
    animation: ${FadeAnimation} 0.4s ease;

    display: flex;
    align-items: center;

    bottom: 18rem;

    height: 3.5rem;

    width: 80%;
    position: absolute;

    h1 {
      margin-left: 1rem;
    }
  }
`;

export const LocalsigLogoContainer = styled.div`
  /* margin-top: 4.8rem;
  margin-bottom: 0.6rem; */
  width: 180px;
  margin: 0 auto;
  margin-bottom: 10px;

  /* @media (max-width: 1400px) {
    margin-top: 2.5rem;
    margin-bottom: 0.2rem;
    width: 13rem;
  } */

  cursor: pointer;
`;

export const Warnings = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 0 auto;
  align-self: center;
  margin-top: 40px;

  div {
    width: 600px;
    gap: 16px;
    padding: 12px 14px 12px 17px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    background-color: #fdede1;
    -webkit-box-shadow: inset 0px 0px 7px 1px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: inset 0px 0px 7px 1px rgba(0, 0, 0, 0.1);
    box-shadow: inset 0px 0px 7px 2px rgba(0, 0, 0, 0.1);

    span {
      font-size: 14px;
      color: #616161;

      strong {
        color: #666666;
      }
    }
  }
`;
