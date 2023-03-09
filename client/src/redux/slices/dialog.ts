import { createSlice } from '@reduxjs/toolkit'

export interface DialogState {
  open: boolean
  dialogType: string
  dialogProps: []
}

const initialState: DialogState = { open: false, dialogType: '', dialogProps: [] }

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    show (state, action) {
      state.dialogType = action.payload.type
      state.dialogProps = action.payload.props
      state.open = true
    },
    hide (state) {
      state.dialogType = ''
      state.dialogProps = []
      state.open = false
    }
  }
})

export const { hide, show } = dialogSlice.actions
export default dialogSlice.reducer
