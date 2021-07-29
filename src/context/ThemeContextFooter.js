import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext('dark');

const ThemeContextProvider = (props) => {
  const [themeMode, setTheme] = useState("light");
  const [themeTransperent, setTranperent] = useState(false);

  const toggleTheme = () => {
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
  };

  const toggleThemeTransperent = () => {
    setTheme("light");
    setTranperent(true);
    window.localStorage.setItem("themeMode", "light");
    window.localStorage.setItem("transperent", true);
  };

  useEffect(() => {
 console.log('ThemeContextProvider useEffect');
   const localTheme = window.localStorage.getItem("themeMode");
    const themeTransperentLocal = window.localStorage.getItem("transperent");

    if (localTheme) {
      setTheme(localTheme);
      setTranperent(themeTransperentLocal);
    } else {
      window.localStorage.setItem("themeMode", "light");
      setTranperent(themeTransperentLocal);
    }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const localTheme = window.localStorage.getItem("themeMode");
            const themeTransperentLocal = window.localStorage.getItem("transperent");

            const footerlocalTheme = window.localStorage.getItem("footerthemeMode");
            const footerthemeTransperentLocal = window.localStorage.getItem("footertransperent");

            if (localTheme && localTheme != footerlocalTheme) {
                setTheme(localTheme);
                window.localStorage.setItem("footerthemeMode", localTheme);
            }
            if (themeTransperentLocal && themeTransperentLocal != footerthemeTransperentLocal) {
                setTranperent(themeTransperentLocal);
                window.localStorage.setItem("footertransperent", themeTransperentLocal);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

  const { children } = props;
  const values = {
        toggleTheme,
        toggleThemeTransperent,
        themeTransperent,
        themeMode
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
