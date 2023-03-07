import { Box } from '@mui/material'
import AdminItem from './components/AdminItem'
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import { show } from '../../slices/dialog'
import { CREATE_BOARD_DIALOG, CREATE_CARD_DIALOG } from '../../constants'
import { useDispatch } from 'react-redux'

const AdminBoard = (): ReactJSXElement => {
  const dispatch = useDispatch()

  const showCreateBoardDialog = (): void => {
    dispatch(show({ type: CREATE_BOARD_DIALOG }))
  }

  const showCreateCardDialog = (): void => {
    dispatch(show({ type: CREATE_CARD_DIALOG }))
  }

  return (
        <Box display="flex" flexDirection="row">
            <AdminItem action={showCreateBoardDialog} icon={<AddBoxRoundedIcon />} text="Add new Board" />
            <AdminItem action={null} icon={<PersonAddRoundedIcon />} text="Add User" />
            <AdminItem action={showCreateCardDialog} icon={<AddCardRoundedIcon />} text="Add Card" />
        </Box>
  )
}

export default AdminBoard
