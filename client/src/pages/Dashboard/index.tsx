import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import {
  Outlet
} from 'react-router-dom'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useEffect } from 'react'
import { changeEnvironmentAction, getKanbanBoardsListAction } from '../../redux/slices/kanban'
import { useAppDispatch } from '../../hook'
import DrawerList from './components/Drawer'
import { useSelector } from 'react-redux'
import { type Board } from '../../interfaces/props'
import hexToRgba from 'hex-to-rgba'

const drawerWidth = 270

interface Props {
  window?: () => Window
}

function DashBoard (props: Props): ReactJSXElement {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const dispatch = useAppDispatch()
  const kanban = useSelector((state: Board) => state.kanban)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if ((!kanban.passCode && kanban.boardListLoaded) || kanban.boardAdded) {
      const defaultPassCode = kanban.boardsList[0]?.passCode
      void dispatch(changeEnvironmentAction(defaultPassCode))
    }
  }, [kanban.boardListLoaded, dispatch, kanban.passCode, kanban.boardAdded])

  const boardBackGround = kanban.board.style?.color
  let backGroundRgba

  if (boardBackGround !== undefined) {
    backGroundRgba = hexToRgba(boardBackGround, 0.05)
  }

  useEffect(() => {
    void dispatch(getKanbanBoardsListAction())
  }, [dispatch])

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }

  const container = window !== undefined ? () => window().document.body : undefined

  return (
        <Box sx={{ display: 'flex', overflowX: 'hidden' }}>
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
                      '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        borderRight: '2px dashed rgba(145, 158, 171, 0.24)'
                      }
                    }}
                    open
                >
                    <DrawerList />
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: 3,
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
                  mt: '1rem',
                  background: backGroundRgba
                }}
            >
                <Outlet />
            </Box>
        </Box>
  )
}

export default DashBoard
