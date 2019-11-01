import React, { useEffect, useState } from 'react';
import Schedule from '../components/Schedule';
import Loading from './Loading';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import uuid from 'uuid/v4';

import './Allsvenskan.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

const Allsvenskan = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
   
  const [teams, setAllTeams] = useState([]);
  const [state, setAllState] = useState(['']);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const getFootballStats = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:5000/allsvenskan/${search}`);
    const data = await res.json();

    setAllTeams(data);
    setLoading(false);
  };
  const getFootballTeams = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:5000/allsvenskan/teams`);
    const data = await res.json();

    setAllState(data);
    setLoading(false);
  };

  const updateSearchAutoComplete = e => {
    setSearch(e.target.textContent);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getFootballTeams();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="search-bar">
          <form onSubmit={getFootballStats} className="search-form">
            <Autocomplete
              className="autocomplete"
              autoHightlight
              autoComplete={true}
              options={state}
              onChange={updateSearchAutoComplete}
              style={{ width: 'auto', justifyContent: 'center' }}
              renderInput={params => (
                <TextField
                  {...params}
                  value={search}
                  onChange={updateSearch}
                  label="Teams"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </form>
          <div className="button">
            <Button
              className="search-button"
              variant="outlined"
              onClick={getFootballStats}
              style={{
                height: 85,
                background: 'linear-gradient(45deg, #cfd9df 30%, #e2ebf0 90%)'
              }}
            >
              Search
            </Button>
          </div>
        </div>
      </header>
      <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <ExpansionPanelSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              Schedule and stats for games
            </Typography>
            <Typography className={classes.secondaryHeading}>
              Click to expansion
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="football-stats">
              {teams.map(stats => (
                <Schedule
                  key={uuid()}
                  home={stats.homeName}
                  away={stats.awayName}
                  homeScore={stats.homeScore}
                  awayScore={stats.awayScore}
                  location={stats.location}
                  round={stats.round}
                  homeYellow={stats.homeYellow}
                  homeRed={stats.homeRed}
                  awayYellow={stats.awayYellow}
                  awayRed={stats.awayRed}
                  season={stats.season}
                  weather={stats.weather}
                />
              ))}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Allsvenskan;
