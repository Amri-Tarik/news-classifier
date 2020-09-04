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
  fire = (e, cat = {}, search = "") => {
    let link = "http://localhost:8000";
    this.setState({ loader: true });
    let Data = { search, cat };
    axios
      .post(link, Data)
      .then((response) => {
        console.log(response.data);
        return JSON.parse(response.data);
      })
      .then((response) => {
        if (response.dataError) {
          let data = [];
          this.setState({ articleList: data });
          console.log("ydnaa fih a ayoub");
        } else {
          this.setState({ articleList: response });
        }
        this.setState({ loader: false });
        let ratio =
          window.screen.width /
          document.getElementsByClassName("hey")[0].scrollWidth;
        if (window.screen.width < 600) {
          document
            .getElementsByName("viewport")[0]
            .setAttribute(
              "content",
              "width=device-width, initial-scale=" + ratio
            );
        }
      });
  };
  SearchOn = (e) => {
    this.setState({ searching: true });
  };
  SearchOff = (e, cat, search) => {
    this.setState({ searching: false });
    this.fire(e, cat, search);
  };
  toggleDrawer = (open) => {
    this.setState({
      anchor: open,
    });
  };
  render() {
    return (
      <div className="App">
        <Drawer
          anchor={this.state.anchor}
          clickables={(e, cat, search) => this.fire(e, cat, search)}
          toggleDrawer={this.toggleDrawer}
        />
        <Header
          search={this.SearchOn}
          SearchOff={(e, cat, search) => this.SearchOff(e, cat, search)}
          searching={this.state.searching}
          drawer={this.toggleDrawer}
        />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Cards
            articleList={this.state.articleList}
            clickables={(e, cat, search) => this.fire(e, cat, search)}
          />
          <Grid item xs={2}></Grid>
          {this.state.loader ? (
            <Grid item xs={2}>
              <CircularProgress />
            </Grid>
          ) : (
            <span />
          )}
          <Grid item></Grid>
        </Grid>
        <div className={this.state.searching ? "overlay" : "hey"}></div>
      </div>
    );
  }
}

export default App;
