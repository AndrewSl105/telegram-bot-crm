import * as React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { hide } from '../../../redux/slices/dialog'
import { useSelector } from 'react-redux'
import { editCardAction, getCardById } from '../../../redux/slices/kanban'
import { useAppDispatch } from '../../../hook'
import { IN_PROGRESS } from '../../../constants'
import { useEffect } from 'react'
import { updateCardStatusOnly } from '../../../utils'
import { type Board, type DialogProps } from '../../../interfaces/props'
import { type DialogState } from '../../../interfaces/state'

export default function CardDialog (props: DialogProps): React.ReactElement {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCardById(dialogProps._id))
  }, [dispatch])

  const { card, board } = useSelector((state: Board) => state.kanban)

  const dialogProps = useSelector((state: DialogState) => state.dialogSlice.dialogProps)

  const handleClose = (e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    props.dispatch(hide())
  }

  const changeStatusHandler = (e: React.MouseEvent): void => {
    const newCard = updateCardStatusOnly(IN_PROGRESS, card)
    const boardId = board._id

    void dispatch(editCardAction(newCard, boardId))
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
