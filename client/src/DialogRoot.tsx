import { type ReactElement } from 'react'
import { TASK_DIALOG } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import CardDialog from './components/CardDialog'

const DIALOG_COMPONENTS = {
  [TASK_DIALOG]: CardDialog
}

export interface Dialog {
  dialogSlice: {
    open: boolean
    dialogType: string
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
                    <SpecificDialog open={open} dispatch={dispatch}/>
                    )
                  : null
            }
        </>
  )
}

export default DialogRoot
