import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Public Sans, sans-serif'
    ].join(',')
  },
  palette: {
    background: {
      white: 'rgb(255, 255, 255)'
    },
    boxShadow: {
      card: 'rgba(145, 158, 171, 0.16) 0px 20px 40px -4px'
    }
  }
})
