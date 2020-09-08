import React, { Component } from "react";
import Home from "./home";
import Article from "./article";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/art:id" component={Article} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
