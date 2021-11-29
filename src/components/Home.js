import React, { useEffect, useState, useContext } from 'react'
import { fetchData, fetchPage, fetchUrl, fetchSearch } from '../api'
import { SvgButton } from './SvgButton'
import { Grid, Box, Container, Pagination, Typography } from '@mui/material'
import SpeciesRadio from './SpeciesRadio'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../store/appContext'
import SearchAppBar from './SearchAppBar'
import useMediaQuery from '@mui/material/useMediaQuery'

export default function Home() {
  const [people, setPeople] = useState()
  const [species, setSpecies] = useState([])
  const [currentSpecies, setCurrentSpecies] = useState({})
  const [loadingData, setLoadingData] = useState(true) // loading species list from api
  const [displayedSpecies, setDisplayedSpecies] = useState(
    currentSpecies ? Object.keys(currentSpecies)[0] : null
  )
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  const { setPerson } = useContext(AppContext)
  const navigate = useNavigate()
  const smallLaptop = useMediaQuery('(max-width:1130px)')
  const md = useMediaQuery('(max-width:700px)')
  const md_height = useMediaQuery('(max-height:620px)')
  const desktop = useMediaQuery('(min-width:1130px)')
  const xxl = useMediaQuery('(min-width:1600px) and (min-height:800px)')
  // const sm = useMediaQuery('(max-width: )')

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
    let person = searchPearson(name)
    setPerson(person)
    let splitUrl = person.url.split('/')
    let id = splitUrl[splitUrl.length - 2]
    // name = name.split(' ').join('-')   // to display name in path
    navigate(`/people/${id}`, { replace: true })
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

  const handleSearch = async (e) => {
    let result = await fetchSearch(e.target.value)
    setPeople(result)
  }

  const buttonSize = () => {
    let elements = currentSpecies[displayedSpecies].length
    if (elements > 6 && smallLaptop) return 150
    // if (elements < 8) return 200
  }

  const setOverflow = () => {
    let elements = currentSpecies[displayedSpecies].length
    if (xxl) return 'visible'
    if (desktop && elements < 9) {
      return 'visible'
    } else if (desktop && elements > 8) {
      return 'auto'
    } else {
      return 'auto'
    }
  }

  const renderPeople = () => {
    if (displayedSpecies in currentSpecies) {
      try {
        if (currentSpecies[displayedSpecies].length) {
          return (
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={2}
              sx={{ maxHeight: '85vh', overflowY: [setOverflow()] }}>
              {currentSpecies[displayedSpecies].map((person) => (
                <Grid item key={person.name}>
                  <div id={person.name} onClick={(e) => handleClick(e)}>
                    <SvgButton newSize={buttonSize()}>
                      <Box sx={{ padding: 2 }}>
                        <Typography variant="body1"> {person.name}</Typography>
                      </Box>
                    </SvgButton>
                  </div>
                </Grid>
              ))}
            </Grid>
          )
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const paginationStyles = () => {
    if (md || md_height) {
      return { justifyContent: 'center', display: 'flex', marginBottom: 1, marginTop: 1 }
    }
    return { position: 'absolute', bottom: 15, left: '50%', transform: `translate(-50%, -50%)` }
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexDirection: 'column', display: 'flex' }}>
        <Box sx={{ flexDirection: 'row', display: 'flex' }}>
          <Box sx={{ flexDirection: 'column', display: 'flex' }}>
            <Box sx={{ width: 200, paddingBottom: 2, marginLeft: '-20px' }}>
              <SearchAppBar handleSearch={handleSearch} />
            </Box>
            {displayedSpecies ? (
              <SpeciesRadio
                species={Object.keys(currentSpecies)}
                handleChange={handleSpecieChange}
                value={displayedSpecies}
              />
            ) : (
              `loading species...`
            )}
          </Box>
          <Container maxWidth="md" sx={{ marginLeft: -1 }}>
            <Box sx={{}}>{renderPeople()}</Box>
          </Container>
        </Box>
        <Pagination
          count={pageCount}
          variant="outlined"
          color="primary"
          onChange={handlePageChange}
          sx={paginationStyles()}
        />
      </Box>
    </Container>
  )
}
