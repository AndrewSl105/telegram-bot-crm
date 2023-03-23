import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import { links } from '../../data'
import ListItem from '@mui/material/ListItem'
import { Link, useNavigate } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import BoardItem from '../../../../patterns/BoardItem'
import * as React from 'react'
import { changeEnvironmentAction } from '../../../../redux/slices/kanban'
import { useSelector } from 'react-redux'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { type Board } from '../../../../interfaces/props'
import { useAppDispatch } from '../../../../hook'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { Typography } from '@mui/material'
import { userLogOutAction } from '../../../../redux/slices/user'
import { useEffect } from 'react'

const DrawerList = (): ReactJSXElement => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const boardsList = useSelector((state: Board) => state.kanban.boardsList)
  const logIn = useSelector((state: any) => state.user.logIn)

  useEffect(() => {
    if (logIn === false) navigate('/log-in')
  }, [logIn])

  const changeEnvironmentHandler = (passCode: string): void => {
    void dispatch(changeEnvironmentAction(passCode))
  }

  const logOutHandler = (): void => {
    void dispatch(userLogOutAction())
  }

  return (
        <div>
            <Toolbar />
            <Divider sx={{
              borderColor: 'rgba(145, 158, 171, 0.24)',
              borderStyle: 'dashed'
            }} />
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
                <Typography
                    onClick={logOutHandler}
                    sx={{
                      color: 'red',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      mb: '1rem'
                    }}>
                    <LogoutRoundedIcon sx={{ mr: '32px' }} />
                    Log out
                </Typography>
            <Divider sx={{
              borderColor: 'rgba(145, 158, 171, 0.24)',
              borderStyle: 'dashed'
            }} />
            <List>
                {boardsList.map(el => (
                    <ListItem key={el.environmentName}>
                        <BoardItem
                            _id={el._id}
                            style={el.style}
                            title={el.environmentName}
                            onChangeBoard={() => { changeEnvironmentHandler(el.passCode) }} />
                    </ListItem>
                ))}
            </List>
        </div>
  )
}

export default DrawerList
