const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const APP_KEY = require('../key').api_key;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'client')));

app.get('/allsvenskan', async (req, res) => {
  const response = await fetch(
    `http://api.isportsapi.com/sport/football/schedule?api_key=${APP_KEY}&leagueId=1628`
  );
  const data = await response.json();
  res.send(data.data);
});

app.get('/allsvenskan/teams', async (req, res) => {
  const response = await fetch(
    `http://api.isportsapi.com/sport/football/schedule?api_key=${APP_KEY}&leagueId=1628`
  );
  const data = await response.json();
  const teams = data.data
    .map(team => team.homeName)
    .reduce((acc, curr) => {
      if (acc.indexOf(curr) === -1) {
        acc.push(curr);
      }
      return acc;
    }, [])
    .sort();
  res.send(teams);
});

app.get('/allsvenskan/round', async (req, res) => {
  const response = await fetch(
    `http://api.isportsapi.com/sport/football/schedule?api_key=${APP_KEY}&leagueId=1628`
  );
  const data = await response.json();
  const teams = data.data.filter(team => team.round === '30');
  res.send(teams);
});

app.get('/allsvenskan/:team', async (req, res) => {
  const response = await fetch(
    `http://api.isportsapi.com/sport/football/schedule?api_key=${APP_KEY}&leagueId=1628`
  );
  const data = await response.json();
  const teams = data.data.filter(
    team =>
      team.homeName === req.params.team || team.awayName === req.params.team
  );
  res.send(teams);
});

app.get('/livescore', async (req, res) => {
  const resp = await fetch(
    `http://api.isportsapi.com/sport/football/livescores?api_key=${APP_KEY}`
  );
  const data = await resp.json();
  res.json(data.data);
});

app.get('/livescore/leaguenames', async (req, res) => {
  const response = await fetch(
    `http://api.isportsapi.com/sport/football/livescores?api_key=${APP_KEY}`
  );
  const data = await response.json();
  const teams = data.data
    .map(team => team.leagueName)
    .reduce((acc, curr) => {
      if (acc.indexOf(curr) === -1) {
        acc.push(curr);
      }
      return acc;
    }, [])
    .sort();
  res.send(teams);
});

app.get('/livescore/:leaguename', async (req, res) => {
  const response = await fetch(
    `http://api.isportsapi.com/sport/football/livescores?api_key=${APP_KEY}`
  );
  const data = await response.json();
  const teams = data.data.filter(
    team => team.leagueName === req.params.leaguename
  );
  res.send(teams);
});

app.listen(PORT, () => console.log(`App listen on port ${PORT}`));
