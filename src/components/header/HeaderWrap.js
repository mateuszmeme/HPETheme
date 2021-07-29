import React, { useContext, useEffect } from "react";

import { Box, Grommet } from "grommet";
import { hpe } from "grommet-theme-hpe";

import { customHpe } from "../../theme/customTheme";
import HeaderLight from "./Header";
import AppFooter from "../Footer/AppFooter";
import { deepMerge } from "grommet/utils";
import { ThemeContext } from "../../context/ThemeContext";

const theme = deepMerge(hpe, customHpe);
console.log(theme);
const HeaderApp = ({config}) => {
  const { themeMode, setTheme, changeThemes , changeTransparent, themeTransperent } = useContext(ThemeContext);  
  console.log('HeaderApp');
  /*console.log(theme);
  console.log('themeMode: ' + themeMode);
  console.log('themeTransperent: ' + themeTransperent);
  console.log('config.themeSelected: ' + config.themeSelected);
  console.log('config.themeTransperent: ' + config.themeTransperent);*/
  
  useEffect(()=> {
    if (config.themeTransperent == 1) {   
      console.log('IN config.themeTransperent true');      
      changeTransparent(true)
      //themeTransperent = true;      
    } else {
      console.log('IN config.themeTransperent false');
      changeTransparent(false)
      //themeTransperent = false;
    } 
  
     if (config.themeSelected == 'light') {      
      //setTheme('light');      
      changeThemes('light');      
      //themeTransperent = true;
      //console.log('themeTransperent in the end: ' + themeTransperent);      
      console.log('theme light');
    } else {
      changeThemes('dark');      
      console.log('theme dark');
      //themeTransperent = false;
      //console.log('themeTransperent in the end: ' + themeTransperent);      
    } 
    
    
  }, []);

  return (
		<Grommet theme={theme} themeMode={themeMode} background={themeTransperent ? "header-tranperent" : null}>           
		  <HeaderLight config={config} />
		</Grommet>
  );
};

export default HeaderApp;
