import React, { useEffect, useState } from 'react'
import Schedule from './components/Schedule'
import './App.css';
import { statSync } from 'fs';

function App() {

  const [state, setstate] = useState([])

  useEffect(() => {
    getFootballStats()
  }, [])

  const getFootballStats = async () => {
    const res = await fetch('http://localhost:5000/allsvenskan')
    const data = await res.json()
    console.log(data)
    
    setstate(data)
     
  }
  return (
    <div className="App">
      <header className="App-header">
        {state.map(stats => (
          <Schedule 
          home={stats.homeName}
          away={stats.awayName}
          homeScore={stats.homeScore}
          awayScore={stats.awayScore}
          location={stats.location}
          round={stats.location}
          />
        ))}
        
      </header>
    </div>
  );
}

export default App;
