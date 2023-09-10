import { ThemeProvider } from '@mui/material/styles'
import {
  RouterProvider
} from 'react-router-dom'
import { router } from './routes'
import { theme } from './MUI/theme'
import { Provider } from 'react-redux'
import * as React from 'react'
import { store } from './redux/store'
import { SnackbarProvider } from 'notistack'
import DialogRoot from './features/dialogs/DialogRoot'
import NotistackRoot from './features/common/NotistackRoot'

const App = (): React.ReactElement => {
  return (
      <ThemeProvider theme={theme}>
          <Provider store={store}>
              <SnackbarProvider anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }} maxSnack={2}>
                  <RouterProvider router={ router } />
                  <DialogRoot />
                  <NotistackRoot />
              </SnackbarProvider>
          </Provider>
      </ThemeProvider>
  )
}

export default App
