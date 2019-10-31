import React, { useEffect, useState } from 'react'
import Schedule from './components/Schedule'
import Loading from './components/Loading'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';

import './App.css'

function App() {
  const [teamNames, setTeamNames] = useState([])
  const [teams, setAllTeams] = useState([])
  const [search, setSearch] = useState('Hammarby')
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
    console.log('updateSearch')
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    console.log('getSearch')
    setQuery(search)
    // setSearch('')
  }
  useEffect(() => {
    console.log('useEffect')
    const func = async () => {
      await getFootballTeams()
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
        options={teamNames}
        // getOptionLabel={option => option}
        // value={search}
        onChange= {updateSearch}
        onClose={getSearch}
        style={{ width: 300, justifyContent: "center"}}
        renderInput={params => (
          <TextField {...params} label="Teams" variant="outlined" fullWidth />
        )
      }
      />
      </form>
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

export default App
