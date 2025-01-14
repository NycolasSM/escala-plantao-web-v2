import styled from "styled-components";

export const UserContainer = styled.div`
  position: absolute;
  right: 6rem;
  background: #80acba;
  border-radius: 6px;
  width: fit-content;
  z-index: 2000;
  cursor: pointer;

  .content {
    padding: 0.5rem 0.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: fit-content;

    p {
      font-weight: 700;
      font-size: 0.75rem;
      color: #fff;
      white-space: nowrap;
      user-select: none;
    }
  }

  @media (max-width: 520px) {
    display: none;
  };
`;