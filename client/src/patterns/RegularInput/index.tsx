import { TextField } from '@mui/material'
import * as React from 'react'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'

interface RegularInputProps {
  action: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  label: string
  name: string
  value: string | number
  autoFocus: boolean
  multiline: boolean
  rows: number
}

const RegularInput = (props: RegularInputProps): ReactJSXElement => {
  const { action, label, name, value, autoFocus, multiline, rows } = props
  return (
        <TextField
            autoFocus={autoFocus}
            onChange={action}
            margin="dense"
            fullWidth
            id="outlined-basic"
            label={label}
            variant="outlined"
            name={name}
            value={value}
            multiline={multiline}
            minRows={rows}
            maxRows={rows}
            rows={rows}
        />
  )
}

export default RegularInput
