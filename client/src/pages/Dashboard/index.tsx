import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Diversity2RoundedIcon from '@mui/icons-material/Diversity2Rounded'
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded'

import StyleRoundedIcon from '@mui/icons-material/StyleRounded'
import {
  Link, Outlet
} from 'react-router-dom'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useDispatch, useSelector } from 'react-redux'
import { type Board } from '../../interfaces'
import { useEffect } from 'react'
import { changeEnvironmentAction, getKanbanBoardsListAction } from '../../slices/kanban'
import BoardItem from '../../patterns/BoardItem'

const drawerWidth = 240

interface Props {
  window?: () => Window
}

const DashBoard = (props: Props): ReactJSXElement => {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const dispatch = useDispatch()
  const boardsList = useSelector((state: Board) => state.kanban.boardsList)

  useEffect(() => {
    dispatch(getKanbanBoardsListAction())
  }, [dispatch])

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }

  const links = [
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
      path: 'my-tasks',
      icon: <StyleRoundedIcon />
    },
    {
      title: 'Administration',
      path: 'admin-board',
      icon: <AdminPanelSettingsRoundedIcon />
    },
    {
      title: 'Log out',
      path: 'login',
      icon: <LogoutRoundedIcon />
    }
  ]

  const changeEnvironmentHandler = (passCode: string): void => {
    dispatch(changeEnvironmentAction(passCode))
  }

  const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {links.map((el, index) => (
                    <ListItem sx={{
                      a: {
                        textDecoration: 'none',
                        width: '100%',
                        color: 'black'
                      }
                    }} key={el.title} disablePadding>
                        <Link to={el.path}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {el.icon}
                                </ListItemIcon>
                                <ListItemText primary={el.title} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {boardsList.map(el => (
                    <ListItem key={el.environmentName}>
                        <BoardItem
                            dipatch={dispatch}
                            _id={el._id}
                            style={el.style}
                            title={el.environmentName}
                            onChangeBoard={() => { changeEnvironmentHandler(el.passCode) }} />
                    </ListItem>
                ))}
            </List>
        </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined
  const kanban = useSelector((state: Board) => state.kanban)
  const envName = kanban.board.environmentName
  const bardColor = kanban.board.style?.color

  return (
        <Box sx={{ display: 'flex', overflowX: 'hidden' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
                  ml: { sm: `${drawerWidth}px` },
                  background: bardColor
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {envName}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                      keepMounted: true // Better open performance on mobile.
                    }}
                    sx={{
                      display: { xs: 'block', sm: 'none' },
                      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                      display: { xs: 'none', sm: 'block' },
                      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: '64px' }}
            >
                <Outlet />
            </Box>
        </Box>
  )
}

export default DashBoard
