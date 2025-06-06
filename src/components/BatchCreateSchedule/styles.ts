import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;

  p {
    margin: 15px 0px 5px 0px;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  > div {
    width: 100%;
  }

  span {
    font-size: 14px;
  }
`;

export const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #3691ad;
  color: white;
  cursor: pointer;

  &:hover {
    filter: brightness(0.7);
  }
`;