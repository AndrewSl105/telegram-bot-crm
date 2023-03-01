import { type ReactElement } from 'react'
import { TASK_DIALOG } from './constants'
import TaskDialog from './components/TaskDialog'
import { useDispatch, useSelector } from 'react-redux'

const DIALOG_COMPONENTS = {
  [TASK_DIALOG]: TaskDialog
}

export interface Dialog {
  dialogSlice: {
    open: boolean
    dialogType: string
    dialogProps: []
  }
}

const DialogRoot = (): ReactElement => {
  const open = useSelector((state: Dialog) => state.dialogSlice.open)
  const dialogType = useSelector((state: Dialog) => state.dialogSlice.dialogType)
  const dispatch = useDispatch()

  const SpecificDialog = DIALOG_COMPONENTS[dialogType]

  return (
        <>
            {
                SpecificDialog !== undefined
                  ? (
                    <SpecificDialog open={open} dispatch={dispatch} />
                    )
                  : null
            }
        </>
  )
}

export default DialogRoot
