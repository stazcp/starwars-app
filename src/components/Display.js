import React, { useEffect, useState } from 'react'
import { fetchData, fetchPage, fetchUrl } from '../api'
import PersonButton from './PersonButton'
import { Grid, Box, Container, Pagination } from '@mui/material'
import SpeciesRadio from './SpeciesRadio'

export default function Display() {
  const [people, setPeople] = useState()
  const [species, setSpecies] = useState([])
  const [currentSpecies, setCurrentSpecies] = useState({})
  const [loadingData, setLoadingData] = useState(true) // loading species list from api
  const [displayedSpecies, setDisplayedSpecies] = useState()
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(1)

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
    if (Object.keys(currentSpecies).length > 0) {
      setDisplayedSpecies(Object.keys(currentSpecies)[0])
    }
  }, [currentSpecies])

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
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 8, height: '100%' }}>
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
            <Box>
              {displayedSpecies ? (
                <Grid container alignItems="center" justifyContent="center" spacing={0}>
                  {currentSpecies[displayedSpecies].map((person) => (
                    <Grid item key={person.name}>
                      <PersonButton name={person.name} />
                    </Grid>
                  ))}
                </Grid>
              ) : null}
            </Box>
          </Container>
        </Box>
        <Pagination
          count={pageCount}
          variant="outlined"
          color="primary"
          onChange={handlePageChange}
          sx={{ justifyContent: 'center', display: 'flex', paddingTop: 10 }}
        />
      </Box>
    </Container>
  )
}
