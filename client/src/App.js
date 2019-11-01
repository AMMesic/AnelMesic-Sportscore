import React from 'react';
import './App.css';
import Allsvenskan from './components/Allsvenskan';
import Header from './components/Header';
import Smspecial from './components/Smspecial';
import Livescore from './components/Livescore';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header />
          <Switch>
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
