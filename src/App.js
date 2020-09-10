import React, { Component } from "react";
import Home from "./home";
import Article from "./article";
import { BrowserRouter, Route } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@material-ui/core";
import {
  Copyright,
  Facebook,
  Twitter,
  Instagram,
  WhatsApp,
} from "@material-ui/icons";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/art:id" component={Article} />
          </div>
          <footer id="site-footer">
            <Grid container spacing={1}>
              <Grid item xs={1}></Grid>
              <Grid item xs={11} md={4}>
                <Typography component={"span"}>
                  {" "}
                  <span
                    style={{
                      fontWeight: "700",
                      fontSize: "1.2em",
                      textDecoration: "underline",
                    }}
                  >
                    A PROPOS DE CE SITE:{" "}
                  </span>{" "}
                  <br />
                  News Classifier est un moteur de recherche créé par un groupe
                  d'élèves-ingenieurs qui estiment que tout le monde a le droit
                  d'accéder à l'information sans poudres aux yeux ni filtres.{" "}
                  <br />
                  Ce site met en oeuvre des technologies avancées pour prédire
                  les catégories et d'autres classifications "humaines" pour
                  chaque article.
                </Typography>
              </Grid>
              <Grid item xs={1} md={2}></Grid>
              <Grid item xs={10} md={4}>
                <Typography>
                  {" "}
                  <span
                    style={{
                      fontWeight: "500",
                      fontSize: "1.2em",
                      textDecoration: "underline",
                    }}
                  >
                    NOUS CONTACTER :
                  </span>{" "}
                  <br />
                  <Button startIcon={<Facebook />}>Facebook</Button>
                  <br />
                  <Button startIcon={<Twitter />}>Twitter</Button>
                  <br />
                  <Button startIcon={<Instagram />}>Instagram</Button>
                  <br />
                  <Button startIcon={<WhatsApp />}>Whatsapp</Button>
                </Typography>
              </Grid>
              <Grid item xs={1} md={1}></Grid>
            </Grid>
            <Box className="adjustable2">
              <Button startIcon={<Copyright />}>
                Copyright reserved - 2020
              </Button>
              {" - "}
              <Button>
                Some icons are provided curtesy of :
                <a href="https://icons8.com">{" Icons8.com"}</a>
              </Button>
            </Box>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
