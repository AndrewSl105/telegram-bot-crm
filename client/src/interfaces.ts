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
  kanban: {
    board: {
      environmentName: string
      columns: ColumnInterface[]
      cards: CardInterface[]
    }
  }
}

export interface Board {
  environmentName: string
  columns: ColumnInterface[]
  cards: CardInterface[]
}
