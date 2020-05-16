import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./configs/routes";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router basename="/web-client">
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact
              render={props => <route.component {...props} {...route.props} />}
            />
          ))}
        </Switch>
      </Router>
    );
  }
}

export default App;
