import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  th, td {
    padding: 7px 9px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
    text-align: center;

    input {
      width: 16px;
      height: 16px;
      margin: 0;
    }
  }

  th {
    background-color: #f2f2f2;
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    color: #525252;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  button {
    padding: 5px 10px;
    margin-right: 5px;
    border: none;
    border-radius: 4px;
    background-color: #3691ad;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #2d7e97;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #3691ad;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #2d7e97;
  }
`;
