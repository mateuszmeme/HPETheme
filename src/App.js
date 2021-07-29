import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import StateProvider from "./context/StateProvider";
import ThemeProvider from "./context/ThemeContext";
import "./style/app.scss";
import Demo from "./components/Content/pages/Demo";

function App() {
  return (
    <StateProvider>
      <ThemeProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Demo} />
          </Switch>
        </Router>
      </ThemeProvider>
    </StateProvider>
  );
}

export default App;
