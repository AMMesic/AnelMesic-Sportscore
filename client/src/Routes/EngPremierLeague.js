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
   
  
  const [teams, setAllTeams] = useState(['']);

  const [loading, setLoading] = useState(false);

  
  const getFootballTeams = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:5000/englishPL`);
    const data = await res.json();
    

    setAllTeams(data);
    setLoading(false);
  };
;

  useEffect(() => {
    getFootballTeams();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
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
             {console.log(teams)}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default EngPremierLeague;
