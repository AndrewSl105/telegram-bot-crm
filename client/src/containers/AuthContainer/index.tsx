import { Box } from '@mui/material'
import React, { type ReactElement } from 'react'
import { type SxProps, type Theme } from '@mui/material/styles'

const styles = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  height: '100vh',
  alignItems: 'center',
  flexFlow: 'column'
}

interface AuthContainerProps {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

const AuthContainer = (props: AuthContainerProps): ReactElement => {
  return (
        <Box sx={styles}>
            { props.children }
        </Box>
  )
}

export default AuthContainer
