import React, { useContext, useEffect } from "react";

import { Box, Grommet } from "grommet";
import { hpe } from "grommet-theme-hpe";

import { customHpe } from "../../theme/customTheme";
import HeaderLight from "./Header";
import AppFooter from "../Footer/AppFooter";
import { deepMerge } from "grommet/utils";
import { ThemeContext } from "../../context/ThemeContext";

const theme = deepMerge(hpe, customHpe);
const HeaderApp = ({config}) => {
  const { toggleThemeTransperent, themeMode, themeTransperent } = useContext(ThemeContext);
  console.log('HeaderApp');
  console.log(theme);
  console.log(themeMode);

  useEffect(()=> {
    if (config && config.transparentHeader) {
      toggleThemeTransperent();
    }
  }, []);

  return (
		<Grommet theme={theme} themeMode={themeMode} background={themeTransperent ? "header-tranperent" : null}>
		  <HeaderLight />
		</Grommet>
  );
};

export default HeaderApp;
