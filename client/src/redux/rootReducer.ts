import { combineReducers } from '@reduxjs/toolkit'
import { dialogSlice } from './slices/dialog'
import { kanbanBoardSlice } from './slices/kanban'
import { notistackSlice } from './slices/notistack'
import { userSlice } from './slices/user'

export const reducers = combineReducers({
  dialogSlice: dialogSlice.reducer,
  kanban: kanbanBoardSlice.reducer,
  notistack: notistackSlice.reducer,
  user: userSlice.reducer
})
