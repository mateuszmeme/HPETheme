import React from "react";

import { Box, Grommet } from "grommet";
import { hpe } from "grommet-theme-hpe";
import { customHpe } from "../../theme/customTheme";
import HeaderWrap from "./HeaderWrap";
import { deepMerge } from "grommet/utils";
import ThemeProvider from "../../context/ThemeContext";
import StateProvider from "../../context/StateProvider";

const theme = deepMerge(hpe, customHpe);
const HeaderApp = ({config}) => {
  return (
    <StateProvider>
	  <ThemeProvider>
		  <HeaderWrap config={config} />
	  </ThemeProvider>
    </StateProvider>
  );
};

export default HeaderApp;
