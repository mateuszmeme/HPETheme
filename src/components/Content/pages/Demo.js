import React, { useContext } from "react";

import { Box, Grommet } from "grommet";
import { hpe } from "grommet-theme-hpe";

import { customHpe } from "../../../theme/customTheme";
import AppFooter from "../../Footer/AppFooter";
import HeaderLight from "../../Header/Header";
import { deepMerge } from "grommet/utils";
import { ThemeContext } from "../../../context/ThemeContext";

const theme = deepMerge(hpe, customHpe);
const Demo = () => {
  const { themeMode } = useContext(ThemeContext);
  return (
    <Grommet theme={theme} themeMode={themeMode}>
      <HeaderLight />
      <Box height="large" justify="center" align="center" full>
        App Body
      </Box>
      <AppFooter />
    </Grommet>
  );
};

export default Demo;
