export interface CardInterface {
  title: string
  description: string
  assignee: string
  estimate: number
  id: string
}

export interface ColumnInterface {
  name: string
  id: string
  items: CardInterface[]
}

export interface BoardInterface {
  kanban: {
    board: {
      environmentName: string
      columns: ColumnInterface[]
    }
  }
}

export interface getBoardActionInterface {
  type: 'kanban'
}
