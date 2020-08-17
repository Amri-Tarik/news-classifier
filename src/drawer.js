import React, { Component } from "react";
import {
  SwipeableDrawer,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";

const cats = [
  ["sources", "le360", "hespress", "welovebuzz"],
  ["complexité", "complexe", "simple"],
  ["sentiments", "positif", "negatif", "neutre"],
  ["politique", "parties politiques", "parlement", "Histoire"],
  ["economie", "tourisme", "bourse", "immobilier"],
  ["sport", "Football"],
  ["société", "réseaux sociaux"],
  ["santé", "covid"],
  ["science", "agriculture", "espace"],
  ["nature", "animaux"],
  ["religion", "eid el adha"],
  ["revue", "revue de presse", "revue du web"],
  [
    "rumeurs",
    "statistiques",
    "célébrité",
    "divertissement",
    "monde",
    "culture",
    "Local Trends",
    "loi / Décret",
    "terrorisme",
    "meteo",
    "blessures, accidents et décès",
    "education",
  ],
];

class Drawer extends Component {
  render() {
    const cat_list = cats.map((elements) => {
      let cat_mini_list = elements.map((element, index) => {
        if (element !== elements[0] && elements[0] !== "rumeurs") {
          return (
            <ListItem button key={index} style={{ width: "250px" }}>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <i>
                <ListItemText primary={element} />
              </i>
            </ListItem>
          );
        } else {
          return (
            <ListItem button key={index} style={{ width: "250px" }}>
              <ListItemText primary={element} />
            </ListItem>
          );
        }
      });
      cat_mini_list.push(<Divider />);
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
