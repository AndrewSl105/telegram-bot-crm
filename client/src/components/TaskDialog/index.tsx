import * as React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { hide } from '../../slices/dialog'
import { type Action, type Dispatch } from 'redux'

interface DialogProps {
  dispatch: Dispatch<Action>
  open: boolean
}

export default function TaskDialog (props: DialogProps): React.ReactElement {
  console.log(props)

  const handleClose = (e): void => {
    e.preventDefault()
    e.stopPropagation()
    props.dispatch(hide())
  }

  return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
  )
};
