import styled from "styled-components";

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