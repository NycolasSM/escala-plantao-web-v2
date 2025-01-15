import styled from 'styled-components';

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  animation: showOverlay forwards 0.2s ease;
  opacity: 0;
  @keyframes showOverlay {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      z-index: 1000;
    }
  }
`;

export const Centered = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.95);
  opacity: 0;
  animation: showModal forwards 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 2000;
  @keyframes showModal {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

export const Content = styled.div`
  margin: 0 auto;
  width: 500px;
  background-color: #fff;
  border-radius: 6px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px 0px 15px;
  height: 42px;
  /* background-color: #5e8abb; */
  background-color: #499bc2;
  color: white;
  border-radius: 5px 5px 0 0;
  -webkit-box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.3);
  h4 {
    font-weight: 500;
  }
  div {
    display: flex;
    gap: 15px;
  }
`;
export const Body = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding: 19px 23px 30px 23px;
  .modal_text {
    display: flex;
    width: 100%;
    margin-bottom: 5px;
  }
  h3 {
    font-size: 17px;
    font-weight: 600;
    margin: 0 !important;
    margin-top: 0px !important;
  }
  h4 {
    font-size: 17px;
    font-weight: 500;
    margin: 0 !important;
    margin-top: 10px !important;
    margin-bottom: 5px !important;
    padding: 0;
    left: 0;
    padding-left: 20px;
  }
  textarea {
    padding: 6px 10px;
    height: 80px;
  }
  div {
    display: flex;
    flex-direction: column;
    width: 46.5%;
    button {
      font-size: 16px;
    }
  }
  div.options {
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    button {
      height: 35px;
      width: 140px !important;
      border-radius: 4px;
      color: black;
      border: solid 1px gray;
      :hover {
        filter: brightness(0.93);
        cursor: pointer;
      }
    }
    button.save {
      background-color: #6fc491;
      border: solid 1px #368355;
    }
    button.edit {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background-color: #ed9a5c;
      border: solid 1px #914133;
    }
    button.save--modification {
      background-color: #ec924f;
      border: solid 1px #914133;
    }
    button.cancel {
      background-color: #ee9999;
      border: solid 1px #914133;
    }
    button.back {
      background-color: #e88e8c;
      border: solid 1px #914133;
    }
    button.delete {
      background-color: #e06565;
      border: solid 1px #a71d1d;
    }
  }
`;
