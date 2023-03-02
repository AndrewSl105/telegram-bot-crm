import { createSlice } from '@reduxjs/toolkit'

export const notistackSlice = createSlice({
  name: 'notistack',
  initialState: {
    show: false,
    text: ''
  },
  reducers: {
    showNotification (state, action) {
      state.show = true
      state.text = action.payload
    },
    hideNotification (state) {
      state.show = false
      state.text = ''
    }
  }
})

export const { showNotification, hideNotification } = notistackSlice.actions
