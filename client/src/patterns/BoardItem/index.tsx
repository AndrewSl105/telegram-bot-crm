import { Box, IconButton } from '@mui/material'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import { changeEnvironmentAction, deleteBoardAction } from '../../redux/slices/kanban'
import { styles } from './styles'
import { useAppDispatch } from '../../hook'
import { type Board, type BoardItemProps } from '../../interfaces/props'
import { useSelector } from 'react-redux'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { Link } from 'react-router-dom'
import { show } from '../../redux/slices/dialog'
import { EDIT_BOARD_DIALOG } from '../../constants'

const BoardItem = (props: BoardItemProps): ReactJSXElement => {
  const kanban = useSelector((state: Board) => state.kanban)
  const boardColor = kanban.board.style?.color
  const currentPassCode = kanban.passCode

  const dispatch = useAppDispatch()
  const deleteBoardHandler = (): void => {
    void dispatch(deleteBoardAction(props._id))
  }

  const changeEnvironmentHandler = (): void => {
    if (currentPassCode === props.passCode) return
    void dispatch(changeEnvironmentAction(props.passCode))
  }

  const openEditDialogHandler = (): void => {
    dispatch(show({
      type: EDIT_BOARD_DIALOG,
      props: props.passCode
    }))
  }

  return (
      <Box display="flex" width="100%">
        <Box sx={{
          ...styles,
          background: props.style.color,
          width: boardColor === props.style.color ? '100%' : '50%'
        }}
             onClick={changeEnvironmentHandler}>
            <Link to='/'>
                {props.title}
            </Link>
        </Box>
          <Box display="flex">
              <IconButton
                  onClick={deleteBoardHandler}
                  sx={{ marginLeft: '5px' }}
              >
                  <DeleteForeverRoundedIcon />
              </IconButton>
              <IconButton onClick={openEditDialogHandler}>
                  <EditRoundedIcon />
              </IconButton>
          </Box>
      </Box>
  )
}

export default BoardItem
