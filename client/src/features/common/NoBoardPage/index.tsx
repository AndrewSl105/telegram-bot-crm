import { Box, Button, Typography } from '@mui/material'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useAppDispatch } from '../../../hook'
import { show } from '../../../redux/slices/dialog'
import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded'
import { CREATE_BOARD_DIALOG, JOIN_TO_BOARD_DIALOG } from '../../../constants'

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
            <Typography variant="h4">
                Oops... you are not added to any boards
            </Typography>
            <Box sx={{
              svg: {
                width: '20rem',
                height: '20rem'
              }
            }}>
                <GppMaybeRoundedIcon color="error" />
            </Box>
            <Box marginTop="2rem">
                <Button sx={{ mr: '1rem' }} variant="contained" onClick={openJoinDialogHandler}>
                    Join to Board
                </Button>
                <Button variant="contained" onClick={openCreateDialogHandler}>
                    Create new
                </Button>
            </Box>
        </Box>
  )
}

export default NoBoardPage
