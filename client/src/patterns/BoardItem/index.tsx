import { Box, IconButton } from '@mui/material'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import { deleteBoardAction } from '../../slices/kanban'
import { useDispatch } from 'react-redux'

const styles = {
  width: '100%',
  padding: '0.5rem',
  cursor: 'pointer',
  position: 'relative',
  borderRadius: '10px',
  fontSize: '1rem',
  color: 'white',
  zIndex: '1',
  transition: 'opacity 0.5s',
  ':hover': {
    opacity: '0.8'
  }
}

const BoardItem = (props): ReactJSXElement => {
  const dispatch = useDispatch()
  const deleteBoardHandler = (_id: string): void => {
    dispatch(deleteBoardAction(props._id))
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
