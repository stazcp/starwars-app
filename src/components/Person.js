import React, { useContext } from 'react'
import { Container } from '@mui/material'
import { SvgLayout } from './SvgLayout'
import { AppContext } from '../store/appContext'

export default function Person() {
  const { person } = useContext(AppContext)
  return (
    <Container maxWidth="md">
      <SvgLayout>{person.name}</SvgLayout>
    </Container>
  )
}

// create context to pass data, dynamic routing here
// don't forget search function and sounds!
