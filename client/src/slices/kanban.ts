import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { buildBoard, updateColumns } from '../utils'
import { showNotification } from './notistack'
import {
  BOARD_CREATED,
  BOARD_DELETED,
  CARD_ADDED_SUCCESS,
  CARD_UPDATE_SUCCESS,
  DEFAULT,
  ERROR,
  INFO,
  SUCCESS
} from '../constants'
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
    addCard (state, action) {

    },
    addToBoardList (state, action) {
      const list = state.boardsList
      const item = action.payload
      console.log(list, item)
      const newList = list.concat(item)
      state.boardsList = newList
    },
    deleteFromBoardList (state, action) {
      const boardId = action.payload
      const list = state.boardsList
      const newList = list.filter(el => el._id !== boardId)
      state.boardsList = newList
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
  return async (dispatch: any, state: any) => {
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

export function getKanbanBoardsListAction () {
  return async (dispatch: any) => {
    let response
    try {
      response = await axios.get('http://localhost:5000/api/kanban/getList')
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

export function createNewBoardAction (boardName: string) {
  return async (dispatch: any, state: any) => {
    dispatch(kanbanBoardSlice.actions.startLoading(state))
    let response
    try {
      response = await axios.post('http://localhost:5000/api/kanban/addBoard', {
        boardName
      })
      dispatch(kanbanBoardSlice.actions.addToBoardList(response.data))
      dispatch(kanbanBoardSlice.actions.endLoading(state))
      dispatch(showNotification({ text: BOARD_CREATED, variant: SUCCESS }))
    } catch (error) {
      dispatch(kanbanBoardSlice.actions.getError(error))
      dispatch(showNotification({ text: error, variant: ERROR }))
      console.log(error)
    }
  }
}

export function deleteBoardAction (boardId: string) {
  return async (dispatch: any, state: any) => {
    dispatch(kanbanBoardSlice.actions.startLoading(state))
    let response
    try {
      response = await axios.delete('http://localhost:5000/api/kanban/deleteBoard', {
        data: {
          boardId
        }
      })
      dispatch(kanbanBoardSlice.actions.deleteFromBoardList(response.data))
      dispatch(kanbanBoardSlice.actions.endLoading(state))
      dispatch(showNotification({ text: BOARD_DELETED, variant: DEFAULT }))
    } catch (error) {
      dispatch(kanbanBoardSlice.actions.getError(error))
      dispatch(showNotification({ text: error, variant: ERROR }))
      console.log(error)
    }
  }
}

export function addCardAction (card: any, boardId: string) {
  return async (dispatch: any, state: any) => {
    dispatch(kanbanBoardSlice.actions.startLoading(state))
    let response
    try {
      response = await axios.post('http://localhost:5000/api/kanban/addCard', {
        card, boardId
      })
      dispatch(kanbanBoardSlice.actions.addCard(response.data))
      dispatch(kanbanBoardSlice.actions.endLoading(state))
      dispatch(showNotification({ text: CARD_ADDED_SUCCESS, variant: SUCCESS }))
    } catch (error) {
      dispatch(kanbanBoardSlice.actions.getError(error))
      dispatch(showNotification({ text: error, variant: ERROR }))
      console.log(error)
    }
  }
}
