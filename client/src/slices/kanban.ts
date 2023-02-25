import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { buildBoard, updateCardState } from '../utils'

export const kanbanBoardSlice = createSlice({
  name: 'kanban',
  initialState: [],
  reducers: {
    getBoard (state, action) {
      return buildBoard(action.payload)
    },
    updateCardStatus (state, action) {
      const newState = state
      const { draggableId, destinationColumnId } = action.payload

      console.log(draggableId, destinationColumnId)

      updateCardState(draggableId, destinationColumnId, newState)
      return buildBoard(newState)
    }
  }
})

export const { updateCardStatus } = kanbanBoardSlice.actions
export default kanbanBoardSlice.reducer

export function getBoardAction () {
  return async (dispatch: any) => {
    try {
      const response = await axios.get('http://localhost:5000/api/kanban', {
        headers: { 'Access-Control-Allow-Origin': '*' }
      })
      dispatch(kanbanBoardSlice.actions.getBoard(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function updateCardStatusAction (draggableId, destinationColumnId) {
  return async (dispatch: any) => {
    try {
      console.log(true)
      await axios.post('http://localhost:5000/api/kanban', {
        draggableId, destinationColumnId
      })
      console.log(true)
      dispatch(kanbanBoardSlice.actions.updateCardStatus({
        draggableId, destinationColumnId
      }))
    } catch (error) {
      console.log(error)
    }
  }
}
