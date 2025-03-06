import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 20px 30px 20px;
`;

export const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 500;
  /* margin-right: -30px; */
  margin-top: 20px;
`;

export const Section = styled.div`
  display: flex;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const SectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 0px;

  h1 {
    font-size: 18px;
    font-weight: 500;
  }

  p {
    font-size: 14px;
  }

  * {
    margin: 0;
    padding: 0;
  }
`