import React, { Component } from "react";
import Cards from "./Cards";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import Drawer from "./drawer";

// reference icon8.com in footer dude dont forget !!!

class App extends Component {
  state = {
    articleList: [],
    loader: false,
    searching: false,
    anchor: false,
  };

  componentDidMount() {
    this.fire();
  }
  fire = (e) => {
    let content = [];
    let link = "https://api.jsonbin.io/b/5f39b80aaf209d1016bcced3";
    this.setState({ loader: true });
    axios.get(link).then((response) => {
      content = [...this.state.articleList, ...response.data];
      this.setState({ articleList: content });
      this.setState({ loader: false });
      let ratio =
        window.screen.width /
        document.getElementsByClassName("hey")[0].scrollWidth;
      document
        .getElementsByName("viewport")[0]
        .setAttribute("content", "width=device-width, initial-scale=" + ratio);
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
  toggleDrawer = (open) => {
    this.setState({
      anchor: open,
    });
  };
  render() {
    return (
      <div className="App">
        <Drawer anchor={this.state.anchor} toggleDrawer={this.toggleDrawer} />
        <Header
          search={this.SearchOn}
          SearchOff={this.SearchOff}
          searching={this.state.searching}
          drawer={this.toggleDrawer}
        />
        <Grid container direction="column" alignItems="center" spacing={4}>
          <Grid item></Grid>
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
