import { createSlice, current  } from '@reduxjs/toolkit'
import axios from 'axios'
import { buildBoard } from '../utils'

export interface BoardDataState {
  board: []
  sens: string
}

const initialState: BoardDataState = {
  board: [],
  sens: 'dddd'
}

export const kanbanBoardSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    getBoard (state, action) {
      state.board = buildBoard(action.payload)
    },
    updateCard (state, action) {
      // const draggableId = action.payload
      console.log(current(state))
    }
  }
})

export const { updateCard } = kanbanBoardSlice.actions
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
