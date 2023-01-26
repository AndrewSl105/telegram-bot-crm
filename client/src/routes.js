import { createBrowserRouter, Link } from 'react-router-dom'
import LogIn from './pages/LogIn'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
            <div>
                <h1>Hello World</h1>
                <Link to="about">About Us</Link>
                <br />
                <Link to="login">Log In</Link>
            </div>
    )
  },
  {
    path: 'about',
    element: <div>About</div>
  },
  {
    path: 'login',
    element: <LogIn />
  }
])
