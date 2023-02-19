import { combineReducers } from '@reduxjs/toolkit'
import { dialogSlice } from './slices/dialog'
import { kanbanTaskSlice } from './slices/kanbanTask'

export const reducers = combineReducers({
  dialogSlice: dialogSlice.reducer,
  kanban: kanbanTaskSlice.reducer
})
