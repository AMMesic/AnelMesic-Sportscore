import React from 'react';
import './Sm.css';

const Schedule = ({
  home,
  away,
  homeScore,
  awayScore,
  location,
  round,
  homeYellow,
  homeRed,
  awayYellow,
  awayRed
}) => {
  return (
    <div className="sm-placeholder">
      <h3>Home: {home}</h3>
      <h3>Away: {away}</h3>
      <p>{homeScore}</p>
      <p>{awayScore}</p>
      <p>Stadium {location}</p>
      <p>Home yellow cards {homeYellow}</p>
      <p>Home red cards {homeRed}</p>
      <p>Home yellow cards {awayYellow}</p>
      <p>Home red cards {awayRed}</p>
      <p>round {round}</p>
    </div>
  );
};

export default Schedule;
