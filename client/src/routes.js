import { createBrowserRouter } from 'react-router-dom'
import LogIn from './pages/LogIn'
import DashBoard from './pages/Dashboard'
import AdminTab from './features/tabs/AdminTab'
import KanbanTab from './features/tabs/KanbanTab'
import MyCardsTab from './features/tabs/MyCardsTab'
import MyTeamTab from './features/tabs/MyTeamTab'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashBoard />,
    children: [
      {
        path: '/',
        element: <KanbanTab />
      },
      {
        path: 'team',
        element: <MyTeamTab />
      },
      {
        path: 'my-cards',
        element: <MyCardsTab />
      },
      {
        path: 'admin-board',
        element: <AdminTab />
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
