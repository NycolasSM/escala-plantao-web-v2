import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  :root {
    --blue-50: #94d0e2;
    --blue-100: #2FAEE0;

    --black: #000000;
    --white: #fff;
    --black-06: rgb(0, 0, 0,  0.6);

    --gray-30: #F9F9F9;
    --gray-50: #8B9093;
    --gray-100: #E6E6E6;

    --red: #FE8E8E;

    --button-primary: #55bee6;

  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
    font-family: "Poppins", sans-serif;
  }

  html { 
    overflow-x: hidden;
  }

  body {
    height: 100vh;
    width: 100vw;
  }
`;

export default GlobalStyle;
