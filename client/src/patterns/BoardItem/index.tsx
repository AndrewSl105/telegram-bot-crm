import { Box } from '@mui/material'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'

const styles = {
  width: '100%',
  padding: '2rem',
  cursor: 'pointer',
  borderColor: '10px'
}

const BoardItem = (props): ReactJSXElement => {
  return (
        <Box sx={{ ...styles}} onClick={props.onClick }>
            {props.title}
        </Box>
  )
}

export default BoardItem
