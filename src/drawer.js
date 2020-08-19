import React, { Component } from "react";
import {
  SwipeableDrawer,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@material-ui/core";

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
const cats = [
  { sources: <Web />, le360: <Web />, hespress: <Web />, welovebuzz: <Web /> },
  // {
  //   complexité: (
  //     <img
  //       alt="complexité"
  //       src="https://img.icons8.com/pastel-glyph/24/000000/glasses.png"
  //     />
  // ),
  {
    complexe: (
      <img
        alt="complexe"
        src="https://img.icons8.com/ios/24/000000/circled-c.png"
      />
    ),
    simple: (
      <img
        alt="Simple"
        src="https://img.icons8.com/ios/24/000000/circled-s.png"
      />
    ),
  },
  {
    // sentiments: <HourglassEmpty />,
    positif: <Mood />,
    negatif: <MoodBad />,
    neutre: <SentimentSatisfied />,
  },
  {
    politique: <Gavel />,
    "parties politiques": <Gavel />,
    parlement: <AccountBalance />,
    Histoire: <History />,
  },
  {
    economie: <AttachMoney />,
    tourisme: <FlightTakeoff />,
    bourse: <ShowChart />,
    immobilier: <HomeWork />,
  },
  { sport: <Sports />, Football: <SportsSoccer /> },
  { société: <People />, "réseaux sociaux": <Twitter /> },
  {
    santé: <LocalHospital />,
    covid: (
      <img
        alt="covid"
        src="https://img.icons8.com/wired/24/000000/coronavirus.png"
      />
    ),
  },
  {
    science: <Icon path={mdiReact} title="science" size={1} />,
    agriculture: <Icon path={mdiSprout} title="agriculture" size={1} />,
    espace: <Icon path={mdiSpaceStation} title="espace" size={1} />,
  },
  { nature: <Eco />, animaux: <Pets /> },
  {
    religion: <Icon path={mdiIslam} title="espace" size={1} />,
    "eid el adha": <Icon path={mdiSheep} title="espace" size={1} />,
  },
  {
    revue: <MenuBook />,
    "revue de presse": <MenuBook />,
    "revue du web": <MenuBook />,
  },
  {
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
        alt="terrorism"
        src="https://img.icons8.com/metro/26/000000/assault-rifle.png"
      />
    ),
    meteo: <Cloud />,
    "blessures, accidents et décès": <Warning />,
    education: <LocalLibrary />,
  },
];

class Drawer extends Component {
  render() {
    let count = 100;
    const cat_list = cats.map((elements) => {
      count += 1;
      let cat_mini_list = Object.keys(elements).map((element, index) => {
        if (
          index !== 0 &&
          !("rumeurs" in elements) &&
          !("complexe" in elements) &&
          !("positif" in elements)
        ) {
          return (
            <ListItem button key={index} style={{ width: "250px" }}>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <ListItemIcon>{elements[element]}</ListItemIcon>
              <i>
                <ListItemText primary={element} />
              </i>
            </ListItem>
          );
        } else {
          return (
            <ListItem button key={index} style={{ width: "250px" }}>
              <ListItemIcon>{elements[element]}</ListItemIcon>
              <ListItemText primary={element} />
            </ListItem>
          );
        }
      });
      cat_mini_list.push(<Divider key={count} />);
      return cat_mini_list;
    });
    return (
      <SwipeableDrawer
        disableBackdropTransition
        anchor="left"
        open={Boolean(this.props.anchor)}
        onClose={() => this.props.toggleDrawer(false)}
        onOpen={() => this.props.toggleDrawer(true)}
      >
        {cat_list}
      </SwipeableDrawer>
    );
  }
}

export default Drawer;
