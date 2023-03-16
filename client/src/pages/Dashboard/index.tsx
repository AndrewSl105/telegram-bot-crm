import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {
  Outlet
} from 'react-router-dom'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getBoardAction, getKanbanBoardsListAction } from '../../redux/slices/kanban'
import { useAppDispatch } from '../../hook'
import { type Board } from '../../interfaces/props'
import DrawerList from './components/Drawer'

const drawerWidth = 240

interface Props {
  window?: () => Window
}

const DashBoard = (props: Props): ReactJSXElement => {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getKanbanBoardsListAction())
  }, [dispatch])

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }

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
                    <DrawerList />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                      display: { xs: 'none', sm: 'block' },
                      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                    open
                >
                    <DrawerList />
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
