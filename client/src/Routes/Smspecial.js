import React, { useState } from 'react';
import Sm from '../components/Sm';
import Schedule from '../components/Schedule'
import Loading from './Loading';
import Button from '@material-ui/core/Button';
import uuid from 'uuid/v4';

import './Allsvenskan.css';

const Smspecial = () => {
  const [teams, setAllTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSm = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:5000/allsvenskan/round`);
    const data = await res.json();

    setAllTeams(data);
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="search-bar">
          <form onSubmit={getSm} className="search-form"></form>
          <div className="button">
            <Button
              className="search-button"
              variant="outlined"
              onClick={getSm}
              style={{ height: 80 }}
            >
              GO Bajen!
            </Button>
          </div>
        </div>
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
            />
          ))}
          {loading && <Loading />}
        </div>
      </header>
    </div>
  );
};

export default Smspecial;
