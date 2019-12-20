import React from 'react';
import './App.css';
import Allsvenskan from './Routes/Allsvenskan';
import Header from './Routes/Header';
import Smspecial from './Routes/Smspecial';
import Livescore from './Routes/Livescore';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EngPremierLeague from './Routes/EngPremierLeague';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header />
          <Switch>
            <Route path='/EnglishPremierLeague' component={EngPremierLeague} />
            <Route path="/Allsvenskan" component={Allsvenskan} />
            <Route path="/SM-guld" component={Smspecial} />
            <Route path="/Livescore" component={Livescore} /> 
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
