import { combineReducers } from '@reduxjs/toolkit'
import { dialogSlice } from './slices/dialog'
import { kanbanBoardSlice } from './slices/kanban'

export const reducers = combineReducers({
  dialogSlice: dialogSlice.reducer,
  kanban: kanbanBoardSlice.reducer
})
