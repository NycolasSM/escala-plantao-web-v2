import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

export const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: -5px;
`;

export const ScalesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #f2f2f2;

  th, td {
    border: 1px solid #ddd;
    padding: 8px 12px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormButtons = styled.div`
  display: flex;
  gap: 10px;
`

export const LinkButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: solid 1px #377081;
  border-radius: 4px;
  background-color: #377081;
  
  :hover {
    background-color:#306575;
    cursor: pointer;
  }

  * {
    color: white;
    font-size: 12px;
  }
`