import { createBrowserRouter } from 'react-router-dom'
import AdminTab from './features/tabs/AdminTab'
import KanbanTab from './features/tabs/KanbanTab'
import MyCardsTab from './features/tabs/MyCardsTab'
import MyTeamTab from './features/tabs/MyTeamTab'
import SignUp from './features/auth/SignUp'
import LogIn from './features/auth/LogIn'
import PrivateRoutes from './guard/PrivateRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoutes />,
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
    path: 'sign-up',
    element: <SignUp />
  },
  {
    path: 'log-in',
    element: <LogIn />
  }
])
