import { createSlice } from '@reduxjs/toolkit'
import { buildBoard, getUserId, updateColumns } from '../../utils'
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
import { Api } from '../../Api/api'

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
    const passCode = state().kanban.passCode
    const userId = getUserId()

    try {
      response = Api.get('kanban', { passCode, userId })
      dispatch(kanbanBoardSlice.actions.getBoard((await response).data))
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

    try {
      response = Api.post('kanban', { newCard, boardId })
      dispatch(kanbanBoardSlice.actions.editCardSuccess((await response).data))
      dispatch(showNotification({ text: CARD_UPDATE_SUCCESS, variant: SUCCESS }))
    } catch (error) {
      console.log(error)
    }
  }
}

export function getKanbanBoardsListAction () {
  return async (dispatch: any) => {
    let response
    const userId = getUserId()

    try {
      response = Api.get('kanban/getList', { userId })
      dispatch(kanbanBoardSlice.actions.getKanbanBoardsList((await response).data))
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
    const userId = getUserId()
    let response

    try {
      response = Api.post('kanban/add-board', { boardName, userId })

      dispatch(kanbanBoardSlice.actions.addToBoardList((await response).data))
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
      response = Api.delete('kanban/delete-board', { boardId })

      dispatch(kanbanBoardSlice.actions.deleteFromBoardList((await response).data))
      dispatch(kanbanBoardSlice.actions.endLoading(state))
      dispatch(showNotification({ text: BOARD_DELETED, variant: DEFAULT }))
    } catch (error) {
      dispatch(kanbanBoardSlice.actions.getError(error))
      dispatch(showNotification({ text: error, variant: ERROR }))
      console.log(error)
    }
  }
}

export function addCardAction (values: Record<string, string>) {
  return async (dispatch: any, state: any) => {
    dispatch(kanbanBoardSlice.actions.startLoading(state))
    let response

    try {
      response = Api.post('kanban/add-card', { values })

      dispatch(kanbanBoardSlice.actions.addCard((await response).data))
      dispatch(kanbanBoardSlice.actions.endLoading(state))
      dispatch(showNotification({ text: CARD_ADDED_SUCCESS, variant: SUCCESS }))
    } catch (error) {
      dispatch(kanbanBoardSlice.actions.getError(error))
      dispatch(showNotification({ text: error, variant: ERROR }))
      console.log(error)
    }
  }
}
