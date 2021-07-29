import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext('dark');

const ThemeContextProvider = (props) => {
  const [themeMode, setTheme] = useState("light");
  const [themeTransperent, setTranperent] = useState(false);

  /*const toggleTheme = () => {
    if (themeMode === "light") {
      setTheme("dark");
      setTranperent(false);
      window.localStorage.setItem("themeMode", "dark");
      window.localStorage.setItem("transperent", false);
    } else {
      setTheme("light");
      setTranperent(false);
      window.localStorage.setItem("themeMode", "light");
      window.localStorage.setItem("transperent", false);
    }
  };*/
  const changeTransparent = (transparent) => {
    if(transparent == 1) {
      console.log('in in in in true');
      setTranperent(true);      
      window.localStorage.setItem("transperent", true);
    }
    else {
      console.log('in in in in false');
      setTranperent(false);
      window.localStorage.setItem("transperent", false); 
      //if no transparency set, transperent -> false
    }

  }
  const changeThemes = (theme) => {      
    if (theme === "light") {
      console.log('changeThemes to light')
      setTheme("light");      
      window.localStorage.setItem("themeMode", "light");      
    } else {
      setTheme("dark");      
      console.log('changeThemes to dark')
      window.localStorage.setItem("themeMode", "dark"); 
      //if no theme set, theme -> dark     
    } 
  };

 /* const toggleThemeTransperent = () => {
    //setTheme("light");
    setTranperent(true);
    //window.localStorage.setItem("themeMode", "light");
    window.localStorage.setItem("transperent", true);
  };*/

  useEffect(() => {
 console.log('ThemeContextProvider useEffect');
   const localTheme = window.localStorage.getItem("themeMode");   
    const themeTransperentLocal = window.localStorage.getItem("transperent");
    console.log('get themes not setting from localstorage values: localTheme:' + localTheme + 'themeTransperentLocal' + themeTransperentLocal );
    // if (localTheme) {
    //   setTheme(localTheme);
    //   setTranperent(themeTransperentLocal);
    // } else {
    //   window.localStorage.setItem("themeMode", "light");
    //   setTranperent(themeTransperentLocal);
    // }
  }, []);

  const { children } = props;
  const values = {
        //toggleTheme,
        //toggleThemeTransperent,
        themeTransperent,
        themeMode,
        setTheme,
        changeThemes,
        changeTransparent
      };
  return (
    <ThemeContext.Provider
      value={values}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
