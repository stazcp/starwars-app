import React from 'react'
import Display from './Display'
import darthVader from '../images/darthVader.jpg'
import starWars from '../images/starWars.jpg'
import useWindowSize from '../hooks/windowSize'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'

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
      <div
        style={{
          paddingBottom: 100,
          paddingTop: 50,
          backgroundImage: `url(${starWars})`,
          backgroundColor: `black`,
          backgroundSize: 'cover',
          backgroundRepear: 'repeat',
          height: size.height
        }}>
        <Display />
      </div>
    </ThemeProvider>
  )
}
