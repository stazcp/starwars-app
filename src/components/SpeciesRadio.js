import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Box } from '@mui/material'

export default function SpeciesRadio({ species, handleChange, value }) {
  return (
    <Box sx={{ marginBottom: 1, overflowX: 'auto' }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Species</FormLabel>
        <RadioGroup
          aria-label="Species"
          // defaultValue={species[0]}
          name="radio-buttons-group"
          value={value}
          onChange={handleChange}>
          <Box
            sx={{
              height: { xs: '10vh', sm: '100%' },
              maxWidth: { xs: '100%', sm: '200px' },
              overflowX: 'auto',
              flexDirection: { xs: 'row', sm: 'column' },
              display: 'flex'
            }}>
            {species.map((specie) => (
              <Box sx={{ minWidth: 132 }} key={specie}>
                <FormControlLabel value={specie} control={<Radio />} label={specie} />
              </Box>
            ))}
          </Box>
        </RadioGroup>
      </FormControl>
    </Box>
  )
}
