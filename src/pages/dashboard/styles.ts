import styled from "styled-components";

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

export const LoadingContainer = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;