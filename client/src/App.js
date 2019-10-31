import React, { useEffect, useState } from 'react'
import Schedule from './components/Schedule'
import './App.css'

function App() {
  const [state, setstate] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('Hammarby')


  useEffect(() => {
    getFootballStats()
  }, [query])

  const getFootballStats = async () => {
    const res = await fetch(`http://localhost:5000/allsvenskan/${query}`)
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
