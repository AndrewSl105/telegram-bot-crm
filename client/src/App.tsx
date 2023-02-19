import { ThemeProvider } from '@mui/material/styles'
import {
  RouterProvider
} from 'react-router-dom'
import { router } from './routes'
import { theme } from './theme'
import { Provider } from 'react-redux'
import * as React from 'react'
import { store } from './store'
import DialogRoot from './DialogRoot'

const App = (): React.ReactElement => {
  return (
      <ThemeProvider theme={theme}>
          <Provider store={store}>
              <RouterProvider router={ router } />
              <DialogRoot />
          </Provider>
      </ThemeProvider>
  )
}

export default App
