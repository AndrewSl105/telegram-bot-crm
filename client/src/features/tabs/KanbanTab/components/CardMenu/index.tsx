import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded'
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded'
import LowPriorityRoundedIcon from '@mui/icons-material/LowPriorityRounded'
import { Box, Typography } from '@mui/material'
import { useAppDispatch } from '../../../../../hook'
import { deleteCardAction } from '../../../../../redux/slices/kanban'
import { useSelector } from 'react-redux'
import { type Board } from '../../../../../interfaces/props'


const WRITE_USER = 'WRITE_USER'
const CHANGE_PRIOR = 'CHANGE_PRIOR'
const DELETE_CARD = 'DELETE_CARD'

const options = [
  {
    icon: <RateReviewRoundedIcon sx={{ color: '#1b55c4' }} />,
    label: 'Write user in Telegram',
    key: WRITE_USER
  },
  {
    icon: <LowPriorityRoundedIcon sx={{ color: '#c9ae2e' }} />,
    label: 'Change priority',
    key: CHANGE_PRIOR
  },
  {
    icon: <RemoveCircleRoundedIcon sx={{ color: '#d54141' }} />,
    label: 'Delete card',
    key: DELETE_CARD
  }
]

interface Props {
  _id: string
  user: string
}

export default function CardMenu ({
  _id, user
}: Props): ReactJSXElement {
  const [anchorEl, setAnchorEl] =
      React.useState<null | HTMLElement>(null)

  const dispatch = useAppDispatch()
  const boardId = useSelector((state: Board) => state.kanban.passCode)

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleChange = (key: string): void => {
    switch (key) {
      case WRITE_USER:
        window.open(`tg://resolve?domain=${user}`)
        break
      case CHANGE_PRIOR:
        break
      case DELETE_CARD:
        void dispatch(deleteCardAction(_id, boardId))
        break
    }
    setAnchorEl(null)
  }

  return (
        <Box sx={{
          position: 'absolute',
          right: '5%',
          top: '5%'
        }}>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: '28ch'
                  }
                }}
            >
                {
                    options.map(el => (
                            <MenuItem
                                onClick={() => { handleChange(el.key) }}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between'
                                }}
                                key={el.key}
                            >
                                <Typography sx={{ mr: '1rem' }}>
                                    {el.label}
                                </Typography>
                                {el.icon}
                            </MenuItem>
                    )
                    )
                }
            </Menu>
        </Box>
  )
}
