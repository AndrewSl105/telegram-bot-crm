import * as React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { hide } from '../../slices/dialog'
import { type Action, type Dispatch } from 'redux'
import { useSelector } from 'react-redux'
import { type CardInterface } from '../../interfaces'
import { updateCardStatusAction } from '../../slices/kanban'
import { useAppDispatch } from '../../hook'

interface DialogProps {
  dispatch: Dispatch<Action>
  open: boolean
}

export interface DialogState {
  dialogSlice: {
    open: boolean
    dialogType: string
    dialogProps: CardInterface
  }
}

export default function TaskDialog (props: DialogProps): React.ReactElement {
  const handleClose = (e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    props.dispatch(hide())
  }

  const dispatch = useAppDispatch()

  const dialogProps = useSelector((state: DialogState) => state.dialogSlice.dialogProps)

  const chageStatusHandler = () => {}

  return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {dialogProps.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialogProps.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CLOSE</Button>
                <Button color="success" onClick={chageStatusHandler} autoFocus>
                    Take it!
                </Button>
            </DialogActions>
        </Dialog>
  )
};
