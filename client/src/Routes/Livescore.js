import React, { useEffect, useState } from 'react';
import LivescoreSchedule from '../components/LivescoreShedule';
import Loading from './Loading';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Livescore.css';
import uuid from 'uuid/v4';

const Livescore = () => {
  const [teams, setAllTeams] = useState([]);
  const [state, setAllState] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const getLivescore = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:5000/livescore/${search}`);
    const data = await res.json();

    setAllTeams(data);
    setLoading(false);
  };

  const getLivescoreData = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:5000/livescore/leaguenames`);
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
    getLivescoreData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="search-bar">
          <form className="search-form">
            <Autocomplete
              className="autocomplete"
              autoHightlight
              autoComplete={true}
              options={state}
              onChange={updateSearchAutoComplete}
              onSubmit={getLivescore}
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
          <Button
            className="search-button"
            variant="outlined"
            onClick={getLivescore}
            style={{
              height: 85,
              background: 'linear-gradient(45deg, #cfd9df 30%, #e2ebf0 90%)'
            }}
          >
            Search
          </Button>
        </div>
        <div className="football-stats">
          {teams.map(stats => (
            <LivescoreSchedule
              key={uuid()}
              home={stats.homeName}
              away={stats.awayName}
              homeScore={stats.homeScore}
              awayScore={stats.awayScore}
              leagueName={stats.leagueName}
              location={stats.location}
              round={stats.round}
              homeYellow={stats.homeYellow}
              homeRed={stats.homeRed}
              awayYellow={stats.awayYellow}
              awayRed={stats.awayRed}
            />
          ))}
          {loading && <Loading />}
        </div>
      </header>
    </div>
  );
};

export default Livescore;
