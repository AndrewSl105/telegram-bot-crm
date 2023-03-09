import { type ReactElement } from 'react'
import { CREATE_BOARD_DIALOG, CREATE_CARD_DIALOG, TASK_DIALOG } from '../../../constants'
import { useDispatch, useSelector } from 'react-redux'
import CardDialog from '../CardDialog'
import CreateBoardDialog from '../CreateBoardDialog'
import CreateCardDialog from '../CreateCardDilaog'

const DIALOG_COMPONENTS = {
  [TASK_DIALOG]: CardDialog,
  [CREATE_BOARD_DIALOG]: CreateBoardDialog,
  [CREATE_CARD_DIALOG]: CreateCardDialog
}

export interface Dialog {
  dialogSlice: {
    open: boolean
    dialogType: string
    _id: string
  }
}

const Index = (): ReactElement => {
  const open = useSelector((state: Dialog) => state.dialogSlice.open)
  const dialogType = useSelector((state: Dialog) => state.dialogSlice.dialogType)
  const dispatch = useDispatch()

  const SpecificDialog = DIALOG_COMPONENTS[dialogType]

  return (
        <>
            {
                SpecificDialog !== undefined
                  ? (<SpecificDialog open={open} dispatch={dispatch}/>)
                  : null
            }
        </>
  )
}

export default Index