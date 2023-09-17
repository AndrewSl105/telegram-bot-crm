
export interface CardInterface {
  title: string
  description: string
  assignee: string
  estimate: number
  _id: string
  status: string
  index: number
  createdBy: string
  phoneNumber: string
  till: string
  user: string
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
export interface SourceInterface {
  index: number
  droppableId: string
}

export interface DestinationInterface {
  index: number
  droppableId: string
}

export interface DialogState {
  dialogSlice: {
    open: boolean
    dialogType: string
    dialogProps: CardInterface
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
