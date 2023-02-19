import { createSlice } from '@reduxjs/toolkit'
import { type ColumnInterface, type TaskCartInterface } from '../interfaces'
import axios from 'axios'
import { type Action, type Dispatch } from 'redux'
import { findDropColumn } from '../utils'

export interface KanbanDataState {
  data: ColumnInterface[]
}

const initialState: KanbanDataState = { data: [] }

export const kanbanTaskSlice = createSlice({
  name: 'kanbanData',
  initialState,
  reducers: {
    getData (state, action) {
      state.data = action.payload
    },
    updateKanban (state, action) {
      const taskId = action.payload.id
      const columnId = action.payload.columnId

      const dragColumn = state.data.filter((column: ColumnInterface) => {
        return column.items.some((el: TaskCartInterface) => {
          return el.id === taskId
        })
      })
      const dragTask = dragColumn[0].items.find((el: TaskCartInterface) => el.id === taskId)
      const newColumns = state.data

      const dropColumn = findDropColumn(newColumns, columnId)

      dropColumn?.items.push(dragTask)
      dragColumn[0].items.pop(dragTask)
    }
  }
})

export const { updateKanban } = kanbanTaskSlice.actions
export default kanbanTaskSlice.reducer

export function getKanban () {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const response = await axios.get('http://localhost:3004/kanban')
      dispatch(kanbanTaskSlice.actions.getData(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}
