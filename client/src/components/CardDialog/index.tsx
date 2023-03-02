import * as React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { hide } from '../../slices/dialog'
import { type Action, type Dispatch } from 'redux'
import { useSelector } from 'react-redux'
import { type Board, type CardInterface } from '../../interfaces'
import { editCardAction, getCardById } from '../../slices/kanban'
import { useAppDispatch } from '../../hook'
import { IN_PROGRESS } from '../../constants'
import { useEffect } from 'react'
import { updateCardStatusOnly } from '../../utils'

interface DialogProps {
  dispatch: Dispatch<Action>
  open: boolean
  _id: string
}

export interface DialogState {
  dialogSlice: {
    open: boolean
    dialogType: string
    dialogProps: CardInterface
  }
}

export default function CardDialog (props: DialogProps): React.ReactElement {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCardById(dialogProps._id))
  }, [dispatch])

  const card = useSelector((state: Board) => state.kanban.card)
  const dialogProps = useSelector((state: DialogState) => state.dialogSlice.dialogProps)

  const handleClose = (e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    props.dispatch(hide())
  }

  const changeStatusHandler = (e: React.MouseEvent): void => {
    const newCard = updateCardStatusOnly(IN_PROGRESS, card)

    void dispatch(editCardAction(newCard))
    handleClose(e)
  }

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
                <Button color="success" onClick={changeStatusHandler} autoFocus>
                    Take it!
                </Button>
            </DialogActions>
        </Dialog>
  )
};
