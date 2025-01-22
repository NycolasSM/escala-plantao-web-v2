import styled from 'styled-components';

export const Container = styled.section`
  background-color: white;
  border-radius: 6px;
  -webkit-box-shadow: 0px 0px 7px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 7px 4px rgba(0, 0, 0, 0.1);
  max-width: 380px;
  min-width: 340px;
  padding: 0px 0px 45px 0px;
  margin: 0 auto;
  margin-top: 5%;
  border-top: 16px solid #3691ad;
  padding-top: 30px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    width: 100%;
    border-radius: 5px 5px 0 0;
    margin: 0 0 0px 0;
    background-color: #3691ad;
    padding: 12px 15px;
    color: white;
    font-weight: 500;
    margin-bottom: 25px;
    font-size: 1.05rem;
  }

  form {
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;

    div {
      width: 100%;
    }

    span {
      margin-bottom: -10px;
      color: #ff1c1c;
    }

    p {
      margin: 0;
      margin-top: 5px;
      margin-bottom: -10px;
    }

    input {
      height: 44px;
      width: 100%;
      font-size: 16px;
      padding: 6px 8px;
      border-radius: 4px;
      border: solid 1px #c7c7c7;
      background-color: #f2f2f2;
      color: black;

      :focus {
        border: solid 1px #94adc0;
        outline: 1px solid #7ba6bf;
      }
    }

    button {
      margin-top: 15px;
      height: 46px;
      width: 100%;
      border-radius: 4px;
      border: solid 1px #a6d7c0;
      background-color: #3691ad;
      align-self: flex-end;
      transition: all ease 0.1s;
      font-size: 15px;
      color: white;
      font-weight: 500;

      :hover {
        cursor: pointer;
        filter: brightness(0.95);
      }
    }
  }
`;
