import React, { Component } from "react";
import Header from "./HeaderArticle";
import Drawer from "./drawer";
import { Typography, Box, Card, Grid } from "@material-ui/core";
import { Reply } from "@material-ui/icons";
// import { Button } from "@material-ui/core";

class Article extends Component {
  state = {
    id: "none",
    anchor: false,
    searching: false,
  };
  componentDidMount() {
    let id = this.props.location.pathname.replace("/art", "");
    if (this.props.location.state) {
      this.setState({
        id: id,
        backup: this.props.location.state.backup,
        article: this.props.location.state.article,
      });
    } else {
      this.setState({
        id: id,
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
    let { source, content, title } = this.props.location.state.article;
    return (
      <div>
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
            className={source}
          >
            <Grid container>
              <Grid
                item
                xs={6}
                onClick={(e) => this.fire(e, { tag: source }, "")}
              >
                <Typography
                  className="breadcrump"
                  style={{ fontWeight: 500, fontSize: "1.2em" }}
                >
                  {source}
                </Typography>
              </Grid>
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
                  style={{ fontWeight: 500, fontSize: "1.2em", float: "right" }}
                >
                  <Reply style={{ position: "relative", bottom: "-5px" }} />
                  retourner a la liste
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <iframe title={title} src={content} />
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
