import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'
import { hide } from '../../slices/dialog'
import { type Action, type Dispatch } from 'redux'
import { useAppDispatch } from '../../hook'
import { useState } from 'react'
import { createNewBoardAction } from '../../slices/kanban'

interface DialogProps {
  dispatch: Dispatch<Action>
  open: boolean
  _id: string
}

export default function CreateBoardDialog (props: DialogProps): React.ReactElement {
  const dispatch = useAppDispatch()

  const [boardName, setBoardName] = useState('')

  const handleClose = (e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    props.dispatch(hide())
  }

  const changeBoardNameHandler = (e) => {
    setBoardName(e.target.value)
  }

  const addBoardHandler = (): void => {
    void dispatch(createNewBoardAction(boardName))
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
                Create new board
            </DialogTitle>
            <DialogContent>
                    <TextField onChange={changeBoardNameHandler} margin="dense" fullWidth id="outlined-basic" label="Board name" variant="outlined" />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CLOSE</Button>
                <Button onClick={addBoardHandler} color="success" autoFocus>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
  )
};
