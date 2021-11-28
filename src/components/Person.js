import React, { useContext, useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { SvgLayout } from './SvgLayout'
import { AppContext } from '../store/appContext'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Typography, Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import { fetchPerson, fetchUrl } from '../api'

export default function Person() {
  const { person, setPerson } = useContext(AppContext)
  const [homeworld, setHomeworld] = useState('')
  const [ships, setShips] = useState([])
  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (!person) getPerson()
  }, [])

  useEffect(() => {
    if (person) {
      getHomeworld()
      getStarships()
    }
  }, [person])

  const getPerson = async () => {
    const result = await fetchPerson(id)
    if (result) setPerson(result)
  }

  const handleReturn = () => {
    navigate(`/`, { replace: true })
  }

  const getHomeworld = async () => {
    const result = await fetchUrl(person.homeworld)
    if (result) setHomeworld(result.name)
  }

  const getStarships = async () => {
    if (person.starships.length) {
      let starships = await Promise.all(
        person.starships.map(async (ship) => {
          let result = await fetchUrl(ship)
          return result?.name
        })
      )
      setShips(starships)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ flexDirection: 'row', display: 'flex' }}>
      <IconButton size="small" edge="end" onClick={handleReturn}>
        <Box sx={{ display: 'flex', flexDirection: 'column', paddingRight: 10, paddingTop: 10 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <ArrowBackIosNewIcon fontSize="large" />
            <ArrowBackIosNewIcon fontSize="large" sx={{ marginLeft: -2 }} />
            <ArrowBackIosNewIcon fontSize="large" sx={{ marginLeft: -2 }} />
          </Box>
          <Typography variant="h6">RETURN</Typography>
        </Box>
      </IconButton>

      <SvgLayout>
        <div style={{ display: 'flex', flexDirection: 'column', width: 550 }}>
          <Typography variant="h4">{person?.name}</Typography>
          <Typography variant="body1">{`Homeworld: ${homeworld}`}</Typography>
          <Typography variant="body1">{`Height: ${person?.height}`}</Typography>
          <Typography variant="body1">{`Mass: ${person?.mass}`}</Typography>
          <Typography variant="body1">{`Hair Color: ${person?.hair_color}`}</Typography>
          <Typography variant="body1">{`Eye Color: ${person?.eye_color}`}</Typography>
          <Typography variant="body1">{`Birth Year: ${person?.birth_year}`}</Typography>
          <Typography variant="body1">{`Gender: ${person?.gender}`}</Typography>
          <Typography variant="body1">{`Films: ${person?.films?.length}`}</Typography>
          <Typography variant="body1">{`Starships: ${
            ships.length ? ships.map((ship) => ` ${ship}`) : 'none'
          }`}</Typography>
          <Typography variant="body1">{`Vehicles: ${person?.vehicles?.length}`}</Typography>
        </div>
      </SvgLayout>
    </Container>
  )
}

// create context to pass data, dynamic routing here
// don't forget search function and sounds!
