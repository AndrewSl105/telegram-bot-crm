import { combineReducers } from '@reduxjs/toolkit'
import { dialogSlice } from './slices/dialog'
import { kanbanBoardSlice } from './slices/kanban'
import { notistackSlice } from './slices/notistack'

export const reducers = combineReducers({
  dialogSlice: dialogSlice.reducer,
  kanban: kanbanBoardSlice.reducer,
  notistack: notistackSlice.reducer
})
