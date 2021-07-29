# Header Next

-npm i
-npm run webstart

In config.js - the settings are:
themeSelected: 'dark', //'dark' or 'light'
themeTransperent: true, // true or false

the issue is that when you set the Theme to dark and Transparent to true - the theme stays goes with light.

We are updating the background with a deep merge in the css:
export const customHpe = {
  global: {
    colors: {
      "normal-bg": {
        dark: "#263040",
        light: "#fff",
      },
      "header-tranperent": {
        dark: "transparent",
        light: "transparent",
      },
      text: {      
        dark: 'white',
        light: '#444444',
      },
    },
  },
};

But I believe the HPE Grommet theme is doing a calculation on which theme to load 
https://github.com/grommet/grommet-theme-hpe/blob/master/src/js/index.js
such as:
'background-contrast': {
        dark: '#FFFFFF14',
        light: '#0000000A',
      },
then later used in:
 header: {
      border: { side: 'bottom' },
      color: 'text-strong',
      extend: ({ column, sort, sortable, theme }) => {
        return `
          ${sort &&
            sort.property === column &&
            `
            background: ${
              theme.global.colors['background-contrast'][
                theme.dark ? 'dark' : 'light'
              ]
            }
            ....
            
and other calcuations based on: 'text'strong':
theme.global.colors['text-strong'][theme.dark ? 'dark' : 'light']            
