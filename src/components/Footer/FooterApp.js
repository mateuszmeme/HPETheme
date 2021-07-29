import React, { useContext } from "react";

import { Box, Grommet } from "grommet";
import { hpe } from "grommet-theme-hpe";

import { customHpe } from "../../theme/customTheme";
import FooterWrap from "./FooterWrap";
import { deepMerge } from "grommet/utils";
import { ThemeContext } from "../../context/ThemeContextFooter";
import ThemeProvider from "../../context/ThemeContextFooter";
import StateProvider from "../../context/StateProvider";

const FooterApp = ({config}) => {

  return (
    <StateProvider>
	  <ThemeProvider>
		  <FooterWrap config={config} />
	  </ThemeProvider>
    </StateProvider>
  );
};

export default FooterApp;
