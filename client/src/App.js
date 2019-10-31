import React from 'react';
import './App.css';
// import Schedule from './components/Schedule'
import Allsvenskan from './components/Allsvenskan'
import Livescore from './components/Livescore'
import Header from './components/Header'
import Smspecial from './components/Smspecial'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          < Header />
          <Switch>
            <Route path='/Allsvenskan' component={Allsvenskan}/>
            <Route path='/SM-guld' component={Smspecial}/>
            <Route path='/livescore' component={Livescore}/>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;

