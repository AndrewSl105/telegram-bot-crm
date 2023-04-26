import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addCardAction, getKanbanBoardsListAction } from '../../../redux/slices/kanban'
import { hide } from '../../../redux/slices/dialog'
import { useAppDispatch } from '../../../hook'
import AddCardForm from './components/AddCardForm'
import { getInitialState } from './utils'
import { type Board, type DialogProps } from '../../../interfaces/props'
import { useFormik } from 'formik'
import { cardSchema } from './validation'

function CreateCardDialog (props: DialogProps): React.ReactElement {
  const dispatch = useAppDispatch()

  const boardsList = useSelector((state: Board) => state.kanban.boardsList)

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: cardSchema,
    initialValues: getInitialState(),
    onSubmit: (values): any => {
      void dispatch(addCardAction(values))
    }
  })

  useEffect(() => {
    void dispatch(getKanbanBoardsListAction())
  }, [dispatch])

  const handleClose = (e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    props.dispatch(hide())
  }

  const addCardHandler = (): void => {
    void dispatch(addCardAction(formik.values))
    props.dispatch(hide())
  }

  const { errors } = formik

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
                    boardId={formik.values.boardId}
                    getFieldProps={formik.getFieldProps}
                    boardsList={boardsList}
                    errors={errors}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CLOSE</Button>
                <Button type="submit" onClick={addCardHandler} color="success" autoFocus>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
  )
}

export default CreateCardDialog
