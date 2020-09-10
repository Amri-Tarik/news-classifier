import React, { Component } from "react";
import Header from "./HeaderArticle";
import Drawer from "./drawer";
import { Typography } from "@material-ui/core";

class About extends Component {
  state = {
    anchor: false,
    searching: false,
  };

  SearchOn = (e) => {
    this.setState({ searching: true });
  };
  SearchOff = (e, cat = {}, search = "", no_search = false) => {
    this.setState({ searching: false });
    if (!no_search) {
      this.fire(e, cat, search);
    }
  };
  ToggleSearch = () => {
    this.setState({ searching: false });
  };
  toggleDrawer = (open) => {
    this.setState({
      anchor: open,
    });
  };

  fire = (e, cat, search) => {
    console.log(cat);
    this.props.history.push({
      pathname: "/",
      state: {
        cat: cat,
        search: search,
      },
    });
  };
  render() {
    return (
      <div
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            this.setState({ searching: false });
          }
        }}
      >
        <Drawer
          anchor={this.state.anchor}
          clickables={(e, cat, search) => this.fire(e, cat, search)}
          toggleDrawer={this.toggleDrawer}
        />
        <Header
          search={this.SearchOn}
          SearchOff={(e, cat, search, truth) =>
            this.SearchOff(e, cat, search, truth)
          }
          searching={this.state.searching}
          drawer={this.toggleDrawer}
        />
        <Typography variant="h1">Rba3a d lkfaytia</Typography>
        <div className={this.state.searching ? "overlay" : "hey"}></div>
      </div>
    );
  }
}

// {/* <Button
//     onClick={() =>
//     this.props.history.push({
//         pathname: "/",
//         state: this.props.location.state.backup,
//     })
//     }
// >
//     return to home
// </Button>  */}

export default About;
