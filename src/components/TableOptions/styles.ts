import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 20px;

  .react-select-container {
    width: 200px;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 17rem;
  padding: 0.6rem;
  margin: 0 auto;
`;

export const OptionTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.4rem;
`;

export const Inputs = styled.div`
  width: 14rem;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-self: flex-end;

  gap: 3px;
  flex-wrap: wrap;
  row-gap: 0.5rem;
  column-gap: 1rem;

  margin-bottom: 0.4rem;

  border: 2px solid select {
    height: 30;
    border-radius: 4;
    padding-left: 5;
    font-size: 15px;
  }

  option {
    font-size: 14px;
  }

  div {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 400;
    font-size: 1rem;

    input {
      transition: all ease 0.2s;
    }

    input:hover {
      cursor: pointer;
      filter: brightness(0.98);
    }

    input[type="radio"] {
      height: 17px;
      width: 17px;
    }
  }
`;

export const InputCheckBox = styled.div`
  border: solid 1px gray;
  height: 17px;
  width: 17px;
  border-radius: 50%;
  cursor: pointer;
`;

export const InputCheckBoxChecked = styled.div`
  border: solid 1px gray;
  height: 17px;
  width: 17px;
  padding: 2px;
  border-radius: 50%;
  cursor: pointer;

  div {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background: black;
  }
`;
