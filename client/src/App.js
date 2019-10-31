import React from 'react';
import './App.css';
// import Schedule from './components/Schedule'
import Searchteams from './components/Searchteams'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          < Header />
          <Switch>
            <Route path='/search' component={Searchteams}/>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;

