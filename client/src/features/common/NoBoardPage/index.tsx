import { Box, Button, Typography } from '@mui/material'
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useAppDispatch } from '../../../hook'
import { show } from '../../../redux/slices/dialog'
import { JOIN_TO_BOARD_DIALOG } from '../../../constants'

const NoBoardPage = (): ReactJSXElement => {
  const dispatch = useAppDispatch()

  const openJoinToBoardDialogHandler = (): any => {
    void dispatch(show(JOIN_TO_BOARD_DIALOG))
  }

  return (
        <Box>
            <Typography>
                Oops... you are not added to any boards
            </Typography>
            <Box>
                <Button onClick={openJoinToBoardDialogHandler}>
                    Join to Board
                </Button>
                <Button>
                    Create new
                </Button>
            </Box>
        </Box>
  )
}

export default NoBoardPage
