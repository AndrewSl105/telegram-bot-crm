import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import { links } from '../../data'
import ListItem from '@mui/material/ListItem'
import { Link } from 'react-router-dom'
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

const DrawerList = (): ReactJSXElement => {
  const dispatch = useAppDispatch()

  const boardsList = useSelector((state: Board) => state.kanban.boardsList)

  const changeEnvironmentHandler = (passCode: string): void => {
    void dispatch(changeEnvironmentAction(passCode))
  }

  return (
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