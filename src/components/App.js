import React from 'react'
import Home from './Home'
import darthVader from '../images/darthVader.jpg'
import starWars from '../images/starWars.jpg'
import useWindowSize from '../hooks/windowSize'
import CssBaseline from '@mui/material/CssBaseline'
import Person from './Person'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { Routes, Route } from 'react-router-dom'
import AppContextProvider from '../store/appContext'
import { Box } from '@mui/system'

const font = "'Press Start 2P', 'cursive'"

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    fontFamily: font,
    h4: {
      fontSize: '1.6rem',
      '@media (max-width:900px)': {
        fontSize: '1rem'
      },
      '@media (max-width:600px)': {
        fontSize: '0.9rem'
      }
    },
    body1: {
      fontSize: '0.8rem',
      '@media (max-width:900px)': {
        fontSize: '0.7rem'
      },
      '@media (max-width:600px)': {
        fontSize: '0.65rem'
      }
    }
  }
})

export default function App() {
  const size = useWindowSize()

  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <CssBaseline />
        <Box
          sx={{
            backgroundImage: `url(${starWars})`,
            backgroundColor: `black`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: size.height,
            minHeight: { xs: '100vh', sm: '500px' },
            minWidth: '330px'
          }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="people/:id" element={<Person />} />
          </Routes>
        </Box>
      </AppContextProvider>
    </ThemeProvider>
  )
}
