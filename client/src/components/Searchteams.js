import React, { useEffect, useState } from 'react'
import Schedule from './Schedule'
import Loading from './Loading'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import './Searchteams.css'

const getFootballTeams = () => {
  console.log('getFootballTeams')
  // setLoading(true)
  fetch(`http://localhost:5000/allsvenskan/teams`)
    .then(res => res.json())
    .then(body => {
      console.log(body)
      return body})
  // setLoading(false)
}

function Searchteams() {
  const [teams, setAllTeams] = useState([])
  // const [teamNames, setTeamNames] = useState([])
  const teamNames = getFootballTeams()
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('Hammarby')
  const [loading, setLoading] = useState(false)

  const getFootballStats = async () => {
    setLoading(true)
    console.log('getFootballStats')
    const res = await fetch(`http://localhost:5000/allsvenskan/${search}`)
    const data = await res.json()
    // console.log(data)

    setAllTeams(data)
    setLoading(false)
  }

  

  const updateSearchAutoComplete = e => {
    // e.preventDefault()
    console.log('updateSearch', e.target)
    setSearch(e.target.textContent)
    // setQuery(search)
  }

  const updateSearch = e => {
    // e.preventDefault()
    console.log('updateSearch', e.target)
    setSearch(e.target.value)
    // setQuery(search)
  }

  // const getSearch = e => {
  //   e.preventDefault()
  //   console.log('getSearch', search)
  //   setQuery(search)
  //   setSearch('')
  // }
  // useEffect(() => {
  //   console.log('useEffect')
  //   const func = async () => {
  //     await getFootballStats()
  //     // await getFootballTeams()
  //   }
  //   func()
  // }, [query])
  
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
        <div className="search-bar">
        <form onSubmit={getFootballStats} className="search-form">
      <Autocomplete className="autocomplete"
        autoHightlight
        autoComplete={true}
        options={teamData}
        onChange={updateSearchAutoComplete}
        // getOptionLabel={option => option}
        
        
        style={{ width: 300, justifyContent: "center"}}
        renderInput={(params) => (
        <TextField {...params} value={search} onChange={updateSearch} label="Teams" variant="outlined"  fullWidth />
        )
      }
      />
      </form>
      <Button className="search-button" variant="outlined" onClick={getFootballStats}>
            Search
          </Button>
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

export default Searchteams