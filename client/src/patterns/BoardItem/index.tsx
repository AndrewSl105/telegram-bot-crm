import { Box, IconButton } from '@mui/material'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import { deleteBoardAction } from '../../redux/slices/kanban'
import { styles } from './styles'
import { useAppDispatch } from '../../hook'
import { type BoardItemProps } from '../../interfaces/props'

const BoardItem = (props: BoardItemProps): ReactJSXElement => {
  const dispatch = useAppDispatch()
  const deleteBoardHandler = (): void => {
    void dispatch(deleteBoardAction(props._id))
  }

  return (
      <Box display="flex" width="100%">
        <Box sx={{ ...styles, background: props.style.color }} onClick={props.onChangeBoard }>
          {props.title}
        </Box>
        <IconButton onClick={deleteBoardHandler} sx={{ marginLeft: '5px' }}>
          <DeleteForeverRoundedIcon />
        </IconButton>
      </Box>
  )
}

export default BoardItem
