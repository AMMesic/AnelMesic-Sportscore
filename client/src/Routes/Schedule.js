import React from 'react'
import './Schedule.css'



const Schedule = ({ home, away, homeScore, awayScore, location, round, homeYellow, homeRed, awayYellow ,awayRed}) => {
  return (
    <div className="footballstats-placeholder">
      
      <h3>Home: {home}</h3>
      <h3>Away: {away}</h3>
      <p>Home goals: {homeScore}</p>
      <p>Away goals: {awayScore}</p>
      <p>Stadium {location}</p>
      <p>Home yellow cards {homeYellow}</p>
      <p>Home red cards  {homeRed}</p>
      <p>Home yellow cards {awayYellow}</p>
      <p>Home red cards {awayRed}</p>
      <p>round {round}</p>
    </div>
  )
}

export default Schedule
