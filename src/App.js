import React, { Component } from "react";
import Card from "./card";

class App extends Component {
  state = {
    name: "tarik",
    age: 20,
  };
  render() {
    return (
      <div className="App">
        <h2>Welcome {this.state.name} !</h2>
        <Card age={this.state.age} />
      </div>
    );
  }
}

export default App;
