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
import { Container, Box } from "@material-ui/core";

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
  Football: <SportsSoccer />,
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
  "loi et décret": <Gavel />,
  terrorisme: (
    <img
      className="imgicon"
      alt="terrorism"
      src="https://img.icons8.com/metro/26/000000/assault-rifle.png"
    />
  ),
  meteo: <Cloud />,
  "blessures accidents et décès": <Warning />,
  education: <LocalLibrary />,
};

class Cards extends Component {
  render() {
    let chipkeys = 0;
    const { articleList } = this.props;
    const cardList = articleList.map((article, keys) => {
      let chips = [];
      article.cat.forEach((element) => {
        chips.push(
          <Grid item key={chipkeys}>
            <Chip
              label={element}
              icon={icons[element]}
              color="primary"
              onClick={(e) => this.props.clickables(e, { tag: element }, "")}
            />
          </Grid>
        );
        chipkeys++;
      });
      return (
        <Grid item key={keys} md={4} sm={6} xs={10}>
          <Card
            style={{
              background: "WhiteSmoke",
              position: "relative",
              height: "100% ",
            }}
          >
            <Typography component="span">
              <CardHeader
                subheader={article.source}
                disableTypography={true}
                style={{
                  height: 0,
                }}
                onClick={(e) =>
                  this.props.clickables(e, { tag: article.source }, "")
                }
                className={
                  article.source.search("le360") !== -1
                    ? "le360"
                    : article.source
                }
              />
            </Typography>
            <CardActionArea onClick={() => this.props.sendToPage(article)}>
              <CardMedia
                image={
                  article.image === "welovebuzz"
                    ? "https://www.welovebuzz.com/wp-content/uploads/2019/05/wlb.jpg"
                    : article.image
                }
                alt={article.title}
                title={article.title}
                component="img"
                height="200"
              />
            </CardActionArea>
            <CardContent style={{ background: "WhiteSmoke" }}>
              <Grid container direction="row" alignItems="stretch" spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    // wordWrap="break-word"
                    gutterBottom
                    variant="h5"
                    component="h2"
                    style={{ fontSize: "1.2rem" }}
                  >
                    <a
                      href="/#"
                      onClick={() => this.props.sendToPage(article)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ all: "inherit", cursor: "pointer" }}
                    >
                      {article.title}
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {article.date}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    {chips}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box style={{ height: "40px" }} />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions
              style={{
                background: "WhiteSmoke",
                position: "absolute",
                bottom: "0px",
              }}
            >
              <IconButton aria-label="share">
                <Share />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      );
    });
    return (
      <Container>
        <Grid
          className="findme"
          container
          direction="row"
          justify="center"
          alignItems="stretch"
          spacing={2}
        >
          {cardList}
        </Grid>
      </Container>
    );
  }
}

export default Cards;
