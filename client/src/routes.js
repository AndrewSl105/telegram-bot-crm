import { createBrowserRouter } from 'react-router-dom'
import LogIn from './pages/LogIn'
import DashBoard from './pages/Dashboard'
import MainBoard from './pages/Dashboard/DashBoardPages/MainBoard'
import Team from './pages/Dashboard/DashBoardPages/Team'
import MyTasks from './pages/Dashboard/DashBoardPages/MyTasks'
import AdminBoard from './pages/Dashboard/DashBoardPages/AdminBoard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashBoard />,
    children: [
      {
        path: '/',
        element: <MainBoard />
      },
      {
        path: 'team',
        element: <Team />
      },
      {
        path: 'my-tasks',
        element: <MyTasks />
      },
      {
        path: 'admin-board',
        element: <AdminBoard />
      }
    ]
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
