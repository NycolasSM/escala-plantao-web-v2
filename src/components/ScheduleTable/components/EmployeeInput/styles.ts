import styled from "styled-components";

export const EmployeeInputContainer = styled.div`
  width: 22rem;
  /* height: 37px; */

  @media (max-width: 520px) {
    width: 10rem;
  } ;
`;

// Estilização do Select Input
export const customStyles = {
  // As opções em si
  // option: () => ({
  //   backgroundColor: "red",
  //   // cursor: "pointer",
  //   // display: "flex",
  //   // flexWrap: "nowrap",
  //   // paddingLeft: "1rem",
  //   // marginBottom: "0.5rem",
  //   // fontSize: "14px",
  // }),
  // Lista das opções
  // menuList: () => ({
  //   backgroundColor: "blue",
  //   // width: "80px",
  //   // display: "flex",
  //   // flexDirection: "row",
  //   height: "100%"
  // }),
  // valueContainer: () => ({
  //   backgroundColor: "blue",
  //   width: "240px",
  //   // minWidth: "40%",
  //   // maxWidth: "100%",
  //   // display: "flex",
  //   // flexWrap: "nowrap",
  //   // overflow: "hidden",
  // }),
  //   control: () => ({
  //   }),
  // multiValue: () => ({
  //   display: "flex",
  //   // alignItems: "center",
  //   background: "#51d2fd",
  //   overflow: "hidden",
  //   height: "28px"
  // }),
  multiValueLabel: (provided: any, state: any) => ({
    ...provided,
    // fontSize: "15px",
    // fontWeight: "500",
    // marginLeft: "0.5rem",
    overflow: "hidden",
    width: "205px",
  }),
  //   placeholder: () => ({
  //     alignItems: "center",
  //     fontSize: "14px",
  //     paddingLeft: "10px",
  //   }),
  input: (provided: any, state: any) => ({
    ...provided,
    // width: "5rem",
    // marginLeft: "1rem",
    // position: "absolute",
    // zIndex: "-1px",
    // right: "1px",
    // top: "4px",
    // display: "none",
    // height: "1px",
    // width: state.isFocused ? "250px" : "1px",
    // width: "10px",
  }),
};
