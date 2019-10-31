import React, { useEffect, useState } from 'react'
import LivescoreSchedule from '../Routes/LivescoreShedule'
import Loading from './Loading'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


const Livescore = () => {
  
    const [teams, setAllTeams] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
  
    const getLivescore = async () => {
      setLoading(true)
      const res = await fetch(`http://localhost:5000/livescore/${search}`)
      const data = await res.json()
  
      setAllTeams(data)
      setLoading(false)
    }
  
    const updateSearchAutoComplete = e => {
      setSearch(e.target.textContent)
    }
  
    const updateSearch = e => {
      setSearch(e.target.value)
    }
  
  return (

    <div className="App">
      <header className="App-header">
        <div className="search-bar">
        <form onSubmit={getLivescore} className="search-form">
      <Autocomplete className="autocomplete"
        autoHightlight
        autoComplete={true}
        options={livescoreData}
        onChange={updateSearchAutoComplete}
        
        
        style={{ width: "auto", justifyContent: "center"}}
        renderInput={(params) => (
        <TextField {...params} value={search} onChange={updateSearch} label="Teams" variant="outlined"  fullWidth />
        )
      }
      />
      </form>
      <Button className="search-button" variant="outlined" onClick={getLivescore}>
            Search
          </Button>
      </div>
      

      <div className="football-stats">
      {teams.map(stats => (
        <LivescoreSchedule
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

const livescoreData = [
  "AFC U-19 Women’s Championship",
  "Argentina Reserve League",
  "Argentine Division 1",
  "Argentine Torneo A",
  "Austria Landesliga",
  "Austrian 3.Liga",
  "Azerbaijan Division 2",
  "BRA D4",
  "Belgian Pro League",
  "Belgian U21",
  "Bhutan Thimphu League",
  "Bolivia Primera Division",
  "Bolivia Regional League",
  "Brazil Copa Gaucho",
  "Brazil Santa Catarina Cup",
  "Brazil Serie A",
  "Brazil Serie B",
  "Brazil Serie D",
  "Brazil U20 Cup",
  "Brazil Youth",
  "Bulgaria B PFG",
  "Bulgaria Premier League",
  "CAF Super Cup",
  "CONCACAF League",
  "Cameroon Elite One",
  "Cameroon Elite two",
  "Chile Tercera",
  "Colombia Copa Premier",
  "Croatia 2.HNL",
  "Croatia 3.Division",
  "Croatia U19 League",
  "Denmark Cup",
  "Ecuador Cup",
  "Ecuador Reserve League",
  "Egypt Division 2",
  "Estonia Esi Liiga",
  "FIFA U-17 World Cup",
  "FYR Macedonia Cup",
  "Germany Landespokal",
  "Germany Oberliga NOFV",
  "Germany Regionalliga",
  "Gibraltar Premier Division",
  "Greece Cup",
  "Guatemala Liga Nacional Women",
  "Hungary U19 2nd Division",
  "Hungary Womens Division 1 League",
  "India Shillong Premier League",
  "Indian Super League",
  "Indonesia Liga 1 Women",
  "Indonesia Liga 3",
  "Indonesia Super League",
  "International Club Friendly",
  "Iran U23 Liga",
  "Ireland Leinster Senior League",
  "Israel Cup",
  "Italian Serie A",
  "J-League Division 3",
  "KNVB Cup",
  "KSCUP",
  "Kazakhstan Division 2",
  "Kuwaiti Premier League",
  "Lebanese Premier League",
  "Liga Nacional de Guatemala",
  "Lithuania - 1.Division",
  "Mexico Youth U20",
  "Nicaragua Apertura league",
  "Nicaragua Cup",
  "Norway NM Cupen",
  "Norway Youth Cup",
  "Palestine Football League",
  "Panama Liga Nacional de Ascenso",
  "Paraguay reserve team league",
  "Persian Gulf Pro League",
  "Peru Cup",
  "Poland Cup",
  "Poland Division 2",
  "Poland Division 4",
  "Poland Mloda Ekstraklasa",
  "Poland Youth League",
  "Portugal Primera Liga",
  "Portugal Segunda Liga",
  "Primera Division de Chile",
  "Primera Division de Mexico",
  "Primera Division de Paraguay",
  "Qatar League",
  "Romania Cup",
  "Russia Cup",
  "SVK U19 A",
  "Saudi Professional League",
  "Slovakia 3.Liga",
  "Slovenia U19",
  "Spain Youth League",
  "Spanish Bizkaia-Tercera Division",
  "Spanish La Liga",
  "Switzerland Cup",
  "Tanzania Ligue 1",
  "Turkey Cup",
  "UAE Pro-League",
  "UAFA Club Cup",
  "UEFA Women",
  "USA Major League Soccer",
  "USA Women Premier League",
  "Uganda Division 2",
  "Ukraine U19 Liga",
  "United Arab Emirates U19",
  "Uruguay Reserve League",
  "Uzbek League",
  "Uzbekistan Second League",
  "Venezuela U20 League",
  "Vietnamese National Cup",
  "WK League",
  "Zimbabwe Premier"
]

export default Livescore