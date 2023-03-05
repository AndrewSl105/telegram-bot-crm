import { createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'
import { buildBoard, updateColumns } from '../utils'
import { showNotification } from './notistack'
import { CARD_UPDATE_SUCCESS, SUCCESS } from '../constants'
import { type CardInterface } from '../interfaces'

const state = {
  loading: false,
  board: [],
  error: '',
  card: {},
  boardsList: [],
  passCode: '1234567'
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

    },
    onDrag (state, action) {
      const { draggableId, source, destination } = action.payload

      const columns = state.board.columns
      const cards = state.board.cards
      updateColumns(draggableId, source, destination, columns, cards)
    },
    getKanbanBoardsList (state, action) {
      state.boardsList = action.payload
    },
    changeEnvironment (state, action) {
      state.passCode = action.payload
    }
  }
})

export const { getCardById, changeEnvironment } = kanbanBoardSlice.actions
export default kanbanBoardSlice.reducer

export function getBoardAction () {
  return async (dispatch: any, state) => {
    dispatch(kanbanBoardSlice.actions.startLoading(state))
    let response
    const passCode = state().kanban.passCode
    try {
      response = await axios.get('http://localhost:5000/api/kanban', {
        params: {
          passCode
        }
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
      dispatch(showNotification({ text: CARD_UPDATE_SUCCESS, variant: SUCCESS }))
    } catch (error) {
      console.log(error)
    }
  }
}

export function getKanbanBoardsListAction (passCodes: string[]) {
  return async (dispatch: any) => {
    let response
    try {
      response = await axios.get('http://localhost:5000/api/kanban/getList', {
        params: {
          passCodes
        }
      })
      dispatch(kanbanBoardSlice.actions.getKanbanBoardsList(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function changeEnvironmentAction (passCode: string) {
  return async (dispatch: any) => {
    dispatch(changeEnvironment(passCode))
    dispatch(getBoardAction())
  }
}

export function onDragAction (result: any) {
  return async (dispatch: any) => {
    dispatch(kanbanBoardSlice.actions.onDrag(result))
  }
}
