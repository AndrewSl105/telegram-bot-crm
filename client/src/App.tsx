import { ThemeProvider } from '@mui/material/styles'
import {
  RouterProvider
} from 'react-router-dom'
import { router } from './routes'
import { theme } from './theme'
import { Provider } from 'react-redux'
import * as React from 'react'
import { store } from './store'
import { SnackbarProvider } from 'notistack'
import DialogRoot from './DialogRoot'
import NotistackRoot from './NotistackRoot'

const App = (): React.ReactElement => {
  return (
      <ThemeProvider theme={theme}>
          <Provider store={store}>
              <SnackbarProvider anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }} maxSnack={3}>
                  <RouterProvider router={ router } />
                  <DialogRoot />
                  <NotistackRoot />
              </SnackbarProvider>
          </Provider>
      </ThemeProvider>
  )
}

export default App
