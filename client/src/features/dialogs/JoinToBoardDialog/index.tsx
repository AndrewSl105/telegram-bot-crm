import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'
import { hide } from '../../../redux/slices/dialog'
import { useAppDispatch } from '../../../hook'
import { useState } from 'react'
import { type DialogProps } from '../../../interfaces/props'
import { addPassCodeAction } from '../../../redux/slices/user'

export default function JoinToBoardDialog (props: DialogProps): React.ReactElement {
  const dispatch = useAppDispatch()

  const [boardPassCode, setBoardPassCode] = useState('')

  const handleClose = (e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    props.dispatch(hide())
  }

  const changeBoardNameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBoardPassCode(e.target.value)
  }

  const joinToBoardHandler = (): void => {
    void dispatch(addPassCodeAction(boardPassCode))
    props.dispatch(hide())
  }

  return (
        <Dialog
            open={props.open}
            maxWidth="sm"
            fullWidth
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Join to board
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    onChange={changeBoardNameHandler}
                    margin="dense"
                    fullWidth
                    id="outlined-basic"
                    label="Board Passcode"
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CLOSE</Button>
                <Button onClick={joinToBoardHandler} color="success" autoFocus>
                    Join
                </Button>
            </DialogActions>
        </Dialog>
  )
};
