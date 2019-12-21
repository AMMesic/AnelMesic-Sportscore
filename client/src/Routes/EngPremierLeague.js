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
    fontSize: theme.typography.pxToRem(10),
    color: theme.palette.text.primary,
    paddingLeft: 100
    
  },
  panelDetailClass: {

  }
}));

const EngPremierLeague = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
   
  const [stats, setAllStats] = useState([]);
  const [teams, setAllTeams] = useState(['']);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const getFootballStats = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:5000/allsvenskan/${search}`);
    const data = await res.json();

    setAllStats(data);
    setLoading(false);
  };
  const getFootballTeams = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:5000/englishPL/teams`);
    const data = await res.json();

    setAllTeams(data);
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
              options={teams}
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
          <ExpansionPanelDetails className={classes.panelDetailClass}>
            <div className="football-stats">
              
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default EngPremierLeague;
