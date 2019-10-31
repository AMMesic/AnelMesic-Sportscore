import React, { useEffect, useState } from 'react'
import Schedule from './Schedule'
import Loading from './Loading'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Livescore () => {

  const getLivescore = () => {
    console.log('getFootballTeams')
    // setLoading(true)
    fetch(`http://localhost:5000/livescore/teams`)
      .then(res => res.json())
      .then(body => {
        console.log(body)
        return body})
    // setLoading(false)
  }
  
  
    const [teams, setAllTeams] = useState([])
    // const [teamNames, setTeamNames] = useState([])
    const teamNames = getFootballTeams()
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('Hammarby')
    const [loading, setLoading] = useState(false)
  
    const getFootballStats = async () => {
      setLoading(true)
      console.log('getFootballStats')
      const res = await fetch(`http://localhost:5000/allsvenskan/${search}`)
      const data = await res.json()
      // console.log(data)
  
      setAllTeams(data)
      setLoading(false)
    }
  
    
  
    const updateSearchAutoComplete = e => {
      // e.preventDefault()
      console.log('updateSearch', e.target)
      setSearch(e.target.textContent)
      // setQuery(search)
    }
  
    const updateSearch = e => {
      // e.preventDefault()
      console.log('updateSearch', e.target)
      setSearch(e.target.value)
      // setQuery(search)
    }
  
    // const getSearch = e => {
    //   e.preventDefault()
    //   console.log('getSearch', search)
    //   setQuery(search)
    //   setSearch('')
    // }
    // useEffect(() => {
    //   console.log('useEffect')
    //   const func = async () => {
    //     await getFootballStats()
    //     // await getFootballTeams()
    //   }
    //   func()
    // }, [query])
  
  return (

  )
}