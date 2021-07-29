# Header Next

-npm i
<br/>
-npm run webstart
<br/><br/>
In config.js - the settings are:
<br/>
themeSelected: 'dark', //'dark' or 'light'
<br/>
themeTransperent: true, // true or false
<br/>
<br/>
the issue is that when you set the Theme to dark and Transparent to true - the theme stays goes with light.
<br/><br/>
We are updating the background with a deep merge in the css:
<br/>
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
<br/><br/>
But I believe the HPE Grommet theme is doing a calculation on which theme to load 
<br/>
https://github.com/grommet/grommet-theme-hpe/blob/master/src/js/index.js
<br/>
such as:
<br/>
'background-contrast': {
        dark: '#FFFFFF14',
        light: '#0000000A',
      },
      <br/>
then later used in:
<br/>
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
     <br/><br/>       
and other calcuations based on: 'text'strong':
<br/>
theme.global.colors['text-strong'][theme.dark ? 'dark' : 'light']            
<br/>
