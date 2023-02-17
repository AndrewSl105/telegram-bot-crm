import { configureStore } from '@reduxjs/toolkit'
import { dialogSlice } from './slices/dialog'

export const store = configureStore({
  reducer: dialogSlice.reducer
})
