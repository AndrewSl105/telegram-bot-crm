import { Box } from '@mui/material'
import React from 'react'
import { type SxProps, type Theme } from '@mui/material/styles'

const styles = {
  display: 'flex',
  flexFlow: 'column',
  maxWidth: '30vw',
  width: '100%'
}
interface AuthCardContainerProps {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

const AuthCardContainer = (props: AuthCardContainerProps) => {
  return (
        <Box sx={styles}>
            {props.children}
        </Box>
  )
}

export default AuthCardContainer