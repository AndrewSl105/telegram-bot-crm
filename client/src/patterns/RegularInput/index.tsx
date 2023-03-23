import { TextField } from '@mui/material'
import * as React from 'react'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'

const RegularInput = (props: any): ReactJSXElement => {
  const { action, rows = 0 } = props

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
