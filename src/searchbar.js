import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  TextField,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  ListItemText,
  OutlinedInput,
} from "@material-ui/core";
import { NearMeSharp } from "@material-ui/icons";

class Searchbar extends Component {
  state = {
    categories: {
      sources: { le360: true, hespress: true, welovebuzz: true },
      complexité: { complexe: true, simple: true },
      émotion: { positif: true, negatif: true, neutre: true },
      politique: {
        politique: true,
        "parties politiques": true,
        parlement: true,
        Histoire: true,
      },
      economie: {
        economie: true,
        tourisme: true,
        bourse: true,
        immobilier: true,
      },
      sport: { sport: true, Football: true },
      société: { société: true, "réseaux sociaux": true },
      santé: { santé: true, covid: true },
      science: { science: true, agriculture: true, espace: true },
      nature: { nature: true, animaux: true },
      religion: {
        religion: true,
        "eid el adha": true,
      },
      revue: { revue: true, "revue de presse": true, "revue du web": true },
      rumeurs: true,
      statistiques: true,
      célébrité: true,
      divertissement: true,
      monde: true,
      culture: true,
      "Local Trends": true,
      "loi / Décret": true,
      terrorisme: true,
      meteo: true,
      "blessures,accidents et décès": true,
      education: true,
    },
  };
  handleChange = (e) => {
    let cat = e.target.name;
    let value = e.target.checked;
    this.setState((prevState) => ({
      categories: {
        ...prevState.categories,
        [cat]: value,
      },
    }));
  };
  handleListChange = (name, cat, categories) => {
    let fullcat = categories[cat];
    fullcat[name] = !fullcat[name];
    this.setState((prevState) => ({
      categories: {
        ...prevState.categories,
        [cat]: fullcat,
      },
    }));
  };
  render() {
    const categories = this.state.categories;
    const switches = Object.keys(categories).map((cat, index) => {
      if (typeof categories[cat] != "boolean") {
        return (
          <Grid item xs={6} md={3} key={index}>
            <FormControl fullWidth>
              <Select
                color="primary"
                multiple
                value={Object.keys(categories[cat])}
                // onChange={(e) => this.handleListChange(name, cat)}
                input={<OutlinedInput color="primary" />}
                renderValue={() => cat}
              >
                {Object.keys(categories[cat]).map((name, index2) => (
                  <MenuItem
                    key={index2}
                    value={name}
                    onClick={(e) =>
                      this.handleListChange(name, cat, categories)
                    }
                  >
                    <Checkbox checked={categories[cat][name]} color="primary" />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        );
      } else {
        return (
          <Grid item xs={6} md={3} key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.categories[cat]}
                  onChange={this.handleChange}
                  name={cat}
                  color="primary"
                />
              }
              label={cat}
            />
          </Grid>
        );
      }
    });
    return (
      <Grid container direction="column" justify="center" alignItems="stretch">
        <Grid item xs={12}>
          <form onSubmit={this.props.search} noValidate autoComplete="off">
            <TextField
              className="searchbar"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </Grid>
        <Grid xs={10} item className="paperAnim">
          <Grid spacing={2} container>
            {switches}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Searchbar;
