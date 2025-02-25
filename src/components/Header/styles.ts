import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 0px;
  right: 0px;
  padding-top: 8px;
  padding-right: 21px;
  padding-left: 20px;
  padding-bottom: 10px;
  position: sticky;
  left: 0px;

  span, h3 {
    font-weight: 400;
    color:#2a2f36;
    font-size: 16px;
    margin: 0;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    height: 46px;
    border: none;
    transition: all ease 0.1s;

    :hover {
      cursor: pointer;
      filter: brightness(0.98);
    }

    span {
      width: 80%;
      padding-left: 5px;
      align-items: flex-start;
      text-align: center;
      font-size: 14px;
    }
  }
`;

export const UserOptions = styled.button`
  -webkit-box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.1);
  background-color: #222d32;
  width: 210px;
  color: #fafafa !important;
  height: 100%;
  border: none;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
    margin: 0 3px;
    font-size: 15px;
    color: #fafafa !important;
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 30px;
  min-height: 51px;
  width: 100%;
  background-color: #ffffff;
  /* background-color: #2582a0; */
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid #a4a4a4;
`;

export const Filters = styled.div`
  display: flex;
  /* min-width: 900px; */
  gap: 10px;

  .p-inputtext {
    border: solid 1px #72817e;
    padding: 0 15px;
    font-size: 14px;

    :hover {
      border: solid 1px #70c1cf;
    }

    :active {
      border: solid 1px #70c1cf;
      box-shadow: none;
    }
  }

  .input__calendar {
    height: 38px;
    width: 155px;
    border-radius: 5px;
  }
`;

export const UserButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 50%;
  border: solid 1px #c9c9c9;
  padding: 10px;
  cursor: pointer;
`

export const DropdownMenu = styled.div`
  position: absolute;
  top: 55px;
  right: 20px;
  background-color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 1000;
  display: none;
  flex-direction: column;

  &.active {
    display: flex;
  }

  button {
    display: flex;
    gap: 8px;
    padding: 0px 20px !important;
    background: none;
    border: none;
    text-align: left;
    width: 100%;
    cursor: pointer;
    height: 36px;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;