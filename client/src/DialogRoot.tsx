import { type ReactElement } from 'react'
import { TASK_DIALOG } from './constants'
import TaskDialog from './components/TaskDialog'
import { useDispatch, useSelector } from 'react-redux'
import { type DialogState } from './slices/dialog'

const DIALOG_COMPONENTS = {
  [TASK_DIALOG]: TaskDialog
}

const DialogRoot = (): ReactElement => {
  const open = useSelector((state: DialogState) => state.open)
  const dialogType = useSelector((state: DialogState) => state.dialogType)
  const dispatch = useDispatch()

  const SpecificDialog = DIALOG_COMPONENTS[dialogType]

  return (
        <div>
            {
                SpecificDialog
                  ? (
                    <SpecificDialog open={open} dispatch={dispatch} />
                    )
                  : null
            }
        </div>
  )
}

export default DialogRoot
