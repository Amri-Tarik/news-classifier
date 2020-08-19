import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

import Icon from "@mdi/react";
import {
  mdiSpaceStation,
  mdiSprout,
  mdiReact,
  mdiIslam,
  mdiSheep,
  mdiAccountVoice,
  mdiAccountSwitch,
} from "@mdi/js";

import {
  Share,
  Web,
  Mood,
  MoodBad,
  SentimentSatisfied,
  Gavel,
  AccountBalance,
  History,
  AttachMoney,
  FlightTakeoff,
  ShowChart,
  HomeWork,
  Sports,
  SportsSoccer,
  People,
  Twitter,
  LocalHospital,
  Eco,
  Pets,
  MenuBook,
  Deck,
  Public,
  CameraEnhance,
  Cloud,
  Warning,
  LocalLibrary,
  Equalizer,
  Stars,
} from "@material-ui/icons";

const icons = {
  sources: <Web />,
  le360: <Web />,
  hespress: <Web />,
  welovebuzz: <Web />,
  complexe: (
    <img
      className="imgicon"
      alt="complexe"
      src="https://img.icons8.com/ios/24/000000/circled-c.png"
    />
  ),
  simple: (
    <img
      className="imgicon"
      alt="Simple"
      src="https://img.icons8.com/ios/24/000000/circled-s.png"
    />
  ),
  positif: <Mood />,
  negatif: <MoodBad />,
  neutre: <SentimentSatisfied />,
  politique: <Gavel />,
  "parties politiques": <Gavel />,
  parlement: <AccountBalance />,
  Histoire: <History />,
  economie: <AttachMoney />,
  tourisme: <FlightTakeoff />,
  bourse: <ShowChart />,
  immobilier: <HomeWork />,
  sport: <Sports />,
  football: <SportsSoccer />,
  société: <People />,
  "réseaux sociaux": <Twitter />,
  santé: <LocalHospital />,
  covid: (
    <img
      className="imgicon"
      alt="covid"
      src="https://img.icons8.com/windows/24/000000/coronavirus.png"
    />
  ),
  science: <Icon path={mdiReact} title="science" size={1} />,
  agriculture: <Icon path={mdiSprout} title="agriculture" size={1} />,
  espace: <Icon path={mdiSpaceStation} title="espace" size={1} />,
  nature: <Eco />,
  animaux: <Pets />,
  religion: <Icon path={mdiIslam} title="espace" size={1} />,
  "eid el adha": <Icon path={mdiSheep} title="espace" size={1} />,
  revue: <MenuBook />,
  "revue de presse": <MenuBook />,
  "revue du web": <MenuBook />,
  rumeurs: <Icon path={mdiAccountVoice} title="espace" size={1} />,
  statistiques: <Equalizer />,
  célébrité: <Stars />,
  divertissement: <Deck />,
  monde: <Public />,
  culture: <Icon path={mdiAccountSwitch} title="espace" size={1} />,
  "Local Trends": <CameraEnhance />,
  "loi / Décret": <Gavel />,
  terrorisme: (
    <img
      className="imgicon"
      alt="terrorism"
      src="https://img.icons8.com/metro/26/000000/assault-rifle.png"
    />
  ),
  meteo: <Cloud />,
  "blessures, accidents et décès": <Warning />,
  education: <LocalLibrary />,
};

class Cards extends Component {
  render() {
    const { articleList } = this.props;
    const cardList = articleList.map((article, keys) => {
      var chips = [];
      var chipkeys = 0;
      article.cat.forEach((element) => {
        chips.push(
          <Grid item key={chipkeys}>
            <Chip
              label={element}
              icon={icons[element]}
              color="primary"
              // onClick={}
            />
          </Grid>
        );
        chipkeys++;
      });
      return (
        <Grid item key={keys} md={5} sm={10} xs={10}>
          <Card>
            <CardHeader subheader={article.source} style={{ height: 0 }} />
            <CardActionArea
              onClick={() => window.open(article.content, "_blank")}
            >
              <CardMedia
                image={article.image}
                alt={article.title}
                title={article.title}
                component="img"
                height="200"
              />
            </CardActionArea>
            <CardContent>
              <Grid container direction="column" spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    noWrap={true}
                    style={{ fontSize: "1.2rem" }}
                  >
                    <a
                      href={article.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ all: "inherit", cursor: "pointer" }}
                    >
                      {article.title}
                    </a>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {article.date}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container spacing={1}>
                    {chips}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <IconButton aria-label="share">
                <Share />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      );
    });
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        {cardList}
      </Grid>
    );
  }
}

export default Cards;
