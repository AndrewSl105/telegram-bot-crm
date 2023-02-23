import { type Board, type ColumnInterface } from './interfaces'
import { CLOSED, IN_PROGRESS, NEW, RESOLVED } from './constants'

export const findDropColumn = (columns: ColumnInterface[], id: string): ColumnInterface | undefined => {
  return columns.find((el) => el.id === id)
}

export const buildBoard = (board: Board | []): [] => {
  const newBoard = board
  const columns = newBoard.columns
  const cards = newBoard.cards

  columns.map(col => {
    if (col.name === NEW) {
      col.items = cards.filter(el => el.status === NEW)
    } else if (col.name === IN_PROGRESS) {
      col.items = cards.filter(el => el.status === IN_PROGRESS)
    } else if (col.name === RESOLVED) {
      col.items = cards.filter(el => el.status === RESOLVED)
    } else if (col.name === CLOSED) {
      col.items = cards.filter(el => el.status === CLOSED)
    }
    return col
  })
  return newBoard
}
