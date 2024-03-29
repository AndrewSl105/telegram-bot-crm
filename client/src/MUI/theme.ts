import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Public Sans, sans-serif'
    ].join(',')
  },
  palette: {
    primary: {
      main: '#10a37f'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 570,
      md: 900,
      lg: 1336,
      xl: 1600
    }
  }
})
