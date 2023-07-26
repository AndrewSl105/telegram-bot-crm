import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, TextField
} from '@mui/material'
import { hide } from '../../../redux/slices/dialog'
import { useAppDispatch } from '../../../hook'
import { type DialogProps } from '../../../interfaces/props'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { editCardSchema } from './validation'
import { useEffect, useMemo } from 'react'
import { getCardById } from '../../../redux/slices/kanban'

export default function EditCardDialog (props: DialogProps): React.ReactElement {
  const dispatch = useAppDispatch()
  const dialogProps = useSelector((state: any) => state.dialogSlice.dialogProps)
  const card = useSelector((state: any) => state.kanban.card)

  useEffect(() => {
    dispatch(getCardById(dialogProps._id))
  }, [dispatch, dialogProps._id])

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: editCardSchema,
    initialValues: {
      title: card.title,
      description: card.description
    },
    onSubmit: (): any => {}
  })

  const handleClose = (e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    props.dispatch(hide())
  }

  const { dirty, errors, values, setFieldValue } = formik

  const onEditHandler = (): void => {
    props.dispatch(hide())
  }

  const onChangeField = (e: any): void => {
    void setFieldValue('title', e.target.value)
  }

  const memoizedComponent = useMemo(() => (
        <Dialog
            open={props.open}
            maxWidth="sm"
            fullWidth
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Edit Board
            </DialogTitle>
            <DialogContent>
                <TextField
                    error={Boolean(errors.title)}
                    onChange={onChangeField}
                    value={values.title}
                />
                <TextField
                    error={Boolean(errors.description)}
                    onChange={onChangeField}
                    value={values.description}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CLOSE</Button>
                <Button disabled={!dirty} onClick={onEditHandler} color="success" autoFocus>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
  ), [values, errors])

  return memoizedComponent
};
