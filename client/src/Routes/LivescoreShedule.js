import React from 'react'
import './LivescoreSchedule.css'


const LivescoreSchedule = ({ home, away, homeScore, awayScore, location, round, homeYellow, homeRed, awayYellow ,awayRed}) => {
  return (
    <div className="livescore-placeholder">
      <h3>Home: {home}</h3>
      <h3>Away: {away}</h3>
      <p>{homeScore}</p>
      <p>{awayScore}</p>
      <p>Stadium {location}</p>
      <p>round {round}</p>
      <p>Home yellow cards {homeYellow}</p>
      <p>Home red cards  {homeRed}</p>
      <p>Home yellow cards {awayYellow}</p>
      <p>Home red cards {awayRed}</p>
    </div>
  )
}

export default LivescoreSchedule