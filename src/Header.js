import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Searchbar from "./searchbar";
import { Grid } from "@material-ui/core";

class Header extends Component {
  render() {
    return (
      <Grid
        style={{ position: "fixed", zIndex: 3, top: 0 }}
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => this.props.drawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4">News-classifier</Typography>
            <div
              style={{
                position: "absolute",
                right: "0.5em",
              }}
            >
              <IconButton
                aria-label="Search"
                onClick={this.props.search}
                //   onClick={this.startAnimation}
                color="inherit"
              >
                <SearchIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {this.props.searching ? (
          <Grid item className="searchgrid">
            <Searchbar
              search={(e, cat, search) => this.props.SearchOff(e, cat, search)}
            />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    );
  }
}

export default Header;
