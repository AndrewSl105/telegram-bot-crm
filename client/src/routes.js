import { createBrowserRouter } from 'react-router-dom'
import LogIn from './pages/LogIn'
import DashBoard from './pages/Dashboard'
import Team from './pages/Dashboard/DashBoardPages/Team'
import MyTasks from './pages/Dashboard/DashBoardPages/MyTasks'
import KanbanBoard from './features/KanbanBoard'
import AdminBoard from './features/AdminBoard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashBoard />,
    children: [
      {
        path: '/',
        element: <KanbanBoard />
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
