import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  bgColor1: "white",
  bgColor2: "#f8f8f8",
  fontColor1: "black",
  fontColor2: "#4C4C4C",
  accentColor: "orange",
  greyColor: "#8C8C8C",
};

export const darkTheme = {
  bgColor1: "black",
  bgColor2: "#4C4C4C",
  fontColor1: "white",
  fontColor2: "#EAEAEA",
  accentColor: "orange",
  greyColor: "#8C8C8C",
};

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Work Sans";
}
`;
