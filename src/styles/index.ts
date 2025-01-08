import styled from 'styled-components';

export const Main = styled.main`
  width: 110vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
  overflow-x: scroll;

  /* padding-left: 20px; */

  @media (max-width: 768px) {
    padding-right: 20px;
  }

  /* width */
  ::-webkit-scrollbar {
    height: 10px;
    width: 13px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #5282b6;
    border-radius: 2px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #4472a4;
    border-radius: 2px;
    cursor: pointer;
  }

  .react-datepicker__year-wrapper {
    display: flex;
    flex-wrap: wrap;
    max-width: 145px;
    padding-left: 5px;
  }
`;

export const PainelTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 98%;
  height: 100%;

  div {
    padding-bottom: 100px;
    padding-left: 50px;

    h1 {
      font-size: 50px;
      font-weight: 500;
    }

    h2 {
      font-size: 30px;
      font-weight: 500;
    }
  }
`;
