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
    articleList: [
      {
        source: "le360",
        title: "'Ensam A7san mdrassa' - ki goul Ennaji",
        date: "Aout 14, 2020    16:04",
        content: "https://le360.com/ki_goul_ennaji",
        image:
          "https://www.doyoubuzz.com/var/users/_/2013/2/2/12/436687/avatar/458976/avatar_cp_big.jpg?t=1597246065",
        cat: ["simple", "positif", "le360", "célébrité", "education"],
      },
      {
        source: "welovebuzz",
        title: "Yasser Baalla : 'ana a7san l3ab d lkora ou li ma 3jbou 7al'",
        date: "Aout 12, 2020    18:36",
        content: "https://welovebuzz.com/yasser_baalla",
        image:
          "https://scontent.fcmn2-2.fna.fbcdn.net/v/t1.0-9/20882062_881541558669982_4788438431407912129_n.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=yMKPIgda6MIAX8FDU50&_nc_ht=scontent.fcmn2-2.fna&oh=e814e852d94bd76bbd060bf6c3f82e4f&oe=5F592650",
        cat: [
          "simple",
          "negatif",
          "welovebuzz",
          "célébrité",
          "sport",
          "football",
        ],
      },
      {
        source: "hespress",
        title: "Othmani : khourjo tsaraw bach drbou m3akou 350 DH l wa7ed",
        date: "Aout 12, 2020    07:29",
        content: "https://hespress.com/Othmani",
        image:
          "https://cdn.telquel.ma/content/uploads/2017/09/Capture-d%E2%80%99e%CC%81cran-2017-09-15-a%CC%80-11.33.23.png",
        cat: ["simple", "neutre", "covid", "politique", "celebrité"],
      },
    ],
    loader: false,
    searching: false,
    anchor: false,
  };

  componentDidMount() {
    this.fire();
  }
  fire = (e, cat = {}, search = "") => {
    let content = [];
    let link = "http://localhost:8000";
    this.setState({ loader: true });
    let Data = { search, cat };
    axios.post(link, Data).then((response) => {
      // content = [...this.state.articleList, ...response.data];
      // this.setState({ articleList: content });
      console.log(response.data);
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
    console.log(search);
    console.log(cat);
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
        <Drawer anchor={this.state.anchor} toggleDrawer={this.toggleDrawer} />
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
          <Cards articleList={this.state.articleList} />
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
