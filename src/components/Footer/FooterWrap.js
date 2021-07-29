import React, { useContext, useEffect } from "react";
import { hpe } from "grommet-theme-hpe";
import { customHpe } from "../../theme/customTheme";
import { Grommet } from "grommet";
import AppFooter from "./AppFooter";
import { deepMerge } from "grommet/utils";
import { ThemeContext } from "../../context/ThemeContextFooter";

const theme = deepMerge(hpe, customHpe);

const FooterApp = ({config}) => {
  const { themeMode, themeTransperent } = useContext(
    ThemeContext
  );
  console.log('AppFooter');
  console.log(theme);
  console.log(themeMode);

  return (
		<Grommet theme={theme} themeMode={themeMode}  background={themeTransperent && themeTransperent === "true" ? "header-tranperent" : "normal-bg"}>
		  <AppFooter />
		</Grommet>
  );
};

export default FooterApp;
