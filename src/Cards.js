import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import SportsSoccer from "@material-ui/icons/SportsSoccer";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import {
  Share,
  Sports,
  Person,
  Book,
  BugReport,
  Gavel,
} from "@material-ui/icons";

const icons = {
  football: <SportsSoccer />,
  sport: <Sports />,
  celebrité: <Person />,
  education: <Book />,
  Covid: <BugReport />,
  politique: <Gavel />,
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
          <Card style={{ height: 430 }}>
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
