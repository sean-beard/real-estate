import Navigation from "components/navigation";
import FormulaPage from "components/pages/formula";
import ProjectionPage from "components/pages/projection";
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  public render() {
    return (
      <Router>
        <React.Fragment>
          <Navigation />
          <Route exact={true} path="/" component={ProjectionPage} />
          <Route exact={true} path="/formulas" component={FormulaPage} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
