import React from "react";
import ReactDOM from "react-dom";
import { deepMerge } from "grommet/utils";
import "./style/fonts.scss";
import "./style/index.scss";
import App from "./App";
import HeaderApp from "./components/Header/HeaderApp";
import { defaults } from "./config/config";
//import HeaderLight from "./components/Header/Header";
import AppFooter from "./components/Footer/FooterApp";

let config = defaults;

window._hpe_service = {
  init(obj) {
    if (!obj) {
      return;
    }
    config = deepMerge(config, obj);
	var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
      link.href = config.cssBaseUrl + "main.css";

      head.appendChild(link);	
	  
      console.log('config.cssBaseUrl');
      console.log(config.cssBaseUrl);

    ReactDOM.render(<HeaderApp config={config} />, document.getElementById(config.header.el));
    ReactDOM.render(<AppFooter config={config} />, document.getElementById(config.footer.el));
  },
};

// For testing standalone without the client set 
// to true to execute below code
//config.autoInject = false;
if (!config.autoInject) {
  ReactDOM.render(<HeaderApp />, document.getElementById("hpe-global-header2"));
  ReactDOM.render(<AppFooter />, document.getElementById("hpe-global-footer"));
}
