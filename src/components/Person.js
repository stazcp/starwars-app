import React, { useContext } from 'react'
import { Container } from '@mui/material'
import { SvgLayout } from './SvgLayout'
import { AppContext } from '../store/appContext'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Typography, Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Person() {
  const { person } = useContext(AppContext)
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(`/`, { replace: true })
  }

  return (
    <Container maxWidth="lg" sx={{ flexDirection: 'row', display: 'flex' }}>
      <IconButton size="small" edge="end" onClick={handleBack}>
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>{person?.birth_year}</div>
          <div>{person?.name}</div>
        </div>
      </SvgLayout>
    </Container>
  )
}

// create context to pass data, dynamic routing here
// don't forget search function and sounds!
