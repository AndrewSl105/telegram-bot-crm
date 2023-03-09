import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Public Sans, sans-serif'
    ].join(',')
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 900,
      lg: 1336,
      xl: 1600
    }
  }
})
