import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { type CardInterface, type ColumnInterface } from '../interfaces'
import column from '../features/KanbanBoard/components/Column'

export interface BoardDataState {
  board: []
}

const initialState: BoardDataState = {
  board: []
}

interface Board {
  environmentName: string
  columns: ColumnInterface[]
  cards: CardInterface[]
}

const buildBoard = (board: Board): [] => {
  const columns = board.columns
  const cards = board.cards

  const newCards: CardInterface[] = []
  const resolvedCards: CardInterface[] = []
  const inProgressCards: CardInterface[] = []
  const closedCards: CardInterface[] = []

  cards.map(card => {
    if (card.status === 'new') {
      newCards.push(card)
    } else if (card.status === 'in progress') {
      inProgressCards.push(card)
    } else if (card.status === 'resolved') {
      resolvedCards.push(card)
    } else if (card.status === 'closed') {
      closedCards.push(card)
    }
    return null
  })

  const newBoard = columns.map(col => {
    if (col.name === 'new') {
      return [...col.items, ...newCards]
    }
    if (col.name === 'in progress') {
      return col.items.concat(inProgressCards)
    }
    if (col.name === 'resolved') {
      return col.items.concat(resolvedCards)
    }
    if (col.name === 'closed') {
      return col.items.concat(closedCards)
    }
    return null
  })

  console.log(newBoard)

  return []
}

export const kanbanBoardSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    getBoard (state, action) {
      state.board = action.payload
      buildBoard(state.board)
    },
    updateCard (state, action) {
      console.log(action)
      const board = state.board
      console.log(board)
      // const droColumn = findDropColumn(board.columns, action.id)
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

export function updateCardStatus (id, newStatus) {
  return async (dispatch: any) => {
    try {
      const response = await axios.post('http://localhost:5000/api/kanban', {
        id,
        newStatus
      })
      dispatch(kanbanBoardSlice.actions.updateCard(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}
