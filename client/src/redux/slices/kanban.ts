import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { buildBoard, getUserData, getUserId, updateColumns } from '../../utils'
import { showNotification } from './notistack'
import {
  BOARD_CREATED,
  BOARD_DELETED,
  CARD_ADDED_SUCCESS,
  CARD_UPDATE_SUCCESS,
  DEFAULT,
  ERROR,
  SUCCESS
} from '../../constants'
import { type CardInterface } from '../../interfaces/state'
import { type BoardListItem } from '../../interfaces/props'

interface mainKanbanState {
  loading: boolean
  board: any
  error: string
  card: CardInterface | unknown
  boardsList: BoardListItem[]
  passCode: string
}

const initialState: mainKanbanState = {
  loading: false,
  board: [],
  error: '',
  card: {},
  boardsList: [],
  passCode: ''
}

export const kanbanBoardSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    getBoard (state, action) {
      state.board = buildBoard(action.payload)
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
      state.card = state.board.cards.find((el: CardInterface) => el._id === cardId)
    },
    editCardSuccess (state, action) {

    },
    addCard (state, action) {

    },
    addToBoardList (state, action) {
      const list = state.boardsList
      const item = action.payload
      state.boardsList = list.concat(item)
    },
    deleteFromBoardList (state, action) {
      const boardId = action.payload
      const list = state.boardsList
      state.boardsList = list.filter(el => el._id !== boardId)
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
    const userData = getUserData()
    const token = localStorage.getItem('token')
    const passCodesList = userData.passCodes
    const passCode = passCodesList[0]
    try {
      response = await axios.get('http://localhost:5000/api/kanban', {
        params: {
          passCode
        },
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(kanbanBoardSlice.actions.getBoard(response.data))
      dispatch(kanbanBoardSlice.actions.endLoading(state))
    } catch (error) {
      dispatch(kanbanBoardSlice.actions.getError(error))
      console.log(error)
    }
  }
}

export function editCardAction (newCard: CardInterface, boardId: string) {
  return async (dispatch: any) => {
    let response
    const token = localStorage.getItem('token')
    try {
      response = await axios.post('http://localhost:5000/api/kanban', {
        newCard,
        boardId
      }, {
        headers: { Authorization: `Bearer ${token}` }
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
    const token = localStorage.getItem('token')
    const userId = getUserId()

    try {
      response = await axios.get('http://localhost:5000/api/kanban/getList', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          userId
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

export function createNewBoardAction (boardName: string) {
  return async (dispatch: any, state: any) => {
    dispatch(kanbanBoardSlice.actions.startLoading(state))
    const token = localStorage.getItem('token')
    let response
    try {
      response = await axios.post('http://localhost:5000/api/kanban/addBoard', {
        boardName
      }, {
        headers: { Authorization: `Bearer ${token}` }
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
    const token = localStorage.getItem('token')
    let response
    try {
      response = await axios.delete('http://localhost:5000/api/kanban/deleteBoard', {
        data: {
          boardId
        },
        headers: { Authorization: `Bearer ${token}` }
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
    const token = localStorage.getItem('token')
    let response
    try {
      response = await axios.post('http://localhost:5000/api/kanban/addCard', {
        card, boardId
      }, {
        headers: { Authorization: `Bearer ${token}` }
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
