import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface BoardDataState {
  board: []
}

const initialState: BoardDataState = {
  board: []
}

export const kanbanBoardSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    getBoard (state, action) {
      state.board = action.payload
      console.log(state.board)
    },
    updateCardStatus (state, action) {
      console.log(action)
    }
  }
})

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
