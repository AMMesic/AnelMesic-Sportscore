import React, { useEffect, useState } from 'react'
import Schedule from '../Routes/Schedule'
import Loading from './Loading'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import './Allsvenskan.css'


const Allsvenskan = () => {
  const [teams, setAllTeams] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const getFootballStats = async () => {
    setLoading(true)
    const res = await fetch(`http://localhost:5000/allsvenskan/${search}`)
    const data = await res.json()

    setAllTeams(data)
    setLoading(false)
  }

  const updateSearchAutoComplete = e => {
    setSearch(e.target.textContent)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="search-bar">
        <form onSubmit={getFootballStats} className="search-form">
      <Autocomplete className="autocomplete"
        autoHightlight
        autoComplete={true}
        options={teamData}
        onChange={updateSearchAutoComplete}
        style={{ width: 'auto', justifyContent: "center"}}
        renderInput={(params) => (
        <TextField {...params} value={search} onChange={updateSearch} label="Teams" variant="outlined"  fullWidth />
        )
      }
      />
      </form>
      <div className="button">
      <Button className="search-button" variant="outlined" onClick={getFootballStats} style={{ height: 80}}>
            Search
          </Button>
          </div>
      </div>
      <div className="football-stats">
      {teams.map(stats => (
        <Schedule
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
  )
}

const teamData = [
  'AFC Eskilstuna',    'AIK Solna',
  'Djurgardens',       'Elfsborg',
  'Falkenberg',        'GIF Sundsvall',
  'Hacken',            'Hammarby',
  'Helsingborg',       'IFK Goteborg',
  'IFK Norrkoping FK', 'IK Sirius FK',
  'Kalmar',            'Malmo FF',
  'Orebro',            'Ostersunds FK'
]

export default Allsvenskan