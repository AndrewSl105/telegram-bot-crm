import {
  RouterProvider
} from 'react-router-dom'
import { router } from './routes'

const App = () => {
  console.log(router)
  return (
        <RouterProvider router={ router } />
  )
}

export default App
