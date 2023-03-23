import { type Action, type Dispatch } from 'redux'
import { type CardInterface, type ColumnInterface } from './state'

export interface BoardListItem {
  _id: string
  environmentName: string
  passCode: string
  dispatch: any
  style: {
    color: string
    image: string
  }
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
      _id: string
    }
    boardsList: BoardListItem[]
    loading: boolean
    card: CardInterface
  }
}

export interface AddCardFormProps {
  boardsList: BoardListItem[]
  boardId: string
  getFieldProps: any
}

export interface DialogProps {
  dispatch: Dispatch<Action>

  open: boolean
}

export interface BoardItemProps {
  _id: string
  style: {
    image: string
    color: string
  }
  title: string
  onChangeBoard: any
}