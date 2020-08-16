import React, { Component } from "react";
import Cards from "./Cards";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid, Box } from "@material-ui/core";
import Header from "./Header";

class App extends Component {
  state = {
    articleList: [],
    loader: false,
    searching: false,
  };
  componentDidMount() {
    this.fire();
  }
  fire = (e) => {
    let content = [];
    let link = "http://localhost/static/test.json";
    this.setState({ loader: true });
    axios.post(link).then((response) => {
      console.log(response.data);
      content = [...this.state.articleList, ...response.data];
      this.setState({ articleList: content });
      this.setState({ loader: false });
    });
  };
  SearchOn = (e) => {
    this.setState({ searching: true });
  };
  SearchOff = (e) => {
    e.preventDefault();
    this.setState({ searching: false });
    this.fire(e);
  };
  render() {
    return (
      <div className="App">
        <Header
          search={this.SearchOn}
          SearchOff={this.SearchOff}
          searching={this.state.searching}
        />
        <Grid container direction="column" alignItems="center" spacing={4}>
          <Grid item></Grid>
          <Grid item>
            <Cards articleList={this.state.articleList} />
          </Grid>
          {this.state.loader ? (
            <Grid item>
              <CircularProgress />
            </Grid>
          ) : (
            <span />
          )}
        </Grid>
        <div className={this.state.searching ? "overlay" : "hey"}></div>
      </div>
    );
  }
}

export default App;
