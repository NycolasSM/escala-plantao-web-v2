import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 20px 30px 20px;
`;

export const SectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;

  h1 {
    font-size: 18px;
    font-weight: 500;
  }

  p {
    font-size: 14px;
  }
`;

export const FormColumn = styled.div`
  display: flex;
  gap: 15px;
`;

export const FormButtons = styled.div`
  display: flex;
  justify-content: center;
`;

export const LinkButton = styled.button`
  background-color: #377081;
  color: white;
  padding: 0px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.3s;

  &:hover {
    background-color: #306575;
  }
`;