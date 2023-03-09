import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addCardAction, getKanbanBoardsListAction } from '../../../redux/slices/kanban'
import { hide } from '../../../redux/slices/dialog'
import { useAppDispatch } from '../../../hook'
import AddCardForm from './components/AddCardForm'
import { getInitialState, getNewCardObject } from './utils'
import { type Board, type DialogProps } from '../../../interfaces/props'

export default function CreateCardDialog (props: DialogProps): React.ReactElement {
  const dispatch = useAppDispatch()

  const boardsList = useSelector((state: Board) => state.kanban.boardsList)

  useEffect(() => {
    void dispatch(getKanbanBoardsListAction())
  }, [dispatch])

  const [cardState, setCardState] = useState(getInitialState())
  const [boardId, setBoardId] = React.useState<string>('')

  const handleClose = (e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    props.dispatch(hide())
  }

  const addCardHandler = (): void => {
    const card = getNewCardObject(cardState)
    void dispatch(addCardAction(card, boardId))
    props.dispatch(hide())
  }

  return (
        <Dialog
            open={props.open}
            maxWidth="md"
            fullWidth
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >

            <DialogTitle id="alert-dialog-title">
                Create new card
            </DialogTitle>
            <DialogContent>
                <AddCardForm
                    cardState={cardState}
                    setBoardId={setBoardId}
                    boardId={boardId}
                    setCardState={setCardState}
                    boardsList={boardsList}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CLOSE</Button>
                <Button onClick={addCardHandler} color="success" autoFocus>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
  )
};
