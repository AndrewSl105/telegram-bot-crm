import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { type Action, type Dispatch } from 'redux'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addCardAction, getKanbanBoardsListAction } from '../../../slices/kanban'
import { hide } from '../../../slices/dialog'
import { useAppDispatch } from '../../../hook'
import { type Board } from '../../../interfaces'
import AddCardForm from './components/AddCardForm'
import { getInitialState, getNewCardObject } from './utils'

interface DialogProps {
  dispatch: Dispatch<Action>

  open: boolean
  _id: string
}

export default function CreateCardDialog (props: DialogProps): React.ReactElement {
  const dispatch = useAppDispatch()

  const boardsList = useSelector((state: Board) => state.kanban.boardsList)

  useEffect(() => {
    dispatch(getKanbanBoardsListAction())
  }, [dispatch])

  const [cardState, setCardState] = useState(getInitialState())
  const [boardId, setBoardId] = React.useState([])

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
