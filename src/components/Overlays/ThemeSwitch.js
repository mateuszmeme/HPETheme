import React, { useState, useContext } from "react";
import { Box, Button } from "grommet";
import { Moon, Sun, Layer } from "grommet-icons";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeSwitch = () => {
	console.log('ThemeSwitch, ThemeContextProvider');

  const { toggleTheme, themeMode, toggleThemeTransperent } = useContext(
    ThemeContext
  );
  const mycontext = useContext(
    ThemeContext
  );
	console.log(mycontext);
	console.log('themeMode');
	console.log(themeMode);
  const [icon, setIcon] = useState(true);

  const iconChange = () => {
    let newIcon = !icon;
    setIcon(newIcon);
  };

  return (
    <Box
      align="start"
      flex
      direction="column"
      gap="xsmall"
      pad={{ horizontal: "small", vertical: "small" }}
    >
      <Box onClick={toggleTheme} fill margin="0 0 10px 0">
        <Button
          onClick={iconChange}
          icon={themeMode === "light" ? <Moon /> : <Sun />}
          label={themeMode === "light" ? "Dark" : "Light"}
        />
      </Box>
      <Box onClick={toggleThemeTransperent}>
        <Button icon={<Layer />} label="Transparent" />
      </Box>
    </Box>
  );
};

export default ThemeSwitch;
