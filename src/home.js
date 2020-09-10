import React, { Component } from "react";
import Cards from "./Cards";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import Drawer from "./drawer";
import Button from "@material-ui/core/Button";
import {
  Typography,
  Box,
  Backdrop,
  Card,
  TextField,
  Dialog,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  Refresh,
  Build,
  Storage,
  Info,
  FileCopyOutlined,
} from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";
// reference icon8.com in footer dude dont forget !!!

class Home extends Component {
  state = {
    articleList: [],
    loader: false,
    searching: false,
    anchor: false,
    server_down: { value: false, cat: {}, search: "" },
    no_results: true,
    breadcrump: [],
    pages: 1,
    current: 1,
    sharing: false,
    share_url: "",
    session_key: "empty",
  };

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.cat !== undefined) {
        let { cat, search } = this.props.location.state;
        this.fire("temp", cat, search);
      } else {
        this.setState(this.props.location.state);
      }
    } else {
      this.fire();
    }
  }

  sharing = (id) => {
    let url = window.location.href + "art" + id;
    this.setState({ share_url: url, sharing: true });
  };

  sendToPage = (article) => {
    this.props.history.push({
      pathname: "/art" + article.id,
      state: {
        backup: this.state,
        article: article,
      },
    });
    return false;
  };

  pageFire = (page) => {
    this.setState({ current: page });
    let link = "http://localhost:8000/page/";
    let breadcrump = [];
    if (this.state.breadcrump === []) {
      breadcrump = ["page " + page];
    } else {
      breadcrump = [...this.state.breadcrump, "page " + page];
    }
    this.setState({ breadcrump: breadcrump });
    axios
      .post(link, { page: page, session_key: this.state.session_key })
      .then((response) => {
        return JSON.parse(response.data);
      })
      .then((response) => {
        if (response.dataError) {
          const data = [];
          this.setState({ articleList: data, no_results: true, pages: 1 });
        } else {
          this.setState({
            articleList: response.articleList,
          });
        }
        this.setState({ loader: false });
      })
      .catch((error) => {
        if (!error.response) {
          // network error
          const data = [];
          this.setState({ articleList: data, pages: 1 });
          this.setState({
            loader: false,
            server_down: {
              value: true,
              cat: this.state.server_down.cat,
              search: this.state.server_down.search,
            },
          });
          console.log("Error: Network Error");
        } else {
          console.log(error.response.data.message);
        }
      });
  };

  fire = (e, cat = {}, search = "") => {
    if (cat.tag && cat.tag !== "sources") {
      this.setState({ breadcrump: ["tag", cat.tag] });
    } else if (!cat.sources) {
      this.setState({ breadcrump: [] });
    } else {
      this.setState({ breadcrump: ["search", search] });
      if (!search) {
        this.setState({ breadcrump: ["search", "custom search"] });
      }
    }
    let link = "http://localhost:8000";
    this.setState({
      server_down: { value: false, cat: cat, search: search },
      loader: true,
      no_results: false,
      current: 1,
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
          this.setState({ articleList: data, no_results: true, pages: 1 });
        } else {
          this.setState({
            articleList: response.articleList,
            pages: response.pages,
            session_key: response.session_key,
          });
        }
        this.setState({ loader: false });
      })
      .catch((error) => {
        if (!error.response) {
          // network error
          const data = [];
          this.setState({ articleList: data, pages: 1 });
          this.setState({
            loader: false,
            server_down: { value: true, cat: cat, search: search },
          });
          console.log("Error: Network Error");
        } else {
          console.log(error.response.data.message);
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
      >
        <Box
          style={{
            zIndex: "2",
            pointerEvents: "none",
            width: "100%",
            position: "sticky",
            top: "93vh",
            display: "flex",
          }}
        >
          <Card
            style={{
              pointerEvents: "initial",
              margin: "0 auto",
              width: "fit-content",
              backgroundColor: "#5971ea",
            }}
          >
            <Pagination
              onChange={(e, value) => this.pageFire(value)}
              page={this.state.current}
              count={this.state.pages}
              color="primary"
            />
          </Card>
        </Box>
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
          listing={this.state.breadcrump}
        />
        <Backdrop style={{ zIndex: "3" }} open={this.state.loader}>
          <CircularProgress color="primary" />
        </Backdrop>
        <Dialog
          open={this.state.sharing}
          onClose={() => this.setState({ sharing: false })}
        >
          <Card>
            <Typography component="span">
              <Grid style={{ padding: "10px" }} container spacing={3}>
                <Grid
                  style={{ fontSize: "calc(1vw + 0.6em)", fontWeight: "500" }}
                  item
                  xs={12}
                >
                  Partager l'article :
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    label="lien"
                    defaultValue={this.state.share_url}
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ width: "100%" }}
                    id="copyText"
                    variant="filled"
                    focused={true}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Tooltip title="Copier l'adresse" placement="top">
                    <IconButton
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        var copyText = document.getElementById("copyText");
                        copyText.select();
                        document.execCommand("copy");
                      }}
                    >
                      <FileCopyOutlined fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Typography>
          </Card>
        </Dialog>

        <Grid
          component={Card}
          elevation={4}
          container
          direction="row"
          justify="center"
          alignItems="stretch"
          spacing={4}
          className="adjustable"
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
              <Grid item xs={12} md={12}>
                <Typography component={"span"}>
                  <Box
                    fontWeight="400"
                    style={{ fontSize: "calc(1.4em + 1vw)" }}
                  >
                    no results :(
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
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
              sendToPage={(article) => this.sendToPage(article)}
              articleList={this.state.articleList}
              clickables={(e, cat, search) => this.fire(e, cat, search)}
              setShare={(id) => this.sharing(id)}
            />
          )}
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
        </Grid>

        <div className={this.state.searching ? "overlay" : "hey"}></div>
      </div>
    );
  }
}

export default Home;
