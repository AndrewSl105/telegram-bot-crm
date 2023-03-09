import { Box, TextField } from '@mui/material'
import React, { type ReactElement } from 'react'
import { type SxProps, type Theme } from '@mui/material/styles'

const styles = {
  marginBottom: '1rem',
  '.MuiFormControl-root': {
    width: '100%'
  }
}

interface AuthInputProps {
  sx?: SxProps<Theme>
  customStyle?: object
  label: string
  type: string
}

const AuthInput = (props: AuthInputProps): ReactElement => {
  console.log(props)
  return (
        <Box sx={{
          ...styles,
          ...props.customStyle
        }}>
            <TextField
                label={props.label}
                type={props.type}
            />
        </Box>
  )
}

export default AuthInput
