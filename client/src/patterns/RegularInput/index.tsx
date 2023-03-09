import { TextField } from '@mui/material'
import * as React from 'react'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { type RegularInputProps } from '../../interfaces/props'

const RegularInput = (props: RegularInputProps): ReactJSXElement => {
  const { action, rows } = props
  return (
        <TextField
            onChange={action}
            margin="dense"
            fullWidth
            id="outlined-basic"
            variant="outlined"
            minRows={rows}
            maxRows={rows}
            {...props}
        />
  )
}

export default RegularInput
