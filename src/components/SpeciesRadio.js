import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function SpeciesRadio({ species, handleChange, value }) {
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Species</FormLabel>
        <RadioGroup
          aria-label="Species"
          // defaultValue={species[0]}
          name="radio-buttons-group"
          value={value}
          onChange={handleChange}>
          {species.map((specie) => (
            <FormControlLabel value={specie} control={<Radio />} label={specie} key={specie} />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  )
}
