import React, { Component } from "react";
import Header from "./HeaderArticle";
import Drawer from "./drawer";
import {
  Typography,
  Box,
  Card,
  Grid,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Reply } from "@material-ui/icons";
import axios from "axios";
// import { Button } from "@material-ui/core";

class Article extends Component {
  state = {
    id: "none",
    anchor: false,
    searching: false,
    from_list: false,
    no_results: false,
    server_down: false,
    loader: true,
    article: {
      source: "placeholder",
      content: "placeholder",
      title: "placeholder",
    },
  };
  componentDidMount() {
    let id = this.props.location.pathname.replace("/art", "");
    if (this.props.location.state) {
      this.setState({
        from_list: true,
        id: id,
        backup: this.props.location.state.backup,
        article: this.props.location.state.article,
        loader: false,
      });
    } else {
      let link = "http://localhost:8000/id/";
      let data = { id: id };
      axios
        .post(link, data)
        .then((response) => {
          return JSON.parse(response.data);
        })
        .then((response) => {
          if (response.dataError) {
            this.setState({ no_results: true });
            this.setState({ loader: false });
          } else {
            this.setState({
              id: id,
              article: response.article,
            });
            this.setState({ loader: false });
          }
        })
        .catch((error) => {
          if (!error.response) {
            this.setState({
              server_down: true,
            });
            this.setState({ loader: false });
            console.log("Error: Network Error");
          } else {
            this.setState({ loader: false });
            console.log(error.response.data.message);
          }
        });
    }
  }

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
        <Backdrop style={{ zIndex: "3" }} open={this.state.loader}>
          <CircularProgress color="primary" />
        </Backdrop>
        <Box
          className="flexing smoothdrop"
          style={{
            position: "absolute",
            left: "-8px",
            top: "-1vh",
            height: "100vh",
          }}
        >
          <Card
            style={{
              width: "100vw",
              height: "10vh",
              position: "sticky",
            }}
            className={this.state.article.source}
          >
            <Grid container>
              <Grid
                item
                xs={6}
                onClick={(e) =>
                  this.fire(e, { tag: this.state.article.source }, "")
                }
              >
                <Typography
                  className="breadcrump"
                  style={{ fontWeight: 500, fontSize: "1.2em" }}
                >
                  {this.state.article.source}
                </Typography>
              </Grid>
              {this.state.from_list ? (
                <Grid
                  item
                  xs={6}
                  onClick={(e) =>
                    this.props.history.push({
                      pathname: "/",
                      state: this.props.location.state.backup,
                    })
                  }
                >
                  <Typography
                    className="breadcrump"
                    style={{
                      fontWeight: 500,
                      fontSize: "1.2em",
                      float: "right",
                    }}
                  >
                    <Reply style={{ position: "relative", bottom: "-5px" }} />
                    retourner a la liste
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={6}></Grid>
              )}
            </Grid>
          </Card>
          <iframe
            title={this.state.article.title}
            src={this.state.article.content}
          />
        </Box>
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

export default Article;
