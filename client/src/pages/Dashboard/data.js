import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import Diversity2RoundedIcon from '@mui/icons-material/Diversity2Rounded'
import StyleRoundedIcon from '@mui/icons-material/StyleRounded'
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded'

export const links = [
  {
    title: 'Board',
    path: '/',
    icon: <DashboardRoundedIcon />
  },
  {
    title: 'My team',
    path: '/team',
    icon: <Diversity2RoundedIcon />
  }, {
    title: 'My cards',
    path: 'my-cards',
    icon: <StyleRoundedIcon />
  },
  {
    title: 'Administration',
    path: 'admin-board',
    icon: <AdminPanelSettingsRoundedIcon />
  }
]
