import React, { Component } from "react";
import Cards from "./Cards";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import Drawer from "./drawer";
import Button from "@material-ui/core/Button";
import { Typography, Box } from "@material-ui/core";
import { Refresh, Build, Storage, Info } from "@material-ui/icons";
// reference icon8.com in footer dude dont forget !!!

class App extends Component {
  constructor() {
    super();
    this.unload.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.unload);
  }

  unload(e) {
    let blob = new Blob([JSON.stringify(["client exited"])]);
    navigator.sendBeacon("http://localhost:8000/test", blob);
  }
  state = {
    articleList: [],
    loader: false,
    searching: false,
    anchor: false,
    server_down: { value: false, cat: {}, search: "" },
    no_results: true,
    breadcrump: [],
  };

  componentDidMount() {
    this.fire();
    window.addEventListener("beforeunload", this.unload);
  }
  fire = (e, cat = {}, search = "") => {
    document.getElementById("root").style.cursor = "progress";
    if ((!search && !cat.tag) || cat.tag === "sources") {
      this.setState({ breadcrump: [] });
    } else if (!cat.tag) {
      this.setState({ breadcrump: ["search", search] });
    } else {
      this.setState({ breadcrump: ["tag", cat.tag] });
    }
    let link = "http://localhost:8000";
    this.setState({
      server_down: { value: false, cat: {}, search: "" },
      loader: true,
      no_results: false,
    });
    let Data = { search, cat };
    axios
      .post(link, Data)
      .then((response) => {
        return JSON.parse(response.data);
      })
      .then((response) => {
        if (response.dataError) {
          const data = [];
          this.setState({ articleList: data, no_results: true });
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
        document.getElementById("root").style.cursor = "default";
      })
      .catch((error) => {
        if (!error.response) {
          // network error
          const data = [];
          this.setState({ articleList: data });
          this.setState({
            loader: false,
            server_down: { value: true, cat: cat, search: search },
          });
          console.log("Error: Network Error");
          document.getElementById("root").style.cursor = "default";
        } else {
          console.log(error.response.data.message);
          document.getElementById("root").style.cursor = "default";
        }
      });
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
  render() {
    return (
      <div
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            this.setState({ searching: false });
          }
        }}
        className="App"
      >
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
          listing={this.state.breadcrump}
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

          {this.state.breadcrump.length ? (
            <>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}></Grid>
            </>
          ) : (
            <Grid item xs={12}></Grid>
          )}

          {this.state.server_down.value ? (
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              spacing={4}
            >
              <Grid item xs={12}>
                <Typography component={"span"}>
                  <Box fontWeight="400" style={{ fontSize: "calc(1em + 1vw)" }}>
                    looks like the server is down !
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component={"span"}
                  style={{ alignContent: "center", justifyContent: "center" }}
                >
                  <Box style={{ fontSize: "calc(0.5em + 1vw)", zIndex: "2" }}>
                    we'll try fixing it as fast as possible !
                    <div
                      style={{ zIndex: "1", display: "inline-block" }}
                      className="fixinparent"
                    >
                      <Build color="primary" className="fixin" />
                    </div>
                    <Storage />
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<Refresh />}
                  color="primary"
                  onClick={(e) =>
                    this.fire(
                      e,
                      this.state.server_down.cat,
                      this.state.server_down.search
                    )
                  }
                >
                  Retry Search
                </Button>
              </Grid>
            </Grid>
          ) : this.state.no_results ? (
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              spacing={4}
            >
              <Grid item xs={12}>
                <Typography component={"span"}>
                  <Box
                    fontWeight="400"
                    style={{ fontSize: "calc(1.4em + 1vw)" }}
                  >
                    no results :(
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component={"span"}>
                  <Info fontSize="small" />
                  <span style={{ fontSize: "calc(0.7em + 1vw)" }}>
                    {"    "}try to be more broad !
                  </span>
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Cards
              articleList={this.state.articleList}
              clickables={(e, cat, search) => this.fire(e, cat, search)}
            />
          )}
          <Grid item xs={2}></Grid>
          {this.state.loader ? (
            <Grid item xs={12} style={{ textAlign: "center" }}>
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
