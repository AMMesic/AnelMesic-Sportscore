import React, { useEffect, useState } from 'react'
import './App.css';

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
        
      </header>
    </div>
  );
}

export default App;
