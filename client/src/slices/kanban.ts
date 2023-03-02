import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { buildBoard } from '../utils'
import { showNotification } from './notistack'
import { CARD_UPDATE_SUCCESS } from '../constants'
import { type CardInterface } from '../interfaces'

const state = {
  loading: false,
  board: [],
  error: '',
  card: {}
}

export const kanbanBoardSlice = createSlice({
  name: 'kanban',
  initialState: state,
  reducers: {
    getBoard (state, action) {
      const board = buildBoard(action.payload)
      state.board = board
    },
    startLoading (state) {
      state.error = ''
      state.loading = true
    },
    endLoading (state) {
      state.loading = false
    },
    getError (state, action) {
      state.error = action.payload
    },
    getCardById (state, action) {
      const cardId = action.payload
      const card = state.board.cards.find(el => el._id === cardId)
      state.card = card
    },
    editCardSuccess (state, action) {

    }
  }
})

export const { getCardById } = kanbanBoardSlice.actions
export default kanbanBoardSlice.reducer

export function getBoardAction () {
  return async (dispatch: any, state: any) => {
    dispatch(kanbanBoardSlice.actions.startLoading(state))
    let response
    try {
      response = await axios.get('http://localhost:5000/api/kanban', {
        headers: { 'Access-Control-Allow-Origin': '*' }
      })
      dispatch(kanbanBoardSlice.actions.getBoard(response.data))
      dispatch(kanbanBoardSlice.actions.endLoading(state))
    } catch (error) {
      dispatch(kanbanBoardSlice.actions.getError(error))
      console.log(error)
    }
  }
}

export function editCardAction (newCard: CardInterface) {
  return async (dispatch: any) => {
    let response
    try {
      response = await axios.post('http://localhost:5000/api/kanban', {
        newCard
      })
      dispatch(kanbanBoardSlice.actions.editCardSuccess(response.data))
      dispatch(showNotification(CARD_UPDATE_SUCCESS))
    } catch (error) {
      console.log(error)
    }
  }
}
