import styled from "styled-components";

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  width: 68px;
  height: 100vh;
  background-color: #3691ad;
  color: #ebf1fa;
  top: 0px;
  z-index: 1000;
  direction: rtl;
  overflow-y: scroll;
  overflow-x: visible;
  transition: all ease 0.2s;
  align-items: center;

  /* width */
  ::-webkit-scrollbar {
    width: 0px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #8998a9;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #48678a;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #466686;
  }

  span {
    margin: 0;
    width: 100%;
    text-align: center;
    background-color: #2f3842;
    color: #b9c5ce;
    font-weight: 500;
    padding: 2px 0;
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    border: none;
    color: #ebf1fa;

    :hover {
      cursor: pointer;
    }

    h1 {
      font-weight: 100;
      font-size: 0.9rem;
      margin: 0;
      margin-top: 15px;
      margin-bottom: 2px;
    }

    h2 {
      font-size: 0.8rem;
      font-weight: 100;
      margin: 0;
      padding: 0px 10px;
    }
  }

  nav {
    /* padding-top: 15px; */

    ul {
      display: flex;
      flex-direction: column;
      list-style: none;
      width: 100%;
      gap: 5px;
      padding: 0;
    }
  }
`;

export const FoldMenuButton = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 156px;
  margin-right: -51px;
  transition: all ease 0.2s;

  button {
    height: 46px;
    width: 53px;
    z-index: 900;
    border-radius: 0;
    transition: all ease 0.1s;
    color: white;
    border: none;
    border-right: 1px solid #78b5d6;
    padding-top: 3px;
    padding-left: 9px;
    background-color: #306d7a;
    border-radius: 0 0 5px 0px;

    :hover {
      filter: brightness(0.9);
      cursor: pointer;
    }

    :active {
      filter: brightness(0.8);
    }
  }

  li {
    border: 0px;
    display: inline-block;
    position: relative;
    z-index: 1;
    border: 0px solid #000000;
    background-color: transparent;
    font-family: Futura, Tahoma, sans-serif;
    color: #ffffff;
    padding: 25px;
    margin-right: -47px;
    z-index: 9998;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #377081;
  width: 59px;
  height: 59px;
`;
