import React from 'react'


const Schedule = ({ home, away, homeScore, awayScore, location, round}) => {
  return (
    <div>
      <h1>Home: {home}</h1>
      <h1>Away: {away}</h1>
      <p>{homeScore}</p>
      <p>{awayScore}</p>
      <p>Stadium {location}</p>
      <p>round {round}</p>
    </div>
  )
}

export default Schedule
