
import { BOT } from './constants'
import {
  type BoardInterface,
  type CardInterface,
  type ColumnInterface,
  type DestinationInterface,
  type SourceInterface
} from './interfaces/state'
import { date } from 'yup'

export const buildBoard = (board: BoardInterface): BoardInterface => ({
  ...board,
  columns: board.columns.map((col) => ({
    ...col,
    items: board.cards.filter((card) => card.status === col.name)
  }))
})

export const getDestinationColumn = (columns: ColumnInterface[], destinationColumnId: string): ColumnInterface | undefined =>
  columns.find((el: ColumnInterface) => el._id === destinationColumnId)

export const updateCardStatusOnly = (newStatus: any, card: any): CardInterface => ({
  ...card,
  status: newStatus
})

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
  return createdBy === BOT ? bot : bot
}

export const getUserData = (): {
  _id: string
  token: string
} => {
  const userData: any = localStorage.getItem('userData')
  return JSON.parse(userData)
}

export const getToken = (): string => {
  const userData = getUserData()
  return userData?.token
}

export const navigateToRoot = (navigate: any): void => {
  const token = getToken()
  if (token != null) navigate('/')
}

export const getUserId = (): string => {
  const userData = getUserData()
  return userData._id
}