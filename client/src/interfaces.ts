export interface CardInterface {
  title: string
  description: string
  assignee: string
  estimate: number
  _id: string
  status: string
  index: number
  createdBy: string
}

export interface ColumnInterface {
  name: string
  _id: string
  items: CardInterface[]
}

export interface BoardInterface {
  environmentName: string
  columns: ColumnInterface[]
  cards: CardInterface[]
}

export interface Board {
  kanban: {
    board: {
      environmentName: string
      columns: ColumnInterface[]
      cards: CardInterface[]
      style: {
        color: string
        image: string
      }
    }
    loading: boolean
    card: CardInterface
  }
}

export interface SourceInterface {
  index: number
  droppableId: string
}

export interface DestinationInterface {
  index: number
  droppableId: string
}

export interface BoardListItem {
  _id: string
  environmentName: string
  style: {
    color: string
    image: string
  }
}

export interface newCardState {
  title: string
  assignee: string
  description: string
  estimate: number
  phoneNumber: string
  userName: string
  till: string
  status: string
  createdBy: string
}
