import { ThemeProvider } from '@mui/material/styles'
import {
  RouterProvider
} from 'react-router-dom'
import { router } from './routes'
import { theme } from './theme'

const App = () => {
  return (
      <ThemeProvider theme={theme}>
        <RouterProvider router={ router } />
      </ThemeProvider>
  )
}

export default App
