import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Searchbar from "./searchbar";
import { Grid } from "@material-ui/core";
import { ArrowBack, Home } from "@material-ui/icons";
import Breadcrump from "./breadcrump";

class Header extends Component {
  state = {
    isSearching: false,
  };
  render() {
    return (
      <Grid
        style={{ position: "fixed", zIndex: 3, top: 0 }}
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <AppBar position="fixed">
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
                aria-label="home"
                onCLick={(e) => this.props.SearchOff(e, {}, "")}
                color="inherit"
              >
                <Home />
              </IconButton>
              <IconButton
                aria-label="Search"
                onClick={(e) => {
                  if (this.props.searching) {
                    this.props.SearchOff(e, {}, "", true);
                  } else {
                    this.props.search();
                  }
                }}
                //   onClick={this.startAnimation}
                color="inherit"
              >
                {this.props.searching ? <ArrowBack /> : <SearchIcon />}
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
          <Breadcrump listing={this.props.listing} />
        )}
      </Grid>
    );
  }
}

export default Header;
