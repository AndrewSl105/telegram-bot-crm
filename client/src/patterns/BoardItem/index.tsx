import { Box, IconButton } from '@mui/material'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import { deleteBoardAction } from '../../redux/slices/kanban'
import { styles } from './styles'
import { useAppDispatch } from '../../hook'
import { type Board, type BoardItemProps } from '../../interfaces/props'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BoardItem = (props: BoardItemProps): ReactJSXElement => {
  const kanban = useSelector((state: Board) => state.kanban)
  const boardColor = kanban.board.style?.color

  const dispatch = useAppDispatch()
  const deleteBoardHandler = (): void => {
    void dispatch(deleteBoardAction(props._id))
  }

  return (
      <Box display="flex" width="100%">
        <Box sx={{
          ...styles,
          background: props.style.color,
          opacity: boardColor === props.style.color ? '1' : '0.8'
        }} onClick={props.onChangeBoard }>
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
