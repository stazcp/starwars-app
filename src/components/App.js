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

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
})

export default function App() {
  const size = useWindowSize()

  return (
    <ThemeProvider theme={darkTheme}>
      <AppContextProvider>
        <CssBaseline />
        <div
          style={{
            paddingBottom: 100,
            paddingTop: 50,
            backgroundImage: `url(${starWars})`,
            backgroundColor: `black`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: size.height,
            minHeight: 500
          }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="person/:name" element={<Person />} />
          </Routes>
        </div>
      </AppContextProvider>
    </ThemeProvider>
  )
}
