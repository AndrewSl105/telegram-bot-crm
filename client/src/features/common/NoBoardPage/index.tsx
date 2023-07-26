import { Box, Button, Typography } from '@mui/material'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useAppDispatch } from '../../../hook'
import { show } from '../../../redux/slices/dialog'
import { CREATE_BOARD_DIALOG, JOIN_TO_BOARD_DIALOG } from '../../../constants'
import rac from '../../../media/images/rac.png'

const NoBoardPage = (): ReactJSXElement => {
  const dispatch = useAppDispatch()

  const openJoinDialogHandler = (): any => {
    dispatch(show({
      type: JOIN_TO_BOARD_DIALOG
    }))
  }

  const openCreateDialogHandler = (): any => {
    dispatch(show({
      type: CREATE_BOARD_DIALOG
    }))
  }

  return (
        <Box sx={{ textAlign: 'center', mt: '4rem' }}>
            <Box sx={{
              mb: '1rem',
              img: {
                mr: '4rem'
              }
            }}>
                <img src={rac} width="350px" alt="rac"/>
            </Box>
            <Typography variant="h5">
                Oops... you are not added to any boards
            </Typography>
            <Box marginTop="2rem">
                <Button sx={{ mr: '1rem' }} variant="outlined" onClick={openJoinDialogHandler}>
                    Join to Board
                </Button>
                <Button variant="outlined" onClick={openCreateDialogHandler}>
                    Create new
                </Button>
            </Box>
        </Box>
  )
}

export default NoBoardPage
