import { createSlice } from '@reduxjs/toolkit'

export interface DialogState {
  open: boolean
  dialogType: string
}

const initialState: DialogState = { open: false, dialogType: '' }

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    show (state, action) {
      console.log(action)
      state.dialogType = action.payload
      state.open = true
    },
    hide (state) {
      state.dialogType = ''
      state.open = false
    }
  }
})

export const { hide, show } = dialogSlice.actions
export default dialogSlice.reducer
