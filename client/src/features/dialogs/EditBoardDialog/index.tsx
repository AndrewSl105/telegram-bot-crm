import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField
} from '@mui/material'
import { hide } from '../../../redux/slices/dialog'
import { useAppDispatch } from '../../../hook'
import { type DialogProps } from '../../../interfaces/props'
import { useSelector } from 'react-redux'
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded'
import { showNotification } from '../../../redux/slices/notistack'
import { ERROR, SUCCESS } from '../../../constants'
import { useFormik } from 'formik'
import { editBoardAction } from '../../../redux/slices/kanban'

export default function EditBoardDialog (props: DialogProps): React.ReactElement {
  const dispatch = useAppDispatch()
  const dialogProps = useSelector((state: any) => state.dialogSlice.dialogProps)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      environmentName: dialogProps.title
    },
    onSubmit: (): any => {}
  })

  const handleClose = (e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    props.dispatch(hide())
  }

  const copyPassCodeHandler = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(dialogProps.passCode)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      dispatch(showNotification({ text: `PassCode: ${dialogProps.passCode} copy to clipboard!`, variant: SUCCESS }))
    } catch (err: unknown) {
      console.error('Failed to copy: ', err)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      dispatch(showNotification({ text: `Failed to copy: ${err}`, variant: ERROR }))
    }
  }

  const { getFieldProps, dirty, values } = formik

  const onEditHandler = (): void => {
    void dispatch(editBoardAction(values.environmentName, dialogProps._id))
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
               Edit Board
            </DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    value={dialogProps.passCode}
                    fullWidth
                    id="outlined-basic"
                    label="PassCode"
                    variant="outlined"
                    disabled={true}
                    InputProps={{
                      endAdornment:
                            <IconButton onClick={copyPassCodeHandler}>
                                <FileCopyRoundedIcon />
                            </IconButton>
                    }}
                />
                <TextField
                    {...getFieldProps('environmentName')}
                    autoFocus
                    margin="dense"
                    fullWidth
                    id="outlined-basic"
                    label="Board name"
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CLOSE</Button>
                <Button disabled={!dirty} onClick={onEditHandler} color="success" autoFocus>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
  )
};
