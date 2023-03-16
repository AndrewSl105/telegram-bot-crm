
import { BOT, CLOSED, IN_PROGRESS, NEW, RESOLVED } from './constants'
import {
  type BoardInterface,
  type CardInterface,
  type ColumnInterface,
  type DestinationInterface,
  type SourceInterface
} from './interfaces/state'
import { type UserData } from './redux/slices/user'

export const buildBoard = (board: BoardInterface): BoardInterface => {
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

export const getDestinationColumn = (columns: ColumnInterface[], destinationColumnId: string): ColumnInterface | undefined =>
  columns.find((el: ColumnInterface) => el._id === destinationColumnId)

export const updateCardStatusOnly = (newStatus: any, card: any): CardInterface => {
  return (
    {
      title: card.title,
      description: card.description,
      assignee: card.assignee,
      estimate: 3,
      status: newStatus,
      _id: card._id,
      index: card.index,
      createdBy: card.createdBy
    }
  )
}

export const updateColumns = (
  draggableId: string,
  source: SourceInterface,
  destination: DestinationInterface,
  columns: ColumnInterface[],
  cards: CardInterface[] | any
): void => {
  const draggableCard = cards.find((el: CardInterface) => el._id === draggableId)
  const sourceColumn = columns.find((el: ColumnInterface) => el._id === source.droppableId)
  const destinationColumn = columns.find((el: ColumnInterface) => el._id === destination.droppableId)

  draggableCard.status = destinationColumn?.name

  sourceColumn?.items.splice(source.index, 1)
  destinationColumn?.items.splice(destination.index, 0, draggableCard)
}

export const getAvatar = (createdBy: string, bot: string): string => {
  return createdBy === BOT ? bot : ''
}

export const navigateToRoot = (navigate: any): void => {
  const token = localStorage.getItem('token')
  if (token != null) navigate('/')
}

export const getUserData = (): UserData => {
  const userData: any = localStorage.getItem('userData')
  return JSON.parse(userData)
}

export const getUserId = (): string => {
  const userData = getUserData()
  return userData._id
}
