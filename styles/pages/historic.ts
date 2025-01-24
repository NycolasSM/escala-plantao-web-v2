import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

  button.disable {
    opacity: 0.5;
    cursor: no-drop;
  }

  .button__back__login {
    border: 1px solid transparent;
    border-radius: 10px;
    min-width: 140px;
    padding: 9px 16px;
    margin: 0 20px;
    cursor: pointer;
    color: white;
    transition: all ease 0.1s;
    background-color: #7dc0d7;

    :hover {
      filter: brightness(0.93);
    }
  }
`;

export const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 500;
  /* margin-right: -30px; */
  margin-top: 20px;
`;

export const Section = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  /* padding-left: 100px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const VisualizeAll = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-weight: 500;
    margin-bottom: 10px;
  }

  button:hover {
    filter: brightness(0.9);
  }

  div {
    display: flex;
    gap: 10px;
    flex-direction: column;

    button:nth-child(1) {
      background-color: #61abd3;
    }
    button:nth-child(2) {
      background-color: #508a9f;
    }

    button {
      border: 1px solid transparent;
      border-radius: 10px;
      min-width: 140px;
      padding: 9px 16px;
      margin: 0 20px;
      cursor: pointer;
      color: white;
      transition: all ease 0.1s;
    }
  }
`;

export const MonthSelect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  gap: 10px;
  margin-right: 20px;
  background-color: #7dc0d7;
  border: solid #235c70 2px;
  padding: 10px 26px;
  border-radius: 10px;
  box-shadow: 3px 3px 12px -4px rgba(0, 0, 0, 0.75);
  color: white;
  text-shadow: 0px 0px 5px #242424;

  .month {
    width: 30px;
    text-align: end;
  }

  .year {
    width: 50px;
    text-align: end;
  }

  h4 {
    font-size: 16px;
    font-weight: 400;
  }

  div {
    display: flex;
    flex-direction: column;

    button {
      padding: 11px 9px;
      height: 20px;
      cursor: pointer;
      margin: 6px 0px;
      border: 1px solid #4887a8;
      border-radius: 4px;
      background-color: #c9dee9;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all ease 0.1s;

      :hover {
        background-color: #a6c9db;
      }

      :active {
        background-color: #83b4cd;
      }
    }
  }
`;

export const Table = styled.table`
  font-weight: 500;
  /* border-collapse: collapse; */
  border-spacing: 0px 3px;
  border-bottom: 4px solid #6cb8d0;
  max-width: 1300px;
  min-width: 1300px;
  margin-top: 20px;
  justify-content: space-between;

  @media (max-width: 1400px) {
    max-width: 1250px;
    min-width: 1250px;
  }

  th {
    height: 65px;
    font-weight: 500;
    font-size: 20px;

    padding: 10px;
    background-color: #6cb8d0;

    @media (max-width: 1400px) {
      font-size: 18px;
    }
  }

  tr {
    height: 60px;
    margin-top: 2px;
    margin-bottom: 2px;
    border: solid 1px black;
    background-color: #dce8f1;
  }

  .weeks {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    row-gap: 15px;
    /* padding: 10px 10px; */
    button {
      min-width: 100px;
      background-color: #508a9f;
    }
  }

  .actions.sector {
    display: flex;
    padding: 0 2px;

    div {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-evenly;
      row-gap: 15px;
      padding: 0;
      width: 125px;

      @media (max-width: 1400px) {
        width: 120px;
      }
      /* padding: 10px 10px; */
      button {
        margin: 0;
        min-width: 100px;
        max-width: 100px;
        font-size: 12px;
        padding: 10px 0px;
        background-color: #508a9f;
      }
    }
  }

  .type {
    padding: 8px 25px;
  }

  .button__edit {
    background-color: #f19849;
  }
  .button__view__Month {
    background-color: #61abd3;
  }
  .button__view__Week {
    background-color: #508a9f;
  }

  .visualize__schedule {
    background-color: #54c1e5;
  }

  .visualize__schedule--select {
    height: 40px;
    border-radius: 8px;
    border: none;
    color: white;
    padding: 0px 11px;
    background-color: #54c1e5;
    margin: 0px 15px;
    cursor: pointer;
    line-height: 200%;
    transition: all ease 0.1s;

    :focus {
      border: none;
      outline: none;
    }

    :hover {
      filter: brightness(0.9);
    }

    option {
      font-size: 15px;
      background-color: #2fb4df;
    }
  }

  button:hover {
    filter: brightness(0.9);
  }

  button.disable {
    opacity: 0.5;
    cursor: no-drop;
  }

  td {
    font-size: 16px;
    padding: 10px 10px;
    text-align: center;
    border-right: 1px solid #35353550;
    border-left: 1px solid #35353550;

    button {
      border: 1px solid transparent;
      border-radius: 10px;
      min-width: 140px;
      padding: 9px 16px;
      margin: 0 20px;
      cursor: pointer;
      color: white;
      transition: all ease 0.1s;

      @media (max-width: 1400px) {
        padding: 9px 14px;
      }
    }
  }

  td.sector {
    height: 70px;
    background-color: #9dd1db;
  }

  .col__schedule__done {
    text-align: left;
    width: 110px;
    padding: 10px 18px;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .col__schedule__alterations {
    width: 280px;
    padding: 0;
  }

  .reportChange {
    height: 67px;
    max-height: 67px;
    padding-left: 1px;
    margin-left: 1px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 0px 0px #000000, inset 2px 2px 8px 0px #00000040,
      5px 5px 15px 5px rgba(0, 0, 0, 0);
    z-index: 10;

    overflow-y: scroll !important;

    p:nth-child(even) {
      background-color: #acc4c180;
    }

    p {
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 14px;
      padding: 6px 0px 6px 10px;
      word-spacing: 2px;
      position: relative;
      margin-left: 1px;
    }

    p:before {
      content: '';
      position: absolute;
      left: 1%;
      bottom: 0;
      height: 1px;
      width: 99%; /* or 100px */
      border-bottom: 1px solid #a3a3a3;
    }
  }
`;

export const IconGuide = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: -25px;
  width: 100%;
  max-width: 1150px;
  justify-content: center;

  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    gap: 35px;

    li {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 15px;
    }
  }
`;

export const ButtonGenerateXLS = styled.button`
  margin-top: 20px;
  padding: 7px 12px;
  border-radius: 5px;
  border: solid 1px #289b67;
  transition: all ease 0.1s;
  background-color: #32c072;
  color: white;
  font-size: 15px;

  :hover {
    filter: brightness(0.9);
    cursor: pointer;
  }
`;
