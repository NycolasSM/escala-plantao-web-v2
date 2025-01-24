import styled from "styled-components";

export const HomeContainer = styled.div`
  height: (100vh - 8rem);
  width: 100%;
  padding: 1rem 5rem;

  @media (max-width: 520px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 1rem 1rem;
  }
`;

export const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;

  width: 100%;
  height: 18rem;

  padding: 1rem 0rem;

  max-width: 1300px;
  margin: 0 auto;

  margin-top: 2rem;

  @media (max-width: 520px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 3rem;

    height: fit-content;
    width: fit-content;

    padding: 0.5rem;
  }
`;

export const FormSendMessage = styled.div`
  height: 60px;
  width: 300px;
  display: flex;
  align-items: center;
  gap: 40px;
  background-color: #dffcd1;
  border-radius: 6px;
  position: absolute;

  animation: showSendFormMessage 3s forwards;
  transform: translateX(400px);

  div {
    height: 100%;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #aee7ad;
    border-radius: 6px 0px 0px 6px;
  }

  @keyframes showSendFormMessage {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

// export const Buttons = styled.div`
//   width: 85%;
//   display: flex;
//   justify-content: center;
//   margin: 50px auto 50px auto;

//   button {
//     height: 60px;
//     background-color: var(--button-primary);
//     color: white;
//     border: none;
//     border-radius: 5px;
//     font-size: 1.1rem;
//     padding: 0.6rem 3.1rem;
//     transition: all ease 0.2s;
//   }

//   .disable {
//     opacity: 0.6;
//     cursor: no-drop !important;
//   }

//   .general__report {
//     background-color: #2bd0af;

//     @media (max-width: 520px) {
//       width: 100%;
//     }
//   }

//   button:hover {
//     cursor: pointer;
//     filter: brightness(0.92);
//   }

//   @media (max-width: 520px) {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;

//     width: 100%;

//     gap: 2rem;

//     button {
//       display: flex;
//       align-items: center;
//       justify-content: center;

//       width: 80%;
//     }
//   } ;
// `;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  gap: 11px;
  padding-top: 5px;
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;

  &:first-child {
    flex: 6;
  }
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border: 1px solid #cecece;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 16px;
`;

export const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 0; 
`;

export const Filters = styled.div`
  display: flex;
  gap: 20px;

  .react-select-container {
    width: 200px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Buttons = styled.div`
  display: flex;
  gap: 10px;

  button {
    background-color: #3691ad;
    color: white;
    border-radius: 4px;
    padding: 0px 18px;
    border: none;
    font-size: 14px;

    :hover {
      cursor: pointer;
    }
  }
`

export const CreateSchedule = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  gap: 10px;

  p {
    font-size: 14px;
    margin: 0;
    opacity: 0.7;
  }

  button {
    margin-top: 15px;
  }
`