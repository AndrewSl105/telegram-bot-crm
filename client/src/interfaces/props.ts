import { type Action, type Dispatch } from 'redux'
import { type CardInterface, type ColumnInterface } from './state'
import { type FormikErrors } from 'formik'

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
    passCode: string
    boardListLoaded: boolean
    boardAdded: boolean
    cardDeleted: boolean
  }
}

export interface AddCardFormProps {
  boardsList: BoardListItem[]
  boardId: string
  getFieldProps: any
  errors: FormikErrors<any>
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
  passCode: string
}
