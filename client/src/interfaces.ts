export interface CardInterface {
  title: string
  description: string
  assignee: string
  estimate: number
  _id: string
  status: string
  index: number
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
