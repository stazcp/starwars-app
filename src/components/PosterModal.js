import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '600px',
  width: '400px',
  boxShadow: 24,
  p: 4
}

export default function BasicModal({ open, handleClose, poster }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>{<img src={poster} alt="" height="600px" width="400px" />}</Box>
    </Modal>
  )
}
