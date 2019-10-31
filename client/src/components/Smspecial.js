import React, { useEffect, useState } from 'react'
import Sm from '../Routes/Sm'
import Loading from './Loading'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import './Allsvenskan.css'


const Smspecial = () => {
  const [teams, setAllTeams] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const getSm = async () => {
    setLoading(true)
    const res = await fetch(`http://localhost:5000/allsvenskan/round`)
    const data = await res.json()

    setAllTeams(data)
    setLoading(false)
  }

  const updateSearchAutoComplete = e => {
    console.log('updateSearch', e.target)
    setSearch(e.target.textContent)
  }

  const updateSearch = e => {
    console.log('updateSearch', e.target)
    setSearch(e.target.value)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="search-bar">
        <form onSubmit={getSm} className="search-form">
      </form>
      <div className="button">
      <Button className="search-button" variant="outlined" onClick={getSm} style={{ height: 80}}>
            GO Bajen!
          </Button>
          </div>
      </div>
      <div className="football-stats">
      {teams.map(stats => (
        <Sm
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

export default Smspecial