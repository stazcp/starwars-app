import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import useMediaQuery from '@mui/material/useMediaQuery'

const imgSizes = {
  lg: {
    width: '400px',
    height: '600px'
  },
  sm: {
    width: '320px',
    height: '480px'
  }
}

const style = {
  position: 'absolute',
  top: '45%',
  left: { xs: '42%', sm: '50%' },
  transform: 'translate(-50%, -50%)',
  height: { xs: imgSizes.sm.height, sm: imgSizes.lg.height },
  width: { xs: imgSizes.sm.width, sm: imgSizes.lg.width },
  boxShadow: 24,
  p: 4
}

export default function BasicModal({ open, handleClose, poster }) {
  const mobile = useMediaQuery('(max-width:600px)')

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        {
          <img
            src={poster}
            alt=""
            height={mobile ? imgSizes.sm.height : imgSizes.lg.height}
            width={mobile ? imgSizes.sm.width : imgSizes.lg.width}
          />
        }
      </Box>
    </Modal>
  )
}
