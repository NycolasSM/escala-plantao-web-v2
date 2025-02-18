import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  right: 30px;
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  transition: all ease 0.2s;
  overflow: hidden;
  border-radius: 8px;

  button {
    height: 28px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 0px !important;
    transition: all ease 0.1s;
    background-color: #3ca8c8;
    color: white;
    font-size: 13px;

    span {
      font-size: 13px;
    }

    :nth-child(1) {
      background-color: #54c1e5;
      border-radius: 0;
      height: 36px;
      font-size: 15px;
    }

    :hover {
      filter: brightness(0.9);
      cursor: pointer;
    }
  }
`;
