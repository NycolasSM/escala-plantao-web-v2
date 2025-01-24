import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.6rem;
  background: var(--blue-50);
  padding: 0.5rem 3rem;
  z-index: 10;

  @media (max-width: 1400px) {
    height: 3.6rem;
  }

  position: relative;

  .main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    h1 {
      font-size: 1.5rem;
      color: #fff;
    }

    .image-container {
      position: absolute;

      display: flex;

      height: 100%;
      width: fit-content;

      align-items: center;
      left: 6rem;
      color: var(--white);

      .sabesp-img {
        padding: 0.8rem;
        /* height: fit-content; */
        /* width: 5rem; */
      }

      .localsig-img {
        padding: 0.8rem;
        height: fit-content;
        width: 20rem;

        margin-left: 2rem;

        @media (max-width: 1366px) {
          width: 14rem;
        }
      }
    }
  }

  @media (max-width: 520px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const HeaderLoginMobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  h1 {
    color: var(--white);
    font-size: 1rem;
    white-space: nowrap;
  }
`;
