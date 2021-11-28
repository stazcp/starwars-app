import React, { useEffect, useState, useContext } from 'react'
import { fetchData, fetchPage, fetchUrl } from '../api'
import { SvgButton } from './SvgButton'
import { Grid, Box, Container, Pagination } from '@mui/material'
import SpeciesRadio from './SpeciesRadio'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../store/appContext'

export default function Home() {
  const [people, setPeople] = useState()
  const [species, setSpecies] = useState([])
  const [currentSpecies, setCurrentSpecies] = useState()
  const [loadingData, setLoadingData] = useState(true) // loading species list from api
  const [displayedSpecies, setDisplayedSpecies] = useState()
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  const { setPerson } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (!loadingData && !people) getPeople()
  }, [loadingData])

  useEffect(() => {
    if (people) sortPeople()
  }, [people])

  // pretty much sets default value for displayed species of people once data is ready
  useEffect(() => {
    if (currentSpecies) resetDisplaySpecies()
  }, [currentSpecies])

  const resetDisplaySpecies = () => {
    setDisplayedSpecies(Object.keys(currentSpecies)[0])
  }

  const init = async () => {
    if (!species.length) getAllSpecies()
  }

  const getPeople = async () => {
    let data = await fetchData('people')
    countPages(data.count, data.results.length)
    setPeople(data)
  }

  const getPage = async (page) => {
    const data = await fetchPage(page)
    if (data) {
      setPeople(data)
    } else {
      console.error('Page does not exist!')
    }
  }

  const countPages = (totalPeople, peoplePerPage) =>
    setPageCount(Math.round(totalPeople / peoplePerPage))

  // getting all pages for species in order to sort people with
  const getAllSpecies = async () => {
    let data = await fetchData('species')
    addSpecies(data)
    while (data.next) {
      data = await fetchUrl(data.next)
      addSpecies(data)
    }
    setLoadingData(false)
  }

  const addSpecies = (data) => {
    let speciesNames = data.results.map(({ name }) => name)
    setSpecies((species) => [...species, ...speciesNames])
  }

  const sortPeople = () => {
    const sortedPeople = {}
    if (people) {
      people.results.map((person) => {
        let specie = findSpecies(person)
        if (specie in sortedPeople) {
          sortedPeople[specie].push(person)
        } else {
          sortedPeople[specie] = [person]
        }
      })
      setCurrentSpecies(sortedPeople)
    }
  }

  const findSpecies = (person) => {
    if (!person.species.length) {
      return 'Human'
    }
    let str = person.species[0]
    let parts = str.split('/')
    let speciesIndex = parts[parts.length - 2]
    return species[parseInt(speciesIndex)]
  }

  const handleSpecieChange = (event) => {
    setDisplayedSpecies(event.target.value)
  }

  const handlePageChange = (event, value) => {
    getPage(value)
    setPage(value)
    setDisplayedSpecies()
  }

  // click navigates us to new page and sets the person context
  const handleClick = (e) => {
    let name = e.target.parentNode.parentNode.id
    let result = searchPearson(name)
    setPerson(result)
    name = name.split(' ').join('-')
    navigate(`/person/${name}`, { replace: true })
  }

  const searchPearson = (name) => {
    let result
    people.results.map((person) => {
      if (person.name == name) {
        result = person
      }
    })
    return result
  }

  const renderPeople = () => {
    if (displayedSpecies && currentSpecies) {
      return (
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          {currentSpecies[displayedSpecies].map((person) => (
            <Grid item key={person.name}>
              <div id={person.name} onClick={(e) => handleClick(e)}>
                <SvgButton>{person.name}</SvgButton>
              </div>
            </Grid>
          ))}
        </Grid>
      )
    }
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexDirection: 'column', display: 'flex' }}>
        <Box sx={{ flexDirection: 'row', display: 'flex' }}>
          {displayedSpecies ? (
            <SpeciesRadio
              species={Object.keys(currentSpecies)}
              handleChange={handleSpecieChange}
              value={displayedSpecies}
            />
          ) : (
            `loading species...`
          )}
          <Container maxWidth="md">
            <Box height={500}>{renderPeople()}</Box>
          </Container>
        </Box>
        <Pagination
          count={pageCount}
          variant="outlined"
          color="primary"
          onChange={handlePageChange}
          sx={{ position: 'absolute', bottom: 15, left: '50%', transform: `translate(-50%, -50%)` }}
          // sx={{ justifyContent: 'center', display: 'flex', paddingTop: 10 }}
        />
      </Box>
    </Container>
  )
}
