import React, { useContext, useEffect, useState } from 'react'
import { Container, ButtonBase } from '@mui/material'
import { SvgLayout } from './SvgLayout'
import { SvgButton } from './SvgButton'
import { AppContext } from '../store/appContext'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Typography, Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import { fetchPerson, fetchUrl, fetchArray } from '../api'
import Poster1 from '../images/poster1.jpg'
import Poster2 from '../images/poster2.jpg'
import Poster3 from '../images/poster3.jpg'
import Poster4 from '../images/poster4.jpg'
import Poster5 from '../images/poster5.jpg'
import Poster6 from '../images/poster6.jpg'
import useMediaQuery from '@mui/material/useMediaQuery'
import PosterModal from './PosterModal'

const styles = {
  posterBox: {
    maxHeight: '76vh',
    overflowY: 'auto',
    paddingLeft: 2
  },
  mobilePosterBox: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'scroll',
    width: '100%'
  }
}

export default function Person() {
  const { person, setPerson } = useContext(AppContext)
  const [homeworld, setHomeworld] = useState('')
  const [ships, setShips] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [chosenPoster, setChosenPoster] = useState(Poster6)
  const { id } = useParams()
  const tablet = useMediaQuery('(max-width:750px)')
  const mobile = useMediaQuery('(max-width:600px)')

  const navigate = useNavigate()

  useEffect(() => {
    if (!person) getPerson()
  }, [])

  useEffect(() => {
    if (person) {
      getHomeworld()
      getStarships()
      getVehicles()
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
    if (person?.starships?.length) {
      let data = await fetchArray(person.starships)
      setShips(data)
    }
  }

  const getVehicles = async () => {
    if (person?.vehicles?.length) {
      let data = await fetchArray(person.vehicles)
      setVehicles(data)
    }
  }

  const renderPosters = () => {
    if (person?.films?.length) {
      return person.films.map((film) => {
        let x = film.split('/')
        let index = x[x.length - 2]
        return (
          <Box sx={{ padding: 1 }}>
            <ButtonBase onClick={handleOpenModal}>
              <img src={findPoster(index)} alt="" width={180} height={250} id={index} />
            </ButtonBase>
          </Box>
        )
      })
    }
  }

  const findPoster = (i) => {
    switch (i) {
      case '1':
        return Poster1
      case '2':
        return Poster2
      case '3':
        return Poster3
      case '4':
        return Poster4
      case '5':
        return Poster5
      case '6':
        return Poster6
    }
  }

  const renderArray = (array) => (array.length ? array.map((x) => ` ${x}`) : 'none')

  const handleOpenModal = (e) => {
    setChosenPoster(findPoster(e.target.id))
    setOpenModal(true)
  }
  const handleCloseModal = () => setOpenModal(false)

  return (
    <Container
      maxWidth="lg"
      sx={{
        flexDirection: [mobile ? 'column' : 'row'],
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 6
      }}>
      <Box
        sx={{
          flexDirection: [tablet ? 'column' : 'row'],
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}>
        <IconButton
          sx={{ width: '90px', height: '90px', marginRight: 2, marginTop: [tablet ? -5 : 0] }}
          size="small"
          edge="end"
          onClick={handleReturn}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 1
            }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <ArrowBackIosNewIcon fontSize="large" />
              <ArrowBackIosNewIcon fontSize="large" sx={{ marginLeft: -2 }} />
              <ArrowBackIosNewIcon fontSize="large" sx={{ marginLeft: -2 }} />
            </Box>
            <Typography variant="body2">BACK</Typography>
          </Box>
        </IconButton>
        <Box sx={{ alignSelf: { xs: 'center', sm: 'flex-start' } }}>
          <SvgLayout>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 2
              }}>
              <Typography variant="h4">{person?.name}</Typography>
              <Typography variant="body1">
                {`Homeworld: ${homeworld}`}
                <br />
                {`Height: ${person?.height}`}
                <br />
                {`Mass: ${person?.mass}`}
                <br />
                {`Hair Color: ${person?.hair_color}`}
                <br />
                {`Eye Color: ${person?.eye_color}`}
                <br />
                {`Birth Year: ${person?.birth_year}`}
                <br />
                {`Gender: ${person?.gender}`}
                <br />
                {`Films: ${person?.films?.length}`}
                <br />
                {`Starships: ${renderArray(ships)}`}
                <br />
                {`Vehicles: ${renderArray(vehicles)}`}
              </Typography>
            </Box>
          </SvgLayout>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: { xs: 2, sm: 0 }
        }}>
        FILM POSTERS
        <Box sx={[mobile ? styles.mobilePosterBox : styles.posterBox]}>{renderPosters()}</Box>
      </Box>
      <PosterModal open={openModal} handleClose={handleCloseModal} poster={chosenPoster} />
    </Container>
  )
}
