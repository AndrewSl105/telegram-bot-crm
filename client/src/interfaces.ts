export interface CardInterface {
  title: string
  description: string
  assignee: string
  estimate: number
  _id: string
  dropColumnId: string
  status: string
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
