import { Box, IconButton } from '@mui/material'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import { changeEnvironmentAction, deleteBoardAction } from '../../redux/slices/kanban'
import { styles } from './styles'
import { useAppDispatch } from '../../hook'
import { type Board, type BoardItemProps } from '../../interfaces/props'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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

  return (
      <Box display="flex" width="100%">
        <Box sx={{
          ...styles,
          background: props.style.color,
          width: boardColor === props.style.color ? '100%' : '60%'
        }}
             onClick={changeEnvironmentHandler}>
            <Link to='/'>
                {props.title}
            </Link>
        </Box>
        <IconButton
            onClick={deleteBoardHandler}
            sx={{ marginLeft: '5px' }}
        >
          <DeleteForeverRoundedIcon />
        </IconButton>
      </Box>
  )
}

export default BoardItem
