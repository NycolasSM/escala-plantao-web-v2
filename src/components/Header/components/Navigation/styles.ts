import styled from "styled-components";

export const Container = styled.div`
  height: 55px;
  top: 58px;
  /* height: 18px; */
  overflow: hidden;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #60bad5;
  /* top: 74px; */
  z-index: 100;
  transition: all ease 0.4s;
  /* box-shadow: 0px 6px 9px -1px rgba(0, 0, 0, 0.22); */
  box-shadow: 0px 6px 9px -1px rgba(0, 0, 0, 0.22);

  @media (max-width: 1400px) {
    top: 58px;
  }

  /* :hover {
    height: 55px;
    box-shadow: 0px 6px 9px -1px rgba(0, 0, 0, 0.22);
  }

  :hover ~ div {
    top: 96px;
  }

  :hover > ul {
    opacity: 1;
  } */

  ul {
    display: flex;
    width: 80%;
    align-items: center;
    justify-content: space-evenly;
    list-style: none;
    user-select: none;
    transition: all ease 0.4s;
    /* opacity: 0; */
    opacity: 1;

    li {
      color: white;
      border-bottom: 2px solid transparent;
      transition: all ease 0.1s;

      :hover {
        cursor: pointer;
        border-bottom: 2px solid white;
      }

      a {
        text-decoration: none;
        color: white;
      }
    }
  }
`;

export const NavigationMenuIcon = styled.div`
  position: absolute;
  top: 71px;
  transition: all ease 0.4s;
  z-index: 2;
`;
