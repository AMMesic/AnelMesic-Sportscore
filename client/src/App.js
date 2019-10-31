import React, { useEffect, useState } from 'react'
import Schedule from './components/Schedule'
import Loading from './components/Loading'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

import './App.css'

function App() {
  const [teams, setAllTeams] = useState([])
  const [teamNames, setTeamNames] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('Hammarby')
  const [loading, setLoading] = useState(false)

  const getFootballStats = async () => {
    setLoading(true)
    console.log('getFootballStats')
    const res = await fetch(`http://localhost:5000/allsvenskan/${query}`)
    const data = await res.json()
    // console.log(data)

    setAllTeams(data)
    setLoading(false)
  }

  const getFootballTeams = async () => {
    console.log('getFootballTeams')
    setLoading(true)
    const res = await fetch(`http://localhost:5000/allsvenskan/teams`)
    const data = await res.json()
    console.log(data)

    setTeamNames(data)
    setLoading(false)
  }

  const updateSearch = e => {
    e.preventDefault()
    console.log('updateSearch', e.target.value)
    setSearch(e.target.value)
    // setQuery(search)
  }

  const getSearch = e => {
    e.preventDefault()
    console.log('getSearch', search)
    setSearch('')
    setQuery(search)
  }
  useEffect(() => {
    console.log('useEffect')
    const func = async () => {
      await getFootballStats()
    }
    func()
  }, [query])
  
  return (

    <div className="App">
      <header className="App-header">
      <form onClick={getSearch} className="search-form">
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={updateSearch}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        {/* <div className="search-bar">
        <form onSubmit={getSearch} className="search-form">
      <Autocomplete className="autocomplete"
        options={teamData}
        // getOptionLabel={option => option}
        // value={search}
        // onClick={getSearch}
        onChange={updateSearch}
        
        style={{ width: 300, justifyContent: "center"}}
        renderInput={params => (
          <TextField {...params} label="Teams" variant="outlined"  fullWidth />
        )
      }
      />
      </form>
      <Button className="search-button" variant="outlined" onClick={getSearch}>
            Search
          </Button>
      </div> */}
      

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

export default App
