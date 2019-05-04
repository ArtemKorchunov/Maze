import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    base: "#33B5FF"
  },
  paddings: {
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem"
  },
  shadow: {
    gray: "-1px 6px 20px 0px #eceaea"
  }
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
