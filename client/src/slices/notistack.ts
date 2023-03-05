import { createSlice } from '@reduxjs/toolkit'

export const notistackSlice = createSlice({
  name: 'notistack',
  initialState: {
    show: false,
    text: '',
    variant: 'default'
  },
  reducers: {
    showNotification (state, action) {
      const { text, variant } = action.payload
      state.show = true
      state.text = text
      state.variant = variant
    },
    hideNotification (state) {
      state.show = false
      state.text = ''
    }
  }
})

export const { showNotification, hideNotification } = notistackSlice.actions
