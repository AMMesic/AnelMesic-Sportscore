import React, { useEffect, useState } from 'react'
import Schedule from './components/Schedule'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import './App.css'

function App() {
  const [state, setstate] = useState([])
  const [search, setSearch] = useState('')
  // const [showMenu] = useState()
  const [query, setQuery] = useState('Hammarby')

  useEffect(() => {
    getFootballTeams()
    getFootballStats()
  }, [])

  const getFootballStats = async () => {
    const res = await fetch(`http://localhost:5000/allsvenskan/${query}`)
    const data = await res.json()
    // console.log(data)

    // setstate(data)
  }

  const getFootballTeams = async () => {
    const res = await fetch(`http://localhost:5000/allsvenskan/teams`)
    const data = await res.json()
    console.log(data)

    setstate(data)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <form onClick={getSearch} className="search-form">
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={updateSearch}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form> */}
         <Autocomplete
      options={getFootballTeams}
      getOptionLabel={option => option}
      style={{ width: 300 }}
      renderInput={params => (
        <TextField {...params} label="Combo box" variant="outlined" fullWidth />
      )}
    />

        {state.map(stats => (
          <Schedule
            home={stats.homeName}
            away={stats.awayName}
            homeScore={stats.homeScore}
            awayScore={stats.awayScore}
            location={stats.location}
            round={stats.round}
          />
        ))}
      </header>
    </div>
  )
}

export default App

const teams = [{title: 'Hammarby'}]

 {/* {
          this.state.showMenu
          ? (
            <div className="menu">
            <button> Menu item 1 </button>
            <button> Menu item 2 </button>
            <button> Menu item 3 </button>
          </div>
          )
          : (
            null
          )

        } */}